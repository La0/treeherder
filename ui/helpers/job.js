import { thFailureResults, thPlatformMap } from './constants';
import { getGroupMapKey } from './aggregateId';
import { getAllUrlParams, getRepo } from './location';
import { uiJobsUrlBase } from './url';

const btnClasses = {
  busted: 'btn-red',
  exception: 'btn-purple',
  testfailed: 'btn-orange',
  usercancel: 'btn-pink',
  retry: 'btn-dkblue',
  success: 'btn-green',
  running: 'btn-dkgray',
  pending: 'btn-ltgray',
  superseded: 'btn-ltblue',
  failures: 'btn-red',
  'in progress': 'btn-dkgray',
};

// failure classification ids that should be shown in "unclassified" mode
export const thUnclassifiedIds = [1, 7];

// Get the CSS class for job buttons as well as jobs that show in the pinboard.
// These also apply to result "groupings" like ``failures`` and ``in progress``
// for the colored filter chicklets on the nav bar.
export const getBtnClass = function getBtnClass(
  resultStatus,
  failureClassificationId,
) {
  let btnClass = btnClasses[resultStatus] || 'btn-default';

  // handle if a job is classified
  if (failureClassificationId > 1) {
    btnClass += '-classified';
  }
  return btnClass;
};

export const isReftest = function isReftest(job) {
  const {
    job_group_name: gName,
    job_type_name: jName,
    job_type_symbol: jSymbol,
  } = job;
  return (
    [gName, jName].some(name => name.toLowerCase().includes('reftest')) ||
    jSymbol.includes('wrench') ||
    jName.includes('test-verify')
  );
};

export const isPerfTest = function isPerfTest(job) {
  return [job.job_group_name, job.job_type_name].some(
    name =>
      name.toLowerCase().includes('talos') ||
      name.toLowerCase().includes('raptor'),
  );
};

export const isTestIsolatable = function isTestIsolatable(job) {
  const isolatableRepos = [
    'autoland',
    'mozilla-central',
    'mozilla-inbound',
    'try',
  ];
  const repoName = getRepo();
  if (!isolatableRepos.includes(repoName)) {
    return false;
  }
  if (job.job_type_name.toLowerCase().includes('jsreftest')) {
    return false;
  }
  return [job.job_group_name, job.job_type_name].some(
    name =>
      !name.toLowerCase().includes('source-test') &&
      (name.toLowerCase().includes('crashtest') ||
        name.toLowerCase().includes('mochitest') ||
        name.toLowerCase().includes('reftest') ||
        name.toLowerCase().includes('web-platform') ||
        name.toLowerCase().includes('xpcshell')),
  );
};

export const isClassified = function isClassified(job) {
  return !thUnclassifiedIds.includes(job.failure_classification_id);
};

export const isUnclassifiedFailure = function isUnclassifiedFailure(job) {
  return thFailureResults.includes(job.result) && !isClassified(job);
};

// Fetch the React instance of an object from a DOM element.
// Credit for this approach goes to SO: https://stackoverflow.com/a/48335220/333614
export const findInstance = function findInstance(el) {
  const key = Object.keys(el).find(key =>
    key.startsWith('__reactInternalInstance$'),
  );
  if (key) {
    const fiberNode = el[key];
    return fiberNode && fiberNode.return && fiberNode.return.stateNode;
  }
  return null;
};

// Fetch the React instance of the currently selected job.
export const findSelectedInstance = function findSelectedInstance() {
  const selectedEl = document.querySelector('#push-list .job-btn.selected-job');

  if (selectedEl) {
    return findInstance(selectedEl);
  }
};

// Check if the element is visible on screen or not.
const isOnScreen = function isOnScreen(el) {
  const bounding = el.getBoundingClientRect();
  const offset = el.getBoundingClientRect();
  const top = offset.top + document.body.scrollTop;
  const bottom = top + el.offsetHeight;

  return top >= bounding.bottom && bottom <= bounding.top;
};

// Scroll the element into view.
export const scrollToElement = function scrollToElement(el) {
  if (!isOnScreen(el)) {
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
};

export const findGroupElement = function findGroupElement(job) {
  const { push_id, job_group_symbol, tier, platform, platform_option } = job;
  const groupMapKey = getGroupMapKey(
    push_id,
    job_group_symbol,
    tier,
    platform,
    platform_option,
  );
  return document.querySelector(
    `#push-list span[data-group-key='${groupMapKey}']`,
  );
};

export const findGroupInstance = function findGroupInstance(job) {
  const groupEl = findGroupElement(job);

  if (groupEl) {
    return findInstance(groupEl);
  }
};

// Fetch the React instance based on the jobId, and if scrollTo
// is true, then scroll it into view.
export const findJobInstance = function findJobInstance(jobId, scrollTo) {
  const jobEl = document.querySelector(
    `#push-list button[data-job-id='${jobId}']`,
  );
  if (jobEl) {
    if (scrollTo) {
      scrollToElement(jobEl);
    }
    return findInstance(jobEl);
  }
};

export const addAggregateFields = function addAggregateFields(job) {
  const {
    job_group_name,
    job_group_symbol,
    job_type_name,
    job_type_symbol,
    state,
    result,
    platform,
    platform_option,
    signature,
    duration,
    submit_timestamp,
    start_timestamp,
    end_timestamp,
  } = job;

  job.resultStatus = state === 'completed' ? result : state;
  // we want to join the group and type information together
  // so we can search for it as one token (useful when
  // we want to do a search on something like `fxup-esr(`)
  const symbolInfo = job_group_symbol === '?' ? '' : job_group_symbol;

  job.title = [
    thPlatformMap[platform] || platform,
    platform_option,
    job_group_name === 'unknown' ? undefined : job_group_name,
    job_type_name,
    `${symbolInfo}(${job_type_symbol})`,
  ]
    .filter(item => typeof item !== 'undefined')
    .join(' ');
  job.searchStr = `${job.title} ${signature}`;

  if (!duration) {
    // If start time is 0, then duration should be from requesttime to now
    // If we have starttime and no endtime, then duration should be starttime to now
    // If we have both starttime and endtime, then duration will be between those two
    const endtime = end_timestamp || Date.now() / 1000;
    const starttime = start_timestamp || submit_timestamp;
    job.duration = Math.round((endtime - starttime) / 60, 0);
  }

  job.hoverText = `${job_type_name} - ${job.resultStatus} - ${job.duration} mins`;
  return job;
};

export const getJobSearchStrHref = function getJobSearchStrHref(jobSearchStr) {
  const params = getAllUrlParams();
  params.set('searchStr', jobSearchStr.split(' '));

  return `${uiJobsUrlBase}?${params.toString()}`;
};

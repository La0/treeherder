import React from 'react';

const ShortcutTable = function ShortcutTable() {
  return (
    <div className="card">
      <div className="card-header">
        <h3>Keyboard shortcuts</h3>
      </div>

      <div className="card-body panel-spacing">
        <table id="shortcuts">
          <tbody>
            <tr>
              <th colSpan="2">Jobs View</th>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td><kbd>f</kbd></td>
              <td>Enter a quick filter</td>
            </tr>
            <tr>
              <td><kbd>ctrl</kbd><kbd>shift</kbd><kbd>f</kbd></td>
              <td>Clear the quick filter</td>
            </tr>
            <tr>
              <td><kbd>i</kbd></td>
              <td>Toggle pending and running jobs</td>
            </tr>
            <tr>
              <td><kbd>j</kbd> or <kbd>n</kbd></td>
              <td>Select next unclassified failure</td>
            </tr>
            <tr>
              <td><kbd>k</kbd> or <kbd>p</kbd></td>
              <td>Select previous unclassified failure</td>
            </tr>
            <tr>
              <td><kbd>l</kbd></td>
              <td>Open the logviewer for the selected job</td>
            </tr>
            <tr>
              <td><kbd>r</kbd></td>
              <td>Retrigger selected job</td>
            </tr>
            <tr>
              <td><kbd>t</kbd></td>
              <td>Select next info tab</td>
            </tr>
            <tr>
              <td><kbd>u</kbd></td>
              <td>Toggle showing only unclassified jobs</td>
            </tr>
            <tr>
              <td><kbd>&rarr;</kbd></td>
              <td>Select next job</td>
            </tr>
            <tr>
              <td><kbd>&larr;</kbd></td>
              <td>Select previous job</td>
            </tr>
            <tr>
              <td><kbd>esc</kbd></td>
              <td>Close all open panels</td>
            </tr>
            <tr>
              <td><kbd>ctrl</kbd> or <kbd>cmd</kbd></td>
              <td>Toggle pinning a job during click selection</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th colSpan="2">Pinboard</th>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td><kbd>b</kbd></td>
              <td>Add a selected job to the pinboard + enter related bug</td>
            </tr>
            <tr>
              <td><kbd>c</kbd></td>
              <td>Add a selected job to the pinboard + enter classification</td>
            </tr>
            <tr>
              <td><kbd>ctrl</kbd><kbd>shift</kbd><kbd>u</kbd></td>
              <td>Clear the pinboard</td>
            </tr>
            <tr>
              <td><kbd>spacebar</kbd></td>
              <td>Add a selected job to the pinboard</td>
            </tr>
            <tr>
              <td><kbd>ctrl</kbd><kbd>enter</kbd></td>
              <td>Save pinboard classification and related bugs</td>
            </tr>
            <tr>
              <td><kbd>ctrl</kbd><kbd>backspace</kbd></td>
              <td>Delete job classification and related bugs</td>
            </tr>
            <tr>
              <th colSpan="2">Autoclassify Panel</th>
            </tr>
            <tr>
              <td><kbd>a</kbd></td>
              <td>Add all subsequent lines to the selection</td>
            </tr>
            <tr>
              <td><kbd>e</kbd></td>
              <td>Toggle editing selected lines</td>
            </tr>
            <tr>
              <td><kbd>shift</kbd><kbd>i</kbd></td>
              <td>Ignore the failure</td>
            </tr>
            <tr>
              <td><kbd>s</kbd></td>
              <td>Save all classifications</td>
            </tr>
            <tr>
              <td><kbd>x</kbd></td>
              <td>Toggle showing additional classification suggestions</td>
            </tr>
            <tr>
              <td><kbd>0</kbd>-<kbd>9</kbd></td>
              <td>Select the Nth classification option</td>
            </tr>
            <tr>
              <td><kbd>&darr;</kbd></td>
              <td>Select next failure</td>
            </tr>
            <tr>
              <td><kbd>&uarr;</kbd></td>
              <td>Select previous failure</td>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <th colSpan="2">Help</th>
            </tr>
          </tbody>

          <tbody>
            <tr>
              <td><kbd>?</kbd></td>
              <td>Display onscreen keyboard shortcuts</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShortcutTable;

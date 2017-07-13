import React, { Component } from 'react'
import {
  Panel,
} from 'react-bootstrap'
import { ExpedTableBatchConfig } from './exped-table-batch-config'
import { ResetArea } from './reset-area'
import { ImportAndExport } from './import-and-export'

class SettingsAndTools extends Component {
  render() {
    return (
      <div>
        <h2>General</h2>
        <div>
          <Panel header="Language">
            TODO
          </Panel>
          <Panel header="Reset">
            <ResetArea />
          </Panel>
          <Panel header="Import & Export">
            <ImportAndExport />
          </Panel>
        </div>
        <h2>Expedition Table</h2>
        <div>
          <Panel header="Batch Config">
            <ExpedTableBatchConfig />
          </Panel>
        </div>
      </div>
    )
  }
}

export { SettingsAndTools }

import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
} from 'react-bootstrap'

import { translateSelector } from '../../selectors'
import { LanguageArea } from './language-area'
import { ExpedTableBatchConfig } from './exped-table-batch-config'
import { ResetArea } from './reset-area'
import { ImportAndExport } from './import-and-export'

import { PTyp } from '../../ptyp'

class SettingsAndToolsImpl extends Component {
  static propTypes = {
    tr: PTyp.func.isRequired,
  }

  render() {
    const {tr} = this.props
    return (
      <div>
        <h2>{tr('SettingsAndTools.General.Title')}</h2>
        <div>
          <Panel header={tr('SettingsAndTools.General.Language')}>
            <LanguageArea />
          </Panel>
          <Panel header={tr('SettingsAndTools.General.Reset.Title')}>
            <ResetArea />
          </Panel>
          <Panel header={tr('SettingsAndTools.General.ImportAndExport.Title')}>
            <ImportAndExport />
          </Panel>
        </div>
        <h2>{tr('SettingsAndTools.ExpedTable.Title')}</h2>
        <div>
          <Panel header={tr('SettingsAndTools.ExpedTable.BatchConfig.Title')}>
            <ExpedTableBatchConfig />
          </Panel>
        </div>
      </div>
    )
  }
}

const SettingsAndTools = connect(translateSelector)(SettingsAndToolsImpl)

export { SettingsAndTools }

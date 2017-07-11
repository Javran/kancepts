import React, { Component } from 'react'
import {
  Panel,
  FormGroup,
  Checkbox,
} from 'react-bootstrap'
import Slider from 'rc-slider'

import { EquipmentTable } from './equipment-table'
import { NewEquipmentPanel } from './new-equipment-panel'
import { ResultsTable } from './results-table'

const emptyMark = {
  label: '',
  style: {display: 'none'},
}

class DlcLab extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div style={{display: 'flex'}}>
        <Panel
          className="dlc-lab-control-panel"
          style={{
            width: '60%',
            marginRight: 10,
          }}
          header="Expedition"
        >
          <FormGroup>
            <Checkbox inline>Include Kinu K2</Checkbox>
          </FormGroup>
          <div style={{display: 'flex'}}>
            <div>
              Great Success: 0%
            </div>
            <Slider
              style={{flex: 1, marginLeft: '1.2em', marginRight: '1em'}}
              marks={{0: emptyMark, 50: emptyMark, 100: emptyMark}} />
          </div>
          <EquipmentTable style={{marginTop: '1.2em', marginBottom: 5}} />
          <NewEquipmentPanel />
        </Panel>
        <Panel
          className="dlc-lab-control-panel"
          style={{flex: 1}}
          header="Results"
        >
          <ResultsTable />
        </Panel>
      </div>
    )
  }
}

export { DlcLab }

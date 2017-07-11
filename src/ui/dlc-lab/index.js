import React, { Component } from 'react'
import {
  Panel,
  FormGroup,
  Checkbox,
  Radio,
  Button,
  ButtonGroup,
  DropdownButton,
  FormControl,
  MenuItem,
} from 'react-bootstrap'
import Slider from 'rc-slider'

import { enumFromTo } from '../../utils'
import { NewEquipmentPanel } from './new-equipment-panel'

class DlcLab extends Component {
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
              Great Success Rate: 0%
            </div>
            <Slider
              style={{flex: 1, marginLeft: '1.2em', marginRight: '1em'}}
              marks={{0: '0%', 50: '50%', 100: '100%'}} />
          </div>
          <div>
            Equipment list placeholder
          </div>
          <NewEquipmentPanel />
        </Panel>
        <Panel
          className="dlc-lab-control-panel"
          style={{flex: 1}}
          header="Results"
        >
          exped result placeholder
        </Panel>
      </div>
    )
  }
}

export { DlcLab }

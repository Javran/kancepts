import React, { Component } from 'react'
import {
  Panel,
  FormGroup,
  Checkbox,
} from 'react-bootstrap'
import Slider from 'rc-slider'

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
          <div>
            TODO panel for adding new equipments
          </div>
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

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
          <Panel
            className="dlc-lab-control-panel"
            style={{marginBottom: 5}}
          >
            <DropdownButton
              style={{marginTop: 5}}
              title="大発動艇"
              id="dlc-lab-new-item-type">
              <MenuItem>大発動艇</MenuItem>
              <MenuItem>特大発動艇</MenuItem>
              <MenuItem>大発動艇(八九式中戦車&陸戦隊)</MenuItem>
              <MenuItem>特型内火艇</MenuItem>
            </DropdownButton>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginTop: 5,
            }}>
              <div style={{width: '40%', marginRight: 8}}>
                <ButtonGroup justified>
                  <DropdownButton id="dlc-lab-new-item-level" title="star">
                    {
                      enumFromTo(0,10).map(x => (
                        <MenuItem key={x}>{x}</MenuItem>
                      ))
                    }
                  </DropdownButton>
                </ButtonGroup>
              </div>
              <FormControl style={{width: '40%', marginRight: 8}} type="number" />
              <Button style={{flex: 1}}>Add</Button>
            </div>
          </Panel>
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

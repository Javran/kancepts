import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import {
  Panel,
  Button,
  ButtonGroup,
  Dropdown,
  FormGroup,
  Radio,
  DropdownButton,
  FormControl,
  MenuItem,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { enumFromTo } from '../../utils'

class NewEquipmentPanel extends Component {
  static propTypes = {
    style: PTyp.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style} = this.props
    return (
      <Panel
        className="dlc-lab-control-panel"
        style={{
          ...style,
          marginBottom: 5,
        }}
      >
        <FormGroup>
          {
            [
              '大発動艇',
              '特大発動艇',
              '大発動艇(八九式中戦車&陸戦隊)',
              '特型内火艇',
            ].map((x,ind) => (
              <Radio name="equip-name" inline key={
                // eslint-disable-next-line react/no-array-index-key
                ind
              }>
                {x}
              </Radio>
            ))
          }
        </FormGroup>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 5, width: '40%'}}>
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
          <FormControl style={{marginRight: 5, width: '40%'}} type="number" />
          <Button style={{minWidth: '3em', flex: 1}}>
            <FontAwesome name="plus" />
          </Button>
        </div>
      </Panel>
    )
  }
}

export { NewEquipmentPanel }

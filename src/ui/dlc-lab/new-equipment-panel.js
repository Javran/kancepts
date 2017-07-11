import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import {
  Panel,
  Button,
  ButtonGroup,
  Dropdown,
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
        <div style={{display: 'flex', alignItems: 'center'}}>
          <Dropdown
            id="dlc-lab-new-item-level"
            style={{
              flex: '1',
              marginRight: 5,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
            block vertical>
            <Dropdown.Toggle block style={{display: 'flex'}}>
              <span style={{
                width: '10em',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}>
                大発動艇(八九式中戦車&陸戦隊)
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <MenuItem>大発動艇</MenuItem>
              <MenuItem>特大発動艇</MenuItem>
              <MenuItem>大発動艇(八九式中戦車&陸戦隊)</MenuItem>
              <MenuItem>特型内火艇</MenuItem>
            </Dropdown.Menu>
          </Dropdown>
          <div style={{width: '20%', marginRight: 5}}>
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
          <FormControl style={{width: '20%', marginRight: 5}} type="number" />
          <Button style={{width: '3em'}}>
            <FontAwesome name="plus" />
          </Button>
        </div>
      </Panel>
    )
  }
}

export { NewEquipmentPanel }

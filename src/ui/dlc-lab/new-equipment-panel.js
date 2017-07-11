import _ from 'lodash'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import {
  Panel,
  Button,
  ButtonGroup,
  FormGroup,
  Radio,
  DropdownButton,
  FormControl,
  MenuItem,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { enumFromTo } from '../../utils'

const improvementToText = level =>
  level === 0 ? '★=0' :
  level === 10 ? '★+max' :
  `★+${level}`

const mkState = () => ({
  masterId: 68,
  level: 0,
  count: 1,
})

class NewEquipmentPanel extends Component {
  static propTypes = {
    style: PTyp.object,
  }

  static defaultProps = {
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = mkState()
  }

  handleChangeItem = e => {
    const masterId = parseInt(e.target.value,10)
    this.setState({masterId})
  }

  handleCountChange = e => {
    const count = parseInt(e.target.value,10)
    if (_.isInteger(count) && count > 0) {
      this.setState({count})
    }
  }

  handleSelectLevel = level =>
    this.setState({level})

  render() {
    const {style} = this.props
    const {level, count, masterId} = this.state
    return (
      <Panel
        className="dlc-lab-control-panel"
        style={{
          ...style,
          marginBottom: 5,
          padding: 5,
        }}
      >
        <FormGroup>
          {
            [
              ['大発動艇', 68],
              ['特大発動艇', 193],
              ['大発動艇(八九式中戦車&陸戦隊)', 166],
              ['特型内火艇', 167],
            ].map(([name, id]) => (
              <Radio
                key={id}
                checked={masterId === id}
                name="equip-name"
                value={id}
                onChange={this.handleChangeItem}
                inline>
                {name}
              </Radio>
            ))
          }
        </FormGroup>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: 5, width: '40%'}}>
            <ButtonGroup justified>
              <DropdownButton
                onSelect={this.handleSelectLevel}
                id="dlc-lab-new-item-level"
                title={improvementToText(level)}>
                {
                  enumFromTo(0,10).map(x => (
                    <MenuItem key={x} eventKey={x}>
                      {improvementToText(x)}
                    </MenuItem>
                  ))
                }
              </DropdownButton>
            </ButtonGroup>
          </div>
          <FormControl
            value={count}
            onChange={this.handleCountChange}
            style={{marginRight: 5, width: '40%'}}
            type="number" />
          <Button style={{minWidth: '3em', flex: 1}}>
            <FontAwesome name="plus" />
          </Button>
        </div>
      </Panel>
    )
  }
}

export { NewEquipmentPanel }

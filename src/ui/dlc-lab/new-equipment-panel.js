import _ from 'lodash'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'

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
import { enumFromTo, modifyObject } from 'subtender'

import { PTyp } from '../../ptyp'
import { improvementToText } from '../../utils'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'
import { dlcList } from '../../master-data'

const mkState = () => ({
  masterId: 68,
  level: 0,
  count: 1,
})

class NewEquipmentPanelImpl extends Component {
  static propTypes = {
    modifyDlcLabUI: PTyp.func.isRequired,
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
    if (_.isInteger(count)) {
      this.setState({count})
    }
  }

  handleSelectLevel = level =>
    this.setState({level})

  handleAddToEquipments = () => {
    const {modifyDlcLabUI} = this.props
    const {masterId, level, count} = this.state
    modifyDlcLabUI(
      modifyObject(
        'equipments',
        modifyObject(
          masterId,
          (equipment = {}) =>
            modifyObject(
              level,
              (curCount = 0) =>
                Math.max(0, curCount + count)
            )(equipment)
        )
      )
    )
    this.setState(mkState())
  }

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
            dlcList.map(({name, id}) => (
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
          <Button
            onClick={this.handleAddToEquipments}
            style={{minWidth: '3em', flex: 1}}>
            <FontAwesome name={count >= 0 ? 'plus' : 'minus'} />
          </Button>
        </div>
      </Panel>
    )
  }
}

const NewEquipmentPanel = connect(
  null,
  mapDispatchToProps)(NewEquipmentPanelImpl)

export { NewEquipmentPanel }

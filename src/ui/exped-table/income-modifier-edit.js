import React, { Component } from 'react'
import {
  Tabs, Tab,
  Checkbox, FormControl, Form,
 } from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'
import { handleNoSubmit } from '../../utils'

class IncomeModifierEdit extends Component {
  static propTypes = {
    id: PTyp.number.isRequired,
    // TODO: details
    modifier: PTyp.object.isRequired,
    onModify: PTyp.func.isRequired,
  }

  handleSelectType = newType => {
    const {onModify} = this.props
    onModify(m => ({...m, curType: newType}))
  }

  handleToggleGS = e => {
    const gs = e.target.checked
    const {onModify} = this.props
    onModify(modifier => ({
      ...modifier,
      standard: {
        ...modifier.standard,
        gs,
      },
    }))
  }

  handleChangeDlcCount = e => {
    const daihatsu = parseInt(e.target.value,10)
    const {onModify} = this.props
    onModify(modifier => ({
      ...modifier,
      standard: {
        ...modifier.standard,
        daihatsu,
      },
    }))
  }

  handleChangeCustomValue = e => {
    const valueStr = e.target.value
    const {onModify} = this.props
    onModify(modifier => ({
      ...modifier,
      custom: {
        ...modifier.custom,
        valueStr,
      },
    }))
  }

  render() {
    const {modifier, id} = this.props
    return (
      <Tabs
        id={`income-modifier-exped-${id}`}
        animation={false}
        onSelect={this.handleSelectType}
        activeKey={modifier.curType}>
        <Tab eventKey="standard" title="Standard">
          <div style={{padding: 10}}>
            <Checkbox
              onChange={this.handleToggleGS}
              checked={modifier.standard.gs}>
              Great Success
            </Checkbox>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                <ItemIcon name="dlc" style={{height: '2.5em'}} />
              </div>
              <FormControl
                onChange={this.handleChangeDlcCount}
                value={modifier.standard.daihatsu}
                componentClass="select"
                style={{width: '60%', flex: 1}}>
                {
                  [0,1,2,3,4].map(x => (
                    <option value={x} key={x}>{x}</option>
                  ))
                }
              </FormControl>
            </div>
          </div>
        </Tab>
        <Tab eventKey="custom" title="Custom">
          <div style={{padding: 10, display: 'flex', alignItems: 'center'}}>
            <div style={{width: '40%'}}>
              Modifier:
            </div>
            <Form
              onSubmit={handleNoSubmit}
              inline style={{width: '60%', flex: 1}}>
              <FormControl
                onChange={this.handleChangeCustomValue}
                value={modifier.custom.valueStr}
                type="text" style={{width: '100%'}}
              />
            </Form>
          </div>
        </Tab>
      </Tabs>
    )
  }
}

export {
  IncomeModifierEdit,
}

import React, { Component } from 'react'
import {
  Button, Panel,
  Tabs,
  Tab, Row, Col, Nav, NavItem,
  Checkbox, FormControl, Form,
 } from 'react-bootstrap'

import { ItemIcon } from '../item-icon'

class IncomeModifierEdit extends Component {
  handleSelectType = newType => {
    const {onModify} = this.props
    onModify(m => ({...m, curType: newType}))
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
            <Checkbox checked={modifier.standard.gs}>
              Great Success
            </Checkbox>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                <ItemIcon name="dlc" style={{height: '2.5em'}} />
              </div>
              <FormControl
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
            <Form inline style={{width: '60%', flex: 1}}>
              <FormControl
                value={modifier.custom.value}
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

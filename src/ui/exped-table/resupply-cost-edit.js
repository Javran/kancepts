import React, { Component } from 'react'
import {
  Button, Panel,
  Tabs, Form,
  Tab, Row, Col, Nav, NavItem,
  FormControl,
 } from 'react-bootstrap'

class ResupplyCostEdit extends Component {
  handleSelectType = newType => {
    const {onModify} = this.props
    onModify(m => ({...m, curType: newType}))
  }

  render() {
    const {cost, id} = this.props
    return (
      <Tabs
        id={`resupply-cost-exped-${id}`}
        animation={false}
        onSelect={this.handleSelectType}
        activeKey={cost.curType}>
        <Tab eventKey="cost-model" title="Cost Model">
          <div style={{padding: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                Ship Count:
              </div>
              <FormControl
                disabled={cost.costModel.wildcard === false}
                value={cost.costModel.count}
                componentClass="select" style={{width: '60%', flex: 1}}>
                {
                  [6,5,4,3,2,1].map(x => (
                    <option value={x} key={x}>{x}</option>
                  ))
                }
              </FormControl>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                Wildcard:
              </div>
              <FormControl
                value={cost.costModel.wildcard}
                componentClass="select"
                style={{width: '60%', flex: 1}}>
                {
                  [false,'DD','SS','DE'].map(x => (
                    <option value={x} key={x}>
                      {
                        x === false ? 'None' :
                        x === 'DD' ? 'Destroyer (DD)' :
                        x === 'SS' ? 'Submarine (SS)' :
                        x === 'DE' ? 'Escort (DE)' :
                        x
                      }
                    </option>
                  ))
                }
              </FormControl>
            </div>
          </div>
        </Tab>
        <Tab eventKey="custom" title="Custom">
          <div style={{padding: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                Fuel:
              </div>
              <Form inline style={{width: '60%', flex: 1}}>
                <FormControl
                  value={cost.custom.fuel}
                  type="text" style={{width: '100%'}}
                />
              </Form>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                Ammo:
              </div>
              <Form inline style={{width: '60%', flex: 1}}>
                <FormControl
                  value={cost.custom.ammo}
                  type="text" style={{width: '100%'}}
                />
              </Form>
            </div>

          </div>
        </Tab>
      </Tabs>
    )
  }
}

export {
  ResupplyCostEdit,
}

import React, { Component } from 'react'
import {
  Tabs, Form,
  Tab,
  FormControl,
 } from 'react-bootstrap'

import { PTyp } from '../../ptyp'

class ResupplyCostEdit extends Component {
  static propTypes = {
    id: PTyp.number.isRequired,
    // TODO: details
    cost: PTyp.object.isRequired,
    onModify: PTyp.func.isRequired,
  }

  handleSelectType = newType => {
    const {onModify} = this.props
    onModify(m => ({...m, curType: newType}))
  }

  handleChangeShipCount = e => {
    const count = parseInt(e.target.value,10)
    const {onModify} = this.props
    onModify(cost => ({
      ...cost,
      costModel: {
        ...cost.costModel,
        count,
      },
    }))
  }

  handleChangeWildcard = e => {
    const wildcardStr = e.target.value
    const wildcard =
      wildcardStr === 'false' ? false : wildcardStr
    const {onModify} = this.props
    onModify(cost => ({
      ...cost,
      costModel: {
        ...cost.costModel,
        wildcard,
      },
    }))
  }

  handleChangeFuel = e => {
    const fuelStr = e.target.value
    const {onModify} = this.props
    onModify(cost => ({
      ...cost,
      custom: {
        ...cost.custom,
        fuelStr,
      },
    }))
  }

  handleChangeAmmo = e => {
    const ammoStr = e.target.value
    const {onModify} = this.props
    onModify(cost => ({
      ...cost,
      custom: {
        ...cost.custom,
        ammoStr,
      },
    }))
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
                onChange={this.handleChangeShipCount}
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
                onChange={this.handleChangeWildcard}
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
                  onChange={this.handleChangeFuel}
                  value={cost.custom.fuelStr}
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
                  onChange={this.handleChangeAmmo}
                  value={cost.custom.ammoStr}
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

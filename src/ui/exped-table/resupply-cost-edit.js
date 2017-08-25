import React, { Component } from 'react'
import {
  Tabs, Form,
  Tab,
  FormControl,
} from 'react-bootstrap'

import { handleNoSubmit } from '../../utils'
import { PTyp } from '../../ptyp'

class ResupplyCostEdit extends Component {
  static propTypes = {
    id: PTyp.number.isRequired,
    // TODO: details
    cost: PTyp.object.isRequired,
    onModify: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
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
    const wildcard = e.target.value
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
    const {cost, id, tr} = this.props
    return (
      <Tabs
        id={`resupply-cost-exped-${id}`}
        animation={false}
        onSelect={this.handleSelectType}
        activeKey={cost.curType}>
        <Tab eventKey="cost-model" title={tr('ResupplyCost.CostModel')}>
          <div style={{padding: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                {tr('ResupplyCost.ShipCount')}:
              </div>
              <FormControl
                onChange={this.handleChangeShipCount}
                value={cost.costModel.count}
                componentClass="select" style={{width: '60%', flex: 1}}>
                {
                  [6,5,4,3,2,1,0].map(x => (
                    <option value={x} key={x}>{x}</option>
                  ))
                }
              </FormControl>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                {tr('ResupplyCost.Wildcard')}:
              </div>
              <FormControl
                onChange={this.handleChangeWildcard}
                value={cost.costModel.wildcard}
                componentClass="select"
                style={{width: '60%', flex: 1}}>
                {
                  [
                    ['dd','DD'],
                    ['ss-like','SS(*)'],
                    ['de', 'DE'],
                  ].map(([x,stype]) => (
                    <option value={x} key={x}>
                      {
                        tr(`STypeLong.${stype}`)
                      }
                    </option>
                  ))
                }
              </FormControl>
            </div>
          </div>
        </Tab>
        <Tab eventKey="custom" title={tr('ResupplyCost.Custom')}>
          <div style={{padding: 10}}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                {tr('Resource.Fuel')}:
              </div>
              <Form
                onSubmit={handleNoSubmit}
                inline style={{width: '60%', flex: 1}}>
                <FormControl
                  onChange={this.handleChangeFuel}
                  value={cost.custom.fuelStr}
                  type="text" style={{width: '100%'}}
                />
              </Form>
            </div>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <div style={{width: '40%'}}>
                {tr('Resource.Ammo')}:
              </div>
              <Form
                onSubmit={handleNoSubmit}
                inline style={{width: '60%', flex: 1}}>
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

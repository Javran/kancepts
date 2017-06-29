import _ from 'lodash'
import React, { Component } from 'react'
import {
  ButtonGroup, Button,
  Table,
} from 'react-bootstrap'

import rawShipList from '../../assets/default-ship-list.json'
import masterData from '../../assets/api_start2.json'
import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

import { CostPicker } from '../cost-picker'

// TODO: list sorting perhaps after we have redux setups.

const $ships = _.fromPairs(masterData.api_mst_ship.map(x => [x.api_id, x]))
const $shipTypes = _.fromPairs(masterData.api_mst_stype.map(x => [x.api_id,x]))

const shipResupplyCost = ship => {
  // "after marriage modifier":
  // - if there's no consumption before marriage, no consumption applied after marriage either.
  // - consumption is applied with 0.85 and then floor is taken, with a minimum cost of 1
  const applyAfterMarriage =
    v => (v === 0) ? 0 : Math.max(1, Math.floor(v*0.85))
  const modifier = ship.ring ? applyAfterMarriage : _.identity
  return (fuelCostFactor, ammoCostFactor) => {
    const fuelCost = Math.floor( ship.maxFuel * fuelCostFactor )
    const ammoCost = Math.floor( ship.maxAmmo * ammoCostFactor )
    return {
      fuelCost: modifier(fuelCost),
      ammoCost: modifier(ammoCost),
    }
  }
}

const shipList = rawShipList.map((raw,ind) => {
  const mstId = raw.id
  // const ring = raw.m TODO: testing
  const ring = _.sample([false,true])
  const $ship = $ships[mstId]
  const stype = $ship.api_stype
  const shipName = $ship.api_name
  const typeName = $shipTypes[stype].api_name
  const maxFuel = $ship.api_fuel_max
  const maxAmmo = $ship.api_bull_max

  return {
    mstId,
    stype,
    typeName,
    shipName,
    ring,
    computeCost: shipResupplyCost({ring,maxFuel,maxAmmo}),
    key: ind,
  }
})

const WrappedTd = ({content}) => (
  <td>
    <div style={{
      width: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden'}}>
      {content}
    </div>
  </td>)
WrappedTd.propTypes = PTyp.node.isRequired

const filters = []
const defineFilter = (id, title, func) =>
  filters.push({id,title,func})

defineFilter('all', 'All', () =>
  true)
defineFilter('de', 'DE', s =>
  s.stype === 1)
defineFilter('dd', 'DD', s =>
  s.stype === 2)
defineFilter('cl', 'CL', s =>
  s.stype === 3)
defineFilter('cv-like', 'CV/CVL/AV/CVB', s =>
  [11,7,16,18].includes(s.stype))
defineFilter('ss-like', 'SS/SSV', s =>
  [13,14].includes(s.stype))
defineFilter('ca', 'CA', s =>
  s.stype === 5)
defineFilter('bbv', 'BBV', s =>
  s.stype === 10)
defineFilter('as', 'AS', s =>
  s.stype === 20)
defineFilter('ct', 'CT', s =>
  s.stype === 21)
defineFilter('av', 'AV', s =>
  s.stype === 16)
defineFilter('cve', 'CVE', s =>
  [521, 526, 380, 529].includes(s.mstId))

class ShipList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: 'all',
      fuelPercent: 100,
      ammoPercent: 100,
    }
  }

  handleChangeFilter = filter => () =>
    this.setState({filter})

  handleChangeCost = s =>
    this.setState(s)

  render() {
    const filterFunc =
      filters.find(x => x.id === this.state.filter).func
    const {fuelPercent, ammoPercent} = this.state
    const fuelCostFactor = fuelPercent / 100
    const ammoCostFactor = ammoPercent / 100
    const iconStyle = {
      height: '1.2em',
    }
    return (
      <div>
        <CostPicker
          prefix="ship-list-"
          fuelPercent={fuelPercent}
          ammoPercent={ammoPercent}
          onChangeCost={this.handleChangeCost}
          style={{width: '90%', marginLeft: 10}}
        />
        <div style={{display: 'flex'}}>
          <div style={{margin: 10}}>
            <ButtonGroup vertical>
              {
                filters.map(({id,title}) => (
                  <Button
                    active={this.state.filter === id}
                    onClick={this.handleChangeFilter(id)}
                    key={id}
                    >
                    {title}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
          <div style={{flex: 1, marginTop: 10}}>
            <Table
              style={{tableLayout: 'fixed'}}
              striped bordered condensed hover>
              <thead>
                <tr>
                  <th style={{width: '16%'}}>
                    Type
                  </th>
                  <th style={{width: 'auto'}}>
                    Name
                  </th>
                  <th style={{width: '18%'}}>
                    <ItemIcon style={iconStyle} name="fuel" />
                  </th>
                  <th style={{width: '18%'}}>
                    <ItemIcon style={iconStyle} name="ammo" />
                  </th>
                  <th style={{width: '18%'}}>
                    <ItemIcon style={iconStyle} name="fuel" />
                    +
                    <ItemIcon style={iconStyle} name="ammo" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  shipList.map(s => {
                    const {fuelCost, ammoCost} =
                      s.computeCost(fuelCostFactor,ammoCostFactor)
                    return (
                      <tr
                        style={filterFunc(s) ? {} : {display: 'none'} }
                        key={s.key}>
                        <WrappedTd content={s.typeName} />
                        <td style={{display: 'flex'}}>
                          <div style={{
                            flex: 1,
                            width: 'auto',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}>
                            {s.shipName}
                          </div>
                          {
                            s.ring && (
                              <ItemIcon
                                style={iconStyle}
                                name="ring"
                              />
                            )
                          }
                        </td>
                        <td>{fuelCost}</td>
                        <td>{ammoCost}</td>
                        <td>{fuelCost+ammoCost}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    )
  }
}

export { ShipList }

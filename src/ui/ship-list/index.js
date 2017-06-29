import _ from 'lodash'
import React, { Component } from 'react'
import {
  ButtonGroup, Button,
  Table,
  DropdownButton, MenuItem,
  ButtonToolbar,
} from 'react-bootstrap'

import rawShipList from '../../assets/default-ship-list.json'
import masterData from '../../assets/api_start2.json'
import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

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


// table copied from:
// https://github.com/KC3Kai/KC3Kai/blob/7d551f3d84a386027286947552e3ef112c65a06b/src/pages/strategy/tabs/expedtable/expedtable.js#L108-L118
const expedCostGrouping = [
  {ammo: 0,fuel: 50,expeds: [2,4,5,7,9,11,12,14,31]},
  {ammo: 80,fuel: 80,expeds: [23,26,27,28,35,36,37,38]},
  {ammo: 40,fuel: 50,expeds: [13,15,16,19,20]},
  {ammo: 70,fuel: 80,expeds: [21,22,40]},
  {ammo: 80,fuel: 50,expeds: [25,33,34]},
  {ammo: 20,fuel: 50,expeds: [8,18]},
  {ammo: 20,fuel: 30,expeds: [3,6]},
  {ammo: 0,fuel: 30,expeds: [1,10]},
  {ammo: 90,fuel: 90,expeds: [39]},
  {ammo: 70,fuel: 90,expeds: [30]},
  {ammo: 60,fuel: 90,expeds: [24]},
  {ammo: 40,fuel: 90,expeds: [29]},
  {ammo: 30,fuel: 90,expeds: [32]},
  {ammo: 40,fuel: 30,expeds: [17]},
]

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

  handleChangeFuelPercent = fuelPercent =>
    this.setState({fuelPercent})

  handleChangeAmmoPercent = ammoPercent =>
    this.setState({ammoPercent})

  handleApplyPreset = ({ammo,fuel}) =>
    this.setState({
      ammoPercent: ammo,
      fuelPercent: fuel,
    })

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
        <div style={{width: '90%', marginLeft: 10}}>
          <ButtonToolbar justified>
            <DropdownButton
              onSelect={this.handleApplyPreset}
              style={{
                width: '15vw',
                maxWidth: 200,
              }}
              title="Presets"
              id="ship-list-preset">
              {
                expedCostGrouping.map(({fuel,ammo,expeds}) => {
                  const key = `f${fuel}-a${ammo}`
                  const es = expeds.join(', ')
                  const desc = `Fuel: ${fuel}%, Ammo: ${ammo}%, Expeditions: ${es}`
                  return (
                    <MenuItem key={key} eventKey={{ammo,fuel}}>
                      {desc}
                    </MenuItem>
                  )
                })
              }
            </DropdownButton>
            <DropdownButton
              style={{
                width: '20vw',
                maxWidth: 250,
              }}
              onSelect={this.handleChangeFuelPercent}
              title={`Fuel: ${fuelPercent}%`}
              id="ship-list-fuel">
              {
                _.times(10+1).map(x => {
                  const percent = x*10
                  return (
                    <MenuItem eventKey={percent}>
                      {`${percent}%`}
                    </MenuItem>
                  )
                })
              }
            </DropdownButton>
            <DropdownButton
              style={{
                width: '20vw',
                maxWidth: 250,
              }}
              onSelect={this.handleChangeAmmoPercent}
              title={`Ammo: ${ammoPercent}%`}
              id="ship-list-ammo">
              {
                _.times(10+1).map(x => {
                  const percent = x*10
                  return (
                    <MenuItem eventKey={percent}>
                      {`${percent}%`}
                    </MenuItem>
                  )
                })
              }
            </DropdownButton>
          </ButtonToolbar>
        </div>
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

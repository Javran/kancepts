import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import {
  ButtonGroup, Button,
  Table,
} from 'react-bootstrap'

import {
  costPickerSelector,
  shipDetailListSelector,
  translateSelector,
} from '../../selectors'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

import { CostPicker } from '../cost-picker'
import { filters } from '../../ship-filters'
import { mapDispatchToProps } from '../../store/reducer/ship-list'
import { modifyArray } from '../../utils'
import { SearchAndAdd } from './search-and-add'

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

class ShipListImpl extends Component {
  static propTypes = {
    shipDetailList: PTyp.array.isRequired,
    fuelPercent: PTyp.number.isRequired,
    ammoPercent: PTyp.number.isRequired,
    tr: PTyp.func.isRequired,
    modifyShipList: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: 'any',
    }
  }

  handleChangeFilter = filter => () =>
    this.setState({filter})

  handleToggleRing = rosterId => () =>
    this.props.modifyShipList(shipList => {
      const shipInd = shipList.findIndex(s => s.rosterId === rosterId)
      if (shipInd === -1) {
        console.error(`cannot find ship with rosterId ${rosterId}`)
        return shipList
      }
      return modifyArray(
        shipInd, ship => ({
          ...ship,
          ring: !ship.ring,
        })
      )(shipList)
    })

  handleRemoveShip = rosterId => () =>
    this.props.modifyShipList(shipList =>
      shipList.filter(s => s.rosterId !== rosterId))

  render() {
    const {shipDetailList, tr} = this.props
    const filterFunc =
      filters.find(x => x.id === this.state.filter).func
    const {fuelPercent, ammoPercent} = this.props
    const fuelCostFactor = fuelPercent / 100
    const ammoCostFactor = ammoPercent / 100
    const iconStyle = {
      height: '1em',
    }
    return (
      <div>
        <CostPicker
          prefix="ship-list-"
          style={{marginLeft: 10, marginBottom: 10}}
        />
        <SearchAndAdd
          style={{marginLeft: 10, marginBottom: 2}}
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
                    {tr('ShipType')}
                  </th>
                  <th style={{width: 'auto'}}>
                    {tr('ShipName')}
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
                  <th style={{width: '7%'}} />
                </tr>
              </thead>
              <tbody>
                {
                  shipDetailList
                    .filter(filterFunc)
                    .map(s => {
                      const {fuelCost, ammoCost} =
                        s.computeCost(fuelCostFactor,ammoCostFactor)
                      return (
                        <tr
                          key={s.rosterId}>
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
                            <Button
                              onClick={this.handleToggleRing(s.rosterId)}
                              bsStyle={s.ring ? 'primary' : 'default'}
                              style={s.ring ? {} : {opacity: .5}}
                              bsSize="xsmall">
                              <ItemIcon
                                style={iconStyle}
                                name="ring"
                              />
                            </Button>
                          </td>
                          <td>{fuelCost}</td>
                          <td>{ammoCost}</td>
                          <td>{fuelCost+ammoCost}</td>
                          <td style={{textAlign: 'center'}}>
                            <Button
                              onClick={this.handleRemoveShip(s.rosterId)}
                              bsSize="xsmall" bsStyle="danger">
                              <FontAwesome name="close" />
                            </Button>
                          </td>
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

const ShipList = connect(
  state => {
    const shipDetailList = shipDetailListSelector(state)
    const {tr} = translateSelector(state)
    const cost = costPickerSelector(state)
    return {shipDetailList, tr, ...cost}
  },
  mapDispatchToProps
)(ShipListImpl)

export { ShipList }

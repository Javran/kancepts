import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import {
  ButtonGroup, Button,
  Table,
} from 'react-bootstrap'

import {
  translateSelector,
  shipListUISelector,
} from '../../selectors'
import {
  shipViewListSelector,
} from './selectors'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

import { CostPicker } from '../cost-picker'
import { filters } from '../../ship-filters'
import { mapDispatchToProps as shipListMdtp } from '../../store/reducer/ship-list'
import { mapDispatchToProps as shipListUIMdtp } from '../../store/reducer/ui/ship-list'
import { modifyArray, modifyObject, mergeMapDispatchToProps } from '../../utils'
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
    shipViewList: PTyp.array.isRequired,
    tr: PTyp.func.isRequired,
    filter: PTyp.string.isRequired,
    sort: PTyp.shape({
      reversed: PTyp.bool.isRequired,
      method: PTyp.string.isRequired,
    }).isRequired,
    modifyShipList: PTyp.func.isRequired,
    modifyShipListUI: PTyp.func.isRequired,
  }

  modifySort = modifier =>
    this.props.modifyShipListUI(
      modifyObject('sort', modifier))

  handleChangeFilter = filter => () =>
    this.props.modifyShipListUI(
      modifyObject('filter', () => filter))

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

  handleClickSorter = method => () => {
    const thisMethod = this.props.sort.method

    if (thisMethod === method) {
      this.modifySort(
        modifyObject('reversed', x => !x)
      )
    } else {
      this.modifySort(s => ({
        ...s,
        method,
        reversed: false,
      }))
    }
  }

  mayRenderSorterDir = method => {
    const thisMethod = this.props.sort.method
    if (thisMethod !== method)
      return false
    const name = this.props.sort.reversed ? 'sort-desc' : 'sort-asc'
    return (
      <FontAwesome style={{marginLeft: '.5em'}} name={name} />
    )
  }

  render() {
    const {shipViewList, tr, filter} = this.props
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
                    active={filter === id}
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
                  <th
                    style={{width: '16%'}}
                    onClick={this.handleClickSorter('stype')}
                  >
                    {tr('ShipType')}
                    {this.mayRenderSorterDir('stype')}
                  </th>
                  <th style={{width: 'auto'}}>
                    {tr('ShipName')}
                  </th>
                  <th
                    style={{width: '18%'}}
                    onClick={this.handleClickSorter('fuel')}
                  >
                    <ItemIcon style={iconStyle} name="fuel" />
                    {this.mayRenderSorterDir('fuel')}
                  </th>
                  <th
                    style={{width: '18%'}}
                    onClick={this.handleClickSorter('ammo')}
                  >
                    <ItemIcon style={iconStyle} name="ammo" />
                    {this.mayRenderSorterDir('ammo')}
                  </th>
                  <th
                    style={{width: '18%'}}
                    onClick={this.handleClickSorter('sumFuelAmmo')}
                  >
                    <ItemIcon style={iconStyle} name="fuel" />
                    +
                    <ItemIcon style={iconStyle} name="ammo" />
                    {this.mayRenderSorterDir('sumFuelAmmo')}
                  </th>
                  <th style={{width: '7%'}} />
                </tr>
              </thead>
              <tbody>
                {
                shipViewList
                  .map(s => {
                    const {
                      rosterId, typeName, shipName,
                      fuel, ammo, sumFuelAmmo,
                      ring,
                    } = s
                    return (
                      <tr
                        key={rosterId}>
                        <WrappedTd content={typeName} />
                        <td style={{display: 'flex'}}>
                          <div style={{
                            flex: 1,
                            width: 'auto',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                          }}>
                            {shipName}
                          </div>
                          <Button
                            onClick={this.handleToggleRing(rosterId)}
                            bsStyle={ring ? 'primary' : 'default'}
                            style={ring ? {} : {opacity: .5}}
                            bsSize="xsmall">
                            <ItemIcon
                              style={iconStyle}
                              name="ring"
                            />
                          </Button>
                        </td>
                        <td>{fuel}</td>
                        <td>{ammo}</td>
                        <td>{sumFuelAmmo}</td>
                        <td style={{textAlign: 'center'}}>
                          <Button
                            onClick={this.handleRemoveShip(rosterId)}
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
    const shipViewList = shipViewListSelector(state)
    const {filter, sort} = shipListUISelector(state)
    const {tr} = translateSelector(state)
    return {shipViewList, tr, filter, sort}
  },
  mergeMapDispatchToProps(
    shipListMdtp,
    shipListUIMdtp
  )
)(ShipListImpl)

export { ShipList }

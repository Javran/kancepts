import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ButtonGroup, Button,
  Table,
} from 'react-bootstrap'

import {
  shipDetailListSelector,
  translateSelector,
} from '../../selectors'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'

import { CostPicker } from '../cost-picker'
import { filters } from '../../ship-filters'

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
    tr: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      filter: 'any',
      fuelPercent: 100,
      ammoPercent: 100,
    }
  }

  handleChangeFilter = filter => () =>
    this.setState({filter})

  handleChangeCost = s =>
    this.setState(s)

  render() {
    const {shipDetailList, tr} = this.props
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
                </tr>
              </thead>
              <tbody>
                {
                  shipDetailList.map(s => {
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

const ShipList = connect(state => {
  const shipDetailList = shipDetailListSelector(state)
  const {tr} = translateSelector(state)
  return {shipDetailList, tr}
})(ShipListImpl)

export { ShipList }

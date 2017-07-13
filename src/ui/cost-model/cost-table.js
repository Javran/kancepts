import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { enumFromTo } from '../../utils'
import { filters } from '../../ship-filters'

import { PTyp } from '../../ptyp'
import { Cell } from './cell'

class CostTable extends Component {
  static propTypes = {
    costModel: PTyp.func.isRequired,
    fuelPercent: PTyp.number.isRequired,
    ammoPercent: PTyp.number.isRequired,
    tr: PTyp.func.isRequired,
    trN: PTyp.func.isRequired,
  }

  render() {
    const {
      costModel,
      fuelPercent,
      ammoPercent,
      tr,
      trN,
    } = this.props
    return (
      <Table
        style={{tableLayout: 'fixed', margin: 10}}
        striped bordered condensed hover>
        <thead>
          <tr>
            <th>
              {tr('ShipType')}
            </th>
            {
              enumFromTo(1,6).map(x => (
                <th key={x} style={{width: '15%'}}>{trN('ShipN',x)}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filters.map(flt => {
              const {id, title} = flt
              return (
                <tr key={id}>
                  <th>{title}</th>
                  {
                    enumFromTo(1,6).map(x => {
                      const cost = costModel({fuelPercent,ammoPercent})(id,x)
                      return (
                        <th key={x}>
                          <Cell cost={cost} tr={tr} />
                        </th>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    )
  }
}

export {
  CostTable,
}

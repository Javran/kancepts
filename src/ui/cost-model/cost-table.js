import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import _ from 'lodash'

import { enumFromTo } from '../../utils'
import { filters } from '../../ship-filters'

const scan = (xs, acc, zero) => {
  const ys = new Array(xs.length+1)
  ys[0] = zero
  for (let i=0; i<xs.length; ++i) {
    ys[i+1] = acc(ys[i],xs[i])
  }
  return ys
}

class CostTable extends Component {
  render() {
    const {
      shipCostListByFilter,
      fuelPercent,
      ammoPercent,
    } = this.props
    const fuelCostFactor = fuelPercent / 100
    const ammoCostFactor = ammoPercent / 100
    return (
      <Table
        style={{tableLayout: 'fixed', margin: 10}}
        striped bordered condensed hover>
        <thead>
          <tr>
            <th>
              Type
            </th>
            {
              enumFromTo(1,6).map(x => (
                <th key={x} style={{width: '14%'}}>{x} ship(s)</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            _.tail(filters).map(flt => {
              const {id, title} = flt
              // sort and select first 6 ships with lowest cost
              const shipCostList = _.take(
                shipCostListByFilter[id]
                  .map(s => {
                    const {fuelCost, ammoCost} = s.computeCost(fuelCostFactor,ammoCostFactor)
                    return {...s, fuelCost, ammoCost, nameList: [s.shipName]}
                  })
                  .sort( (x,y) => (x.fuelCost+x.ammoCost) - (y.fuelCost+y.ammoCost) ),
                6)
              const plusCost = (x,y) => ({
                fuelCost: x.fuelCost + y.fuelCost,
                ammoCost: x.ammoCost + y.ammoCost,
                nameList: [...x.nameList, ...y.nameList],
              })
              const accumulatedCostList = scan(
                shipCostList,
                plusCost,
                {fuelCost: 0, ammoCost: 0, nameList: []})
              return (
                <tr key={id}>
                  <th>{title}</th>
                  {
                    enumFromTo(1,6).map(x => {
                      const cost = accumulatedCostList[x]
                      const content = typeof cost !== 'undefined' ?
                        `F: ${cost.fuelCost}, A: ${cost.ammoCost} (${cost.nameList.join(', ')})` :
                        'N/A'
                      return (
                        <th key={x}>{content}</th>
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

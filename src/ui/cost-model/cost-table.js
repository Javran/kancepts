import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import _ from 'lodash'

import { enumFromTo } from '../../utils'
import { filters } from '../../ship-filters'

class CostTable extends Component {
  render() {
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
              return (
                <tr key={id}>
                  <th>{title}</th>
                  {
                    enumFromTo(1,6).map(x => (
                      <th key={x}>cell placeholder</th>
                    ))
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

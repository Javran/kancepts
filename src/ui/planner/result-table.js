import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'

import { resourceProperties } from '../../exped-info'
import { ItemIcon } from '../item-icon'
import { enumFromTo } from '../../utils'

class ResultTable extends Component {
  render() {
    return (
      <div
        style={{
          marginLeft: 8,
          marginTop: 10,
        }}
      >
        <Table
          style={{
            tableLayout: 'fixed',
          }}
          striped bordered condensed hover
        >
          <thead>
            <tr>
              <th style={{width: 'auto'}}>
                Expedition Set
              </th>
              {
                resourceProperties.map(rp => (
                  <th key={rp} style={{width: '16%'}}>
                    <ItemIcon
                      style={{width: '1.2em'}}
                      name={rp} /> /hr
                  </th>
                ))
              }
              <th style={{width: '18%'}}>Score</th>
            </tr>
          </thead>
          <tbody>
            {
              enumFromTo(1,100).map(x => (
                <tr key={x}>
                  {
                    enumFromTo(1,6).map(y => (
                      <td key={y}>{_.random(1000)}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

export {
  ResultTable,
}

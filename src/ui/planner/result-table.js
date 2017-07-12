import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { resourceProperties } from '../../exped-info'
import { ItemIcon } from '../item-icon'
import { plannerResultsSelector } from '../../selectors'
import { PTyp } from '../../ptyp'
import { ExpedsDetail } from './expeds-detail'

class ResultTableImpl extends Component {
  static propTypes = {
    results: PTyp.array.isRequired,
  }
  render() {
    const {results} = this.props
    const pprNum = x => _.isInteger(x) ? String(x) : x.toFixed(2)
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
              results.map(result => {
                const {expedIds, resource, score} = result
                const key=`planner-result-row-${expedIds.join('-')}`
                return (
                  <OverlayTrigger
                    key={key}
                    placement="top"
                    overlay={
                      <Tooltip id={`tooltip-${key}`}>
                        <ExpedsDetail expedIds={expedIds} />
                      </Tooltip>
                    }
                  >
                    <tr>
                      <td key="eids">{expedIds.join(', ')}</td>
                      {
                        resourceProperties.map(rp => (
                          <td key={rp}>
                            {pprNum(resource[rp])}
                          </td>
                        ))
                      }
                      <td key="score">{pprNum(score)}</td>
                    </tr>
                  </OverlayTrigger>
                )
              })
            }
          </tbody>
        </Table>
      </div>
    )
  }
}

const ResultTable = connect(state => {
  const results = _.take(plannerResultsSelector(state),100)
  return {results}
})(ResultTableImpl)

export {
  ResultTable,
}

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Table } from 'react-bootstrap'

import { resourceProperties } from '../../exped-info'
import { ItemIcon } from '../item-icon'
import { plannerResultsSelector } from '../../selectors'
import { PTyp } from '../../ptyp'

const genRandomResults = () => _.fill(new Array(_.random(10,20)),undefined).map(() => {
  const expedIds = [1,2,3]
  const score = _.random(1000,5000)
  const resource = _.fromPairs(
    resourceProperties.map(rp =>
      [rp, _.random(1000,2000)/10]))
  return {expedIds, score, resource}
})

class ResultTableImpl extends Component {
  static propTypes = {
    results: PTyp.array.isRequired,
  }
  render() {
    /*
       TODO every structure looks like:
       {
         expedIds: <list of expedition ids>,
         resource: <resource object>,
         score: <number>,
       }
     */
    // const {results} = this.props
    const results = genRandomResults()
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
              results.map((result,ind) => {
                const {expedIds, resource, score} = result
                return (
                  <tr key={
                    // eslint-disable-next-line react/no-array-index-key
                    ind
                  }>
                    <td key="eids">{expedIds.join(', ')}</td>
                    {
                      resourceProperties.map(rp => (
                        <td key={rp}>
                          {resource[rp]}
                        </td>
                      ))
                    }
                    <td key="score">{score}</td>
                  </tr>
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

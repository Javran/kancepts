import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
} from 'react-bootstrap'
import { PTyp } from '../../ptyp'
import { dlcLabSelector } from '../../selectors'
import { enumFromTo } from '../../utils'

class EquipmentTableImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    equipments: PTyp.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {equipments, style} = this.props
    return (
      <Table
        style={style}
        bordered condensed>
        <thead>
          <tr>
            <th>Name</th>
            <th>Level</th>
            <th>Count</th>
          </tr>
        </thead>
        <tbody>
          {
            _.flatMap(
              [
                ['大発動艇', 68],
                ['特大発動艇', 193],
                ['大発動艇(八九式中戦車&陸戦隊)', 166],
                ['特型内火艇', 167],
              ],
              ([name,masterId]) => {
                const equipment = equipments[masterId]
                if (typeof equipment === 'undefined')
                  return []
                const partialRows = _.flatMap(
                  enumFromTo(0,10),
                  (level,ind) => {
                    const count = equipment[level]
                    if (! _.isInteger(count))
                      return []
                    const key = `${masterId}-${level}`
                    return [rowSpan => (
                      <tr key={key}>
                        {
                          ind === 0 &&
                          (<td rowSpan={rowSpan}>{name}</td>)
                        }
                        <td>{level}</td>
                        <td>{count}</td>
                      </tr>
                    )]
                  })
                return partialRows.map(f =>
                  f(partialRows.length))
              })
          }
        </tbody>
      </Table>
    )
  }
}

const EquipmentTable = connect(
  state => {
    const {equipments} = dlcLabSelector(state)
    return {equipments}
  }
)(EquipmentTableImpl)

export { EquipmentTable }

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
} from 'react-bootstrap'
import { PTyp } from '../../ptyp'
import { dlcLabSelector } from '../../selectors'
import { enumFromTo } from '../../utils'
import { dlcList } from '../../master-data'
import { EquipmentTableRow } from './equipment-table-row'

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
        style={{
          ...style,
          tableLayout: 'fixed',
        }}
        bordered condensed>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{width: '32%'}}>Level</th>
            <th style={{width: '32%'}}>Count</th>
          </tr>
        </thead>
        <tbody>
          {
            _.flatMap(
              dlcList,
              ({name,id}) => {
                const equipment = equipments[id]
                if (typeof equipment === 'undefined')
                  return []
                const partialRows = _.flatMap(
                  enumFromTo(0,10),
                  (level,ind) => {
                    const count = equipment[level]
                    if (! _.isInteger(count))
                      return []
                    const key = `${id}-${level}`
                    return [rowSpan => (
                      <EquipmentTableRow
                        key={key}
                        name={name} level={level} count={count}
                        rowSpan={ind===0 ? rowSpan : null}
                      />
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

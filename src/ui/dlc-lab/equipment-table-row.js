import _ from 'lodash'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'

import { improvementToText } from '../../utils'
import { CellControl } from './cell-control'
import { PTyp } from '../../ptyp'

class EquipmentTableRow extends Component {
  static propTypes = {
    // only make sense when the current row
    // is responsible for showing the name col
    rowSpan: PTyp.number,
    name: PTyp.string.isRequired,
    level: PTyp.number.isRequired,
    count: PTyp.number.isRequired,
  }

  static defaultProps = {
    rowSpan: null,
  }

  render() {
    const {
      rowSpan,
      name, level, count,
    } = this.props
    return (
      <tr>
        {
          _.isInteger(rowSpan) &&
          (
            <td
              rowSpan={rowSpan}
              style={{
                textAlign: 'center',
                verticalAlign: 'middle',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}>
              {name}
            </td>
          )
        }
        <td>
          <CellControl
            leftBtnContent={
              <FontAwesome name="angle-double-up" />
            }
            rightBtnContent={
              <FontAwesome name="angle-double-down" />
            }
            value={improvementToText(level)} />
        </td>
        <td>
          <CellControl
            leftBtnContent={
              <FontAwesome
                name={
                  count > 0 ? "minus" : "trash"
                } />
            }
            rightBtnContent={
              <FontAwesome name="plus" />
            }
            value={count} />
        </td>
      </tr>
    )
  }
}

export { EquipmentTableRow }

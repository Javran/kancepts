import _ from 'lodash'
import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import Markdown from 'react-remarkable'

import { improvementToText } from '../../utils'
import { CellControl } from './cell-control'
import { PTyp } from '../../ptyp'

class EquipmentTableRow extends Component {
  static propTypes = {
    name: PTyp.string.isRequired,
    id: PTyp.number.isRequired,
    level: PTyp.number.isRequired,
    count: PTyp.number.isRequired,
    // only make sense when the current row
    // is responsible for showing the name col
    rowSpan: PTyp.number,
  }

  static defaultProps = {
    rowSpan: null,
  }

  render() {
    const {
      rowSpan,
      name, id, level, count,
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
            prefix={`dlc-level-${id}-${level}-`}
            leftBtnContent={
              <FontAwesome name="angle-double-down" />
            }
            leftBtnTooltip={
              <Markdown>
                Downgrade **one** equipment
              </Markdown>
            }
            rightBtnContent={
              <FontAwesome name="angle-double-up" />
            }
            rightBtnTooltip={
              <Markdown>
                Upgrade **one** equipment
              </Markdown>
            }
            value={improvementToText(level)} />
        </td>
        <td>
          <CellControl
            prefix={`dlc-count-${id}-${count}-`}
            leftBtnContent={
              <FontAwesome
                name={
                  count > 0 ? 'minus' : 'trash'
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

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import Markdown from 'react-remarkable'

import { modifyObject, improvementToText } from '../../utils'
import { CellControl } from './cell-control'
import { PTyp } from '../../ptyp'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'

class EquipmentTableRowImpl extends Component {
  static propTypes = {
    name: PTyp.string.isRequired,
    id: PTyp.number.isRequired,
    level: PTyp.number.isRequired,
    count: PTyp.number.isRequired,

    modifyDlcLabUI: PTyp.func.isRequired,
    // only make sense when the current row
    // is responsible for showing the name col
    rowSpan: PTyp.number,
  }

  static defaultProps = {
    rowSpan: null,
  }

  handleCountChange = which => {
    const {id, level, count, modifyDlcLabUI} = this.props
    const modifyEquipment = modifier =>
      modifyDlcLabUI(
        modifyObject(
          'equipments',
          modifyObject(
            id,
            modifier)))
    if (which === 'plus') {
      // most of the time here we don't need to
      // check for 'undefined' values
      // because otherwise this very row cannot exist
      // in the first place
      return () => modifyEquipment(
        modifyObject(
          level,
          () => count+1
        )
      )
    }
    if (which === 'minus') {
      if (count === 0) {
        // need to remove this row
        return () => modifyEquipment(
          equipment => {
            const newEquipment = {...equipment}
            delete newEquipment[level]
            return newEquipment
          })
      } else {
        // just minus by 1
        return () => modifyEquipment(
          modifyObject(
            level,
            () => count-1)
        )
      }
    }
  }

  handleLevelChange = which => {
    const {id, level, count, modifyDlcLabUI} = this.props
    const modifyEquipment = modifier =>
      modifyDlcLabUI(
        modifyObject(
          'equipments',
          modifyObject(
            id,
            modifier)))
    if (count === 0)
      // nothing to upgrade or downgrade
      return null

    if (which === 'up') {
      if (level >= 10)
        return null
      return () => modifyEquipment(
        _.flow([
          modifyObject(
            level,
            () => count-1),
          modifyObject(
            level+1,
            (curCount=0) => curCount+1),
        ]))
    }

    if (which === 'down') {
      if (level <= 0)
        return null
      return () => modifyEquipment(
        _.flow([
          modifyObject(
            level,
            () => count-1),
          modifyObject(
            level-1,
            (curCount=0) => curCount+1),
        ]))
    }
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
            leftAction={this.handleLevelChange('down')}
            rightBtnContent={
              <FontAwesome name="angle-double-up" />
            }
            rightBtnTooltip={
              <Markdown>
                Upgrade **one** equipment
              </Markdown>
            }
            rightAction={this.handleLevelChange('up')}
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
            leftAction={this.handleCountChange('minus')}
            rightBtnContent={
              <FontAwesome name="plus" />
            }
            rightAction={this.handleCountChange('plus')}
            value={count} />
        </td>
      </tr>
    )
  }
}

const EquipmentTableRow = connect(
  null,
  mapDispatchToProps)(EquipmentTableRowImpl)

export { EquipmentTableRow }

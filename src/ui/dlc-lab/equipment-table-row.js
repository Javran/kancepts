import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'
import Markdown from 'react-remarkable'
import { modifyObject } from 'subtender'

import { improvementToText } from '../../utils'
import { CellControl } from './cell-control'
import { PTyp } from '../../ptyp'
import { translateSelector } from '../../selectors'
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
    tr: PTyp.func.isRequired,
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

    const minus = val => {
      const newVal = val-1
      return newVal <= 0 ? undefined : newVal
    }

    if (which === 'up') {
      if (level >= 10)
        return null
      return () => modifyEquipment(
        _.flow([
          modifyObject(
            level,
            () => minus(count),
            true),
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
            () => minus(count),
            true),
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
      tr,
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
              <Markdown
                source={tr('DlcLab.DlcTable.DowngradeOneMarkdown')}
              />
            }
            leftAction={this.handleLevelChange('down')}
            rightBtnContent={
              <FontAwesome name="angle-double-up" />
            }
            rightBtnTooltip={
              <Markdown
                source={tr('DlcLab.DlcTable.UpgradeOneMarkdown')}
              />
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
  translateSelector,
  mapDispatchToProps)(EquipmentTableRowImpl)

export { EquipmentTableRow }

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { PTyp } from '../../ptyp'
import {
  formatTime,
  resourceColor,
  resourceProperties,
  guessGreatSuccess,
} from '../../exped-info'
import { tableUISelector, translateSelector } from '../../selectors'
import { ItemView } from './item-view'
import { ModifierView } from './modifier-view'
import { CostView } from './cost-view'

class ExpedRowViewImpl extends Component {
  static propTypes = {
    expedInfoView: PTyp.object.isRequired,
    editing: PTyp.bool.isRequired,
    onToggleEditor: PTyp.func.isRequired,
    numeric: PTyp.bool.isRequired,
    isHourly: PTyp.bool.isRequired,
    tr: PTyp.func.isRequired,
  }

  render() {
    const {
      expedInfoView,
      editing,
      onToggleEditor,
      numeric,
      isHourly,
      tr,
    } = this.props
    const {
      info,
      config,
      showResource,
      resupplyInfo,
    } = expedInfoView
    const {
      id, name, time, dispNum,
      itemProb, itemGS,
    } = info
    const {
      modifier, cost,
    } = config
    const guessedGS = guessGreatSuccess(modifier)
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          width: '20%', marginRight: 10,
        }}>
          <div style={{width: '2em', marginRight: 8}}>{dispNum}</div>
          <div style={{
            flex: 1,
            width: 'auto',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden'}}>
            {name}
          </div>
          <div style={{width: '3em'}}>{formatTime(time)}</div>
        </div>
        <div style={{display: 'flex', flex: 1, width: '45%'}}>
          {
            resourceProperties.map(rp => {
              const resourceVal = _.get(showResource,rp,null)
              /* eslint-disable indent */
              const resourceText =
                resourceVal === null ? tr('Table.NotAva') :
                _.isInteger(resourceVal) ? String(resourceVal) :
                String(resourceVal.toFixed(2))
              /* eslint-enable indent */
              const nz = resourceVal !== 0
              const style = nz ?
                {fontWeight: 'bold', color: resourceColor[rp]} :
                {}
              return (
                <div key={rp} style={{
                  width: '14%',
                  ...style,
                }}>
                  {resourceText}
                </div>
              )
            })
          }
          <ItemView
            key="item1"
            style={{width: '21%'}}
            isHourly={isHourly}
            time={time}
            item={itemProb}
            gs={null}
            tr={tr}
            prefix={`exped-row-${id}-item1-`}
          />
          <ItemView
            key="item2"
            style={{width: '21%'}}
            isHourly={isHourly}
            time={time}
            item={itemGS}
            gs={guessedGS}
            tr={tr}
            prefix={`exped-row-${id}-item2-`}
          />
        </div>
        <div style={{
          width: '30%',
          display: 'flex',
          alignItems: 'center',
        }}>
          <ModifierView
            prefix={`exped-row-${id}-`}
            style={{width: '50%'}}
            modifier={modifier}
            numeric={numeric}
          />
          <CostView
            prefix={`exped-row-${id}-`}
            style={{width: '50%'}}
            cost={cost}
            numeric={numeric}
            tr={tr}
            resupplyInfo={resupplyInfo}
          />
        </div>
        <Button
          onClick={onToggleEditor}
          bsSize="xsmall"
          style={{width: '5%'}}
        >
          <FontAwesome name={editing ? 'undo' : 'edit'} />
        </Button>
      </div>
    )
  }
}

const ExpedRowView = connect(
  state => {
    const {numeric, divide} = tableUISelector(state).view
    const {tr} = translateSelector(state)
    const isHourly = divide === 'hourly'
    return {numeric, isHourly, tr}
  }
)(ExpedRowViewImpl)

export { ExpedRowView }

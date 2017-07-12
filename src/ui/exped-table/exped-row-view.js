import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'
import {
  formatTime,
  resourceColor,
  resourceProperties,
} from '../../exped-info'
import { tableUISelector } from '../../selectors'
import { ModifierView } from './modifier-view'
import { CostView } from './cost-view'

// eslint-disable-next-line react/prop-types
const mkItem = ({name, maxCount}, isGS) => {
  if (name === null || maxCount === 0)
    return (<span>-</span>)
  const countText = isGS ?
    (maxCount > 1 ? `1~${maxCount}` : '1') :
    `0~${maxCount}`
  return (
    <span>
      <ItemIcon style={{width: '1.1em'}} name={name} />
      <span>{`x${countText}`}</span>
    </span>
  )
}

class ExpedRowViewImpl extends Component {
  static propTypes = {
    expedInfoView: PTyp.object.isRequired,
    editing: PTyp.bool.isRequired,
    onToggleEditor: PTyp.func.isRequired,
    numeric: PTyp.bool.isRequired,
  }

  render() {
    const {
      expedInfoView,
      editing,
      onToggleEditor,
      numeric,
    } = this.props
    const {
      info,
      config,
      showResource,
      resupplyInfo,
    } = expedInfoView
    const {
      id, name, time,
      itemProb, itemGS,
    } = info
    const {
      modifier, cost,
    } = config
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{
          display: 'flex', alignItems: 'baseline',
          width: '20%', marginRight: 10,
        }}>
          <div style={{width: '2em', marginRight: 8}}>{id}</div>
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
              const resourceVal = showResource[rp]
              const resourceText =
                resourceVal === null ? 'N/A' :
                _.isInteger(resourceVal) ? String(resourceVal) :
                String(resourceVal.toFixed(2))
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
          <div key="item1" style={{width: '21%'}}>
            {mkItem(itemProb,false)}
          </div>
          <div key="item2" style={{width: '21%'}}>
            {mkItem(itemGS,true)}
          </div>
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
    const {numeric} = tableUISelector(state).view
    return {numeric}
  }
)(ExpedRowViewImpl)

export { ExpedRowView }

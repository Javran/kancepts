import _ from 'lodash'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { ItemIcon } from '../item-icon'
import { PTyp } from '../../ptyp'
import { filters } from '../../ship-filters'
import {
  formatTime,
  resourceColor,
  resourceProperties,
} from '../../exped-info'

// 0 < value < 5
const pprIncomePercent = v => {
  if (v <= 0 || v >= 5)
    return console.error(`invariant violation: ${v} is not in range (0,5)`)
  if (v < 1) {
    const diff = (1-v)*100
    return `-${diff.toFixed(2)}%`
  } else {
    const diff = (v-1)*100
    return `+${diff.toFixed(2)}%`
  }
}

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

const viewModifier = modifier => {
  if (modifier.type === 'standard') {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{
          fontWeight: 'bold',
          width: '1.1em',
          marginRight: 4,
        }}>
          {modifier.gs ? '大' : '普'}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ItemIcon name="dlc" style={{height: '2em'}} />
          <span>x{modifier.daihatsu}</span>
        </div>
      </div>
    )
  }
  if (modifier.type === 'custom')
    return (<div>{`${pprIncomePercent(modifier.value)}`}</div>)
}

const viewCost = cost => {
  if (cost.type === 'cost-model') {
    const filterInfo = filters.find(d => d.id === cost.wildcard)
    const name = typeof filterInfo === 'undefined' ?
      cost.wildcard :
      filterInfo.title
    return (
      <div>
        {`≥${cost.count}, *=${name}`}
      </div>
    )
  }
  if (cost.type === 'custom') {
    return (
      <div style={{display: 'flex'}}>
        <div style={{
          flex: 1,
          fontWeight: 'bold',
          color: resourceColor.fuel,
        }}>
          {-cost.fuel}
        </div>
        <div style={{
          flex: 1,
          fontWeight: 'bold',
          color: resourceColor.ammo,
        }}>
          {-cost.ammo}
        </div>
      </div>
    )
  }
}

class ExpedRowView extends Component {
  static propTypes = {
    expedInfoView: PTyp.object.isRequired,
    editing: PTyp.bool.isRequired,
    onToggleEditor: PTyp.func.isRequired,
  }

  render() {
    const {
      expedInfoView,
      editing,
      onToggleEditor,
    } = this.props
    const {info, config, showResource} = expedInfoView
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
          <div style={{width: '50%'}}>{viewModifier(modifier)}</div>
          <div style={{width: '50%'}}>{viewCost(cost)}</div>
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

export { ExpedRowView }

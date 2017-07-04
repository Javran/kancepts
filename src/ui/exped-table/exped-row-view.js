import _ from 'lodash'
import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { ItemIcon } from '../item-icon'

const formatTime = minutes => {
  const mm = minutes % 60
  const hh = Math.round((minutes - mm) / 60)
  const mmText = _.padStart(mm, 2, '0')
  const hhText = _.padStart(hh, 2, '0')
  return `${hhText}:${mmText}`
}

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

const resourceColor = {
  fuel: '#276F1D',
  ammo: '#615233',
  steel: '#727272',
  bauxite: '#B98154',
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
    return (<div>{`${modifier.value.toFixed(2)}`}</div>)
}

const viewCost = cost => {
  if (cost.type === 'cost-model') {
    return (
      <div>
        {`>=${cost.count}, *=${cost.wildcard}`}
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

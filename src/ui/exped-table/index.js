import _ from 'lodash'
import React, { Component } from 'react'
import {
  Table,
  Button,
  ListGroup, ListGroupItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import expedInfoListRaw from '../../assets/exped-info.json'

import { ItemIcon } from '../item-icon'
import { ExpedRow } from './exped-row'

const resourceProperties = ['fuel', 'ammo', 'steel', 'bauxite']

const itemIdToName = x =>
    x === 0 ? null
  : x === 1 ? 'bucket'
  : x === 2 ? 'instant-build'
  : x === 3 ? 'dev-mat'
  : x === 10 ? 'coin-small'
  : x === 11 ? 'coin-medium'
  : x === 12 ? 'coin-large'
  : console.error(`unknown item id: ${x}`)

const expedInfoList = expedInfoListRaw.map(raw => {
  const id = raw.api_id
  const name = raw.api_name
  const time = raw.api_time
  const [fuel,ammo,steel,bauxite] = raw.resource
  const fromRawItem = ([itmId, itmCnt]) =>
    ({name: itemIdToName(itmId), count: itmCnt})

  const itemProb = fromRawItem(raw.api_win_item1)
  const itemGS = fromRawItem(raw.api_win_item2)
  return {
    id, name, time,
    resource: {fuel, ammo, steel, bauxite},
    // itemProb: item obtainable randomly from expedition
    // itemGS: guaranteed item if great success is achieved
    itemProb, itemGS,
  }
})

// eslint-disable-next-line react/prop-types
const mkItem = ({name, count}, isGS) => {
  if (name === null || count === 0)
    return (<span>-</span>)
  const countText = isGS ?
    (count > 1 ? `1~${count}` : '1') :
    `0~${count}`
  return (
    <span>
      <ItemIcon style={{width: '1.1em'}} name={name} />
      <span>{`x${countText}`}</span>
    </span>
  )
}

const resourceColor = {
  fuel: '#276F1D',
  ammo: '#615233',
  steel: '#727272',
  bauxite: '#B98154',
}

const genBool = () => _.sample([false,true])

const genIncomeModifier = () => {
  const type = _.sample(['standard','custom'])
  if (type === 'standard') {
    return {
      type,
      gs: genBool(),
      daihatsu: _.random(0,4),
    }
  }

  if (type === 'custom') {
    return {
      type,
      value: _.random(1,1.3),
    }
  }
}

const genCostConfig = () => {
  const type = _.sample(['cost-model','custom'])
  if (type === 'cost-model') {
    const wildcard = _.sample([false, 'DD','DE','SS'])
    return {
      type,
      wildcard,
      count: _.random(1,6),
    }
  }

  if (type === 'custom') {
    return {
      type,
      fuel: _.random(0,500),
      ammo: _.random(0,500),
    }
  }
}

const genExpedConfig = () => {
  const modifier = genIncomeModifier()
  const cost = genCostConfig()
  return {modifier, cost}
}

const randomExpedConfigTable = {}
for (let i = 1; i <= 40; ++i) {
  randomExpedConfigTable[i] = genExpedConfig()
}

const pprModifier = modifier => {
  if (modifier.type === 'standard')
    return `${modifier.gs ? 'gs' : 'norm'}, DLC x ${modifier.daihatsu}`
  if (modifier.type === 'custom')
    return `${modifier.value.toFixed(2)}`
}

const pprCost = cost => {
  if (cost.type === 'cost-model') {
    return cost.wildcard === false ? 'N/A' : `>=${cost.count}, *=${cost.wildcard}`
  }
  if (cost.type === 'custom')
    return `${-cost.fuel} ${-cost.ammo}`
}

class ExpedTable extends Component {
  static defineHeader = (key, content, style) => ({key, content, style})

  static headers = [
    ExpedTable.defineHeader(
      'id', '#', {width: '2em'}),
    ExpedTable.defineHeader(
      'name', 'Name', {}),
    ExpedTable.defineHeader(
      'time', <FontAwesome name="clock-o" />, {width: '3.2em'}),
    ...resourceProperties.map(rp =>
      ExpedTable.defineHeader(
        rp, <ItemIcon name={rp} style={{height: '1em'}} /> , {width: '3.4em'})),
    ExpedTable.defineHeader('item-1', 'Item 1', {width: '4em'}),
    ExpedTable.defineHeader('item-2', 'Item 2', {width: '4em'}),
    ExpedTable.defineHeader('mod', 'Modifier', {width: '8em'}),
    ExpedTable.defineHeader('cost', 'Cost', {width: '8em'}),
    ExpedTable.defineHeader('control', '...', {width: '4em'}),
  ]

  constructor(props) {
    super(props)
    const expanded = {}
    for (let i=1; i<=40; ++i) {
      expanded[i] = false
    }
    this.state = {
      expanded,
    }
  }

  handleToggleEditComponent = eId => () =>
    this.setState(state => {
      const expanded = [...state.expanded]
      expanded[eId] = !expanded[eId]
      return {
        ...state,
        expanded,
      }
    })

  render() {
    return (
      <ListGroup>
        {
          expedInfoList.map(expedInfo => {
            const expedConfig = randomExpedConfigTable[expedInfo.id]
            return (
              <ListGroupItem style={{padding: 5}} key={expedInfo.id}>
                <ExpedRow config={expedConfig} info={expedInfo} />
              </ListGroupItem>
            )
          })
        }
      </ListGroup>
    )
  }
}

export { ExpedTable }

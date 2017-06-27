import _ from 'lodash'
import React, { Component } from 'react'
import {
  Table,
  Button,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import expedInfoListRaw from '../assets/exped-info.json'

import { ItemIcon } from './item-icon'

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

const formatTime = minutes => {
  const mm = minutes % 60
  const hh = Math.round((minutes - mm) / 60)
  const mmText = _.padStart(mm, 2, '0')
  const hhText = _.padStart(hh, 2, '0')
  return `${hhText}:${mmText}`
}

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

class ExpedTable extends Component {
  static defineHeader = (key, content, weight) => ({key, content, weight})

  static headers = [
    ExpedTable.defineHeader('id', '#', 1),
    ExpedTable.defineHeader('name', 'Name', 5),
    ExpedTable.defineHeader('time', <FontAwesome name="clock-o" />, 3),
    ...resourceProperties.map(rp =>
      ExpedTable.defineHeader(rp, <ItemIcon name={rp} /> , 3)),
    ExpedTable.defineHeader('item-1', 'Item 1', 4),
    ExpedTable.defineHeader('item-2', 'Item 2', 4),
    ExpedTable.defineHeader('income', 'Income', 4),
    ExpedTable.defineHeader('cost', 'Cost', 4),
    ExpedTable.defineHeader('control', '...', 2),
  ]

  static totalWeight = ExpedTable.headers.reduce((curTotal, {weight}) => curTotal + weight, 0)

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
      <Table
        style={{tableLayout: 'fixed'}}
        striped bordered condensed hover>
        <thead>
          <tr>
            {
              ExpedTable.headers.map(({key, content, weight}) => (
                <th
                  style={{width: `${Math.round(weight * 100/ExpedTable.totalWeight)}%`}}
                  key={key}>
                  {content}
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            _.flatMap(expedInfoList, expedInfo => {
              const {
                id, name, time, resource,
                itemProb, itemGS,
              } = expedInfo
              return [(
                <tr key={`${expedInfo.id}-view`}>
                  <td>{id}</td>
                  <td style={{
                    width: '100%',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden'}}
                  >
                    {name}
                  </td>
                  <td>{formatTime(time)}</td>
                  {
                    resourceProperties.map(rp => (
                      <td key={rp}>
                        {resource[rp]}
                      </td>
                    ))
                  }
                  <td>{mkItem(itemProb,false)}</td>
                  <td>{mkItem(itemGS,true)}</td>
                  <td>TODO</td>
                  <td>TODO</td>
                  <td>
                    <Button
                      bsSize="xsmall"
                      style={{width: '100%'}}
                      onClick={this.handleToggleEditComponent(expedInfo.id)}
                    >
                      <FontAwesome name="edit" />
                    </Button>
                  </td>
                </tr>),
                (
                  <tr key={`${expedInfo.id}-edit`} style={this.state.expanded[expedInfo.id] ? {} : {display: 'none'} }>
                    <td colSpan={ExpedTable.headers.length}>Placeholder for editor</td>
                  </tr>
                ),
              ]
            })
          }
        </tbody>
      </Table>
    )
  }
}

export { ExpedTable }

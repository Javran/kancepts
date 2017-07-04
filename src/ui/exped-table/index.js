import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ListGroup, ListGroupItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { mapDispatchToProps } from '../../store/reducer/exped-configs'
import {
  expedInfoViewListSelector,
} from '../../selectors'
import {
  resourceProperties,
} from '../../exped-info'

import { ItemIcon } from '../item-icon'
import { ExpedRow } from './exped-row'
import { PTyp } from './../../ptyp'

import { TableControl } from './table-control'

const defineHeader = (key, content, style) => ({key, content, style})

class ExpedTableImpl extends Component {
  static propTypes = {
    expedInfoViewList: PTyp.array.isRequired,
    modifyExpedConfig: PTyp.func.isRequired,
  }

  static headers = [
    defineHeader(
      'id', '#', {width: '2em'}),
    defineHeader(
      'name', 'Name', {}),
    defineHeader(
      'time', <FontAwesome name="clock-o" />, {width: '3.2em'}),
    ...resourceProperties.map(rp =>
      defineHeader(
        rp, <ItemIcon name={rp} style={{height: '1em'}} /> , {width: '3.4em'})),
    defineHeader('item-1', 'Item 1', {width: '4em'}),
    defineHeader('item-2', 'Item 2', {width: '4em'}),
    defineHeader('mod', 'Modifier', {width: '8em'}),
    defineHeader('cost', 'Cost', {width: '8em'}),
    defineHeader('control', '...', {width: '4em'}),
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

  handleModifyConfig = expedId => modifier => {
    const {modifyExpedConfig} = this.props
    modifyExpedConfig(expedId, modifier)
  }

  render() {
    const {expedInfoViewList} = this.props
    return (
      <div>
        <TableControl />
        <ListGroup>
          {
            expedInfoViewList.map(expedInfoView => {
              const {id, info, config} = expedInfoView
              return (
                <ListGroupItem style={{padding: 5}} key={id}>
                  <ExpedRow
                    onModify={this.handleModifyConfig(id)}
                    config={config}
                    info={info}
                  />
                </ListGroupItem>
              )
            })
          }
        </ListGroup>
      </div>
    )
  }
}

const ExpedTable = connect(
  state => {
    const expedInfoViewList = expedInfoViewListSelector(state)
    return {expedInfoViewList}
  },
  mapDispatchToProps,
)(ExpedTableImpl)

export { ExpedTable }

import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ListGroup, ListGroupItem,
} from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { mapDispatchToProps } from '../../store/reducer/exped-configs'
import {
  expedConfigsSelector,
} from '../../selectors'
import {
  resourceProperties,
  expedInfoList,
} from '../../exped-info'

import { ItemIcon } from '../item-icon'
import { ExpedRow } from './exped-row'
import { PTyp } from './../../ptyp'

import { TableControl } from './table-control'

const defineHeader = (key, content, style) => ({key, content, style})

class ExpedTableImpl extends Component {
  static propTypes = {
    expedConfigs: PTyp.objectOf(PTyp.object).isRequired,
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
    const {expedConfigs} = this.props
    return (
      <div>
        <TableControl />
        <ListGroup>
          {
            expedInfoList.map(expedInfo => {
              const expedConfig = expedConfigs[expedInfo.id]
              return (
                <ListGroupItem style={{padding: 5}} key={expedInfo.id}>
                  <ExpedRow
                    onModify={this.handleModifyConfig(expedInfo.id)}
                    config={expedConfig}
                    info={expedInfo}
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
    const expedConfigs = expedConfigsSelector(state)
    return {expedConfigs}
  },
  mapDispatchToProps,
)(ExpedTableImpl)

export { ExpedTable }

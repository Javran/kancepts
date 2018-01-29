import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  ListGroup, ListGroupItem,
} from 'react-bootstrap'

import { mapDispatchToProps } from '../../store/reducer/exped-configs'
import {
  expedInfoViewListSelector,
} from '../../selectors'
import {
  allExpedIdList,
} from '../../exped-info'

import { ExpedRow } from './exped-row'
import { PTyp } from './../../ptyp'

import { TableControl } from './table-control'

class ExpedTableImpl extends Component {
  static propTypes = {
    expedInfoViewList: PTyp.array.isRequired,
    modifyExpedConfig: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    const expanded = _.fromPairs(
      allExpedIdList.map(expedId => [expedId, false]))

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
              const {id} = expedInfoView
              return (
                <ListGroupItem style={{padding: 5}} key={id}>
                  <ExpedRow
                    onModify={this.handleModifyConfig(id)}
                    expedInfoView={expedInfoView}
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

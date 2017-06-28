import _ from 'lodash'
import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import { ExpedRowView } from './exped-row-view'
import { ExpedRowEdit } from './exped-row-edit'

const createModifierEditorState = modifier => {
  if (modifier.type === 'standard') {
    return {
      curType: 'standard',
      standard: {
        gs: modifier.gs,
        daihatsu: modifier.daihatsu,
      },
      custom: {
        value: 1,
      },
    }
  }

  if (modifier.type === 'custom') {
    return {
      curType: 'custom',
      standard: {
        gs: false,
        daihatsu: 0,
      },
      custom: {
        value: modifier.value,
      },
    }
  }
}

const createCostEditorState = cost => {
  if (cost.type === 'cost-model') {
    return {
      curType: 'cost-model',
      costModel: {
        wildcard: cost.wildcard,
        count: cost.count,
      },
      custom: {
        fuel: 0,
        ammo: 0,
      },
    }
  }

  if (cost.type === 'custom') {
    return {
      curType: 'custom',
      costModel: {
        wildcard: false,
        count: 6,
      },
      custom: {
        fuel: cost.fuel,
        ammo: cost.ammo,
      },
    }
  }
}

const createEditorState = config => {
  const {modifier, cost} = config
  return {
    modifier: createModifierEditorState(modifier),
    cost: createCostEditorState(cost),
  }
}

class ExpedRow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false,

      modifier: null,
      cost: null,
    }
  }

  handleToggleEditor = prevEditing => () => {
    const editing = !prevEditing
    if (editing) {
      // relying on batch update
      this.setState(createEditorState(this.props.config))
    }
    this.setState({editing})
  }

  handleModifyModifier = mod =>
    this.setState(state => ({
      ...state,
      modifier: mod(state.modifier),
    }))

  handleModifyCost = mod =>
    this.setState(state => ({
      ...state,
      cost: mod(state.cost),
    }))

  render() {
    const {info, config} = this.props
    const {editing} = this.state
    return (
      <div>
        <ExpedRowView
          info={info}
          config={config}
          editing={editing}
          onToggleEditor={this.handleToggleEditor(editing)}
        />
        <Collapse timeout={0} in={editing}>
          <div>
            <ExpedRowEdit
              id={info.id}
              modifier={this.state.modifier}
              cost={this.state.cost}
              onModifyModifier={this.handleModifyModifier}
              onModifyCost={this.handleModifyCost}
            />
          </div>
        </Collapse>
      </div>
    )
  }
}

export { ExpedRow }

import _ from 'lodash'
import React, { Component } from 'react'
import { Collapse } from 'react-bootstrap'
import { ExpedRowView } from './exped-row-view'
import { ExpedRowEdit } from './exped-row-edit'
import { PTyp } from '../../ptyp'

const createModifierEditorState = modifier => {
  if (modifier.type === 'standard') {
    return {
      curType: 'standard',
      standard: {
        gs: modifier.gs,
        daihatsu: modifier.daihatsu,
      },
      custom: {
        valueStr: '1',
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
        valueStr: String(modifier.value),
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
        fuelStr: '0',
        ammoStr: '0',
      },
    }
  }

  if (cost.type === 'custom') {
    return {
      curType: 'custom',
      costModel: {
        wildcard: 'dd',
        count: 6,
      },
      custom: {
        fuelStr: String(cost.fuel),
        ammoStr: String(cost.ammo),
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


// - null if cannot create a valid ExpedConfig from current editor state
const editorStateToConfig = editorState => {
  // 'ES' for editor state
  const createModifier = modifierES => {
    if (!modifierES)
      return null
    if (modifierES.curType === 'standard') {
      const {gs, daihatsu} = modifierES.standard
      if (typeof gs === 'boolean' &&
          _.isInteger(daihatsu) && daihatsu >= 0 && daihatsu <= 4) {
        return {type: 'standard', gs, daihatsu}
      } else {
        return null
      }
    }
    if (modifierES.curType === 'custom') {
      const {valueStr} = modifierES.custom
      const value = Number(valueStr)
      if (_.isFinite(value) && value > 0 && value < 5) {
        return {type: 'custom', value}
      } else {
        return null
      }
    }
    return null
  }
  const createCost = costES => {
    if (!costES)
      return null
    if (costES.curType === 'cost-model') {
      const {wildcard, count} = costES.costModel
      if (['dd', 'ss-like', 'de'].includes(wildcard) &&
          _.isInteger(count) && count >= 0 && count <= 6) {
        return {type: 'cost-model', wildcard, count}
      } else {
        return null
      }
    }
    if (costES.curType === 'custom') {
      const {fuelStr, ammoStr} = costES.custom
      const fuel = Number(fuelStr)
      const ammo = Number(ammoStr)
      if (_.isFinite(fuel) && fuel >= 0 && fuel < 5000 &&
          _.isFinite(ammo) && ammo >= 0 && ammo < 5000) {
        return {type: 'custom', fuel, ammo}
      } else {
        return null
      }
    }
    return null
  }
  const modifier = createModifier(editorState.modifier)
  const cost = createCost(editorState.cost)

  return modifier && cost && {modifier, cost}
}

class ExpedRow extends Component {
  static propTypes = {
    expedInfoView: PTyp.object.isRequired,
    onModify: PTyp.func.isRequired,
  }

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
    const {expedInfoView} = this.props
    const {config} = expedInfoView
    this.setState({
      editing,
      ...(editing ? createEditorState(config) : {}),
    })
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

  generateCurrentConfigFromEditor = () => {
    const {modifier, cost} = this.state
    return editorStateToConfig({modifier, cost})
  }

  handleSaveConfig = configFromEditor => () => {
    if (configFromEditor === null) {
      console.error(`save handler cannot be called when input is invalid`)
      return
    }
    const {onModify} = this.props
    onModify(() => configFromEditor)
    this.handleToggleEditor(true)()
  }

  render() {
    const {expedInfoView} = this.props
    const {info} = expedInfoView
    const {editing} = this.state

    const curConfigFromEditor = this.generateCurrentConfigFromEditor()
    return (
      <div>
        <ExpedRowView
          expedInfoView={expedInfoView}
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
              onSave={
                // pass save handler only when input is valid
                curConfigFromEditor ?
                  this.handleSaveConfig(curConfigFromEditor) :
                  null
              }
            />
          </div>
        </Collapse>
      </div>
    )
  }
}

export { ExpedRow }

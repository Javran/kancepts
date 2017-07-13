import React, { Component } from 'react'
import { connect } from 'react-redux'
import FontAwesome from 'react-fontawesome'

import {
  Button,
} from 'react-bootstrap'

import { PTyp } from '../../../ptyp'
import {
  selectedExpedsSelector,
  expedBatchConfigSelector,
} from './selectors'
import {
  mapDispatchToProps,
} from '../../../store/reducer/exped-configs'

const modifyExpeds = (selected, modifyExpedConfig, options) => {
  const gsConfig = {
    modifier: {
      type: 'standard',
      gs: true,
      daihatsu: options.dlcCount,
    },
    cost: {
      type: 'cost-model',
      wildcard: 'dd',
      count: options.shipCount,
    },
  }

  selected.map(id =>
    modifyExpedConfig(id,() => gsConfig)
  )
}

class ExecuteButtonImpl extends Component {
  static propTypes = {
    onPostMessage: PTyp.func.isRequired,
    selected: PTyp.array.isRequired,
    options: PTyp.object.isRequired,
    modifyExpedConfig: PTyp.func.isRequired,
  }

  handleExecute = () => {
    const {
      onPostMessage,
      selected,
      options,
      modifyExpedConfig,
    } = this.props
    modifyExpeds(selected, modifyExpedConfig, options)
    onPostMessage(
      <div>
        <div>Executed at {String(new Date())}</div>
        <div>
          {'Modified expeditions: '}
          {
            selected.join(', ')
          }
        </div>
      </div>
    )
  }

  render() {
    const {selected} = this.props
    const disabled = selected.length === 0
    return (
      <Button
        disabled={disabled}
        bsStyle={disabled ? 'danger' : 'default'}
        onClick={this.handleExecute}
      >
        <FontAwesome name="play" />
      </Button>
    )
  }
}

const ExecuteButton = connect(
  state => {
    const selected = selectedExpedsSelector(state)
    const {options} = expedBatchConfigSelector(state)
    return {selected, options}
  },
  mapDispatchToProps
)(ExecuteButtonImpl)

export { ExecuteButton }

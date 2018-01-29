import React, { Component } from 'react'
import { connect } from 'react-redux'
import { modifyObject } from 'subtender'

import {
  plannerConfigSelector,
} from '../../selectors'

import {
  mapDispatchToProps,
} from '../../store/reducer/ui/planner/config'

import { PTyp } from '../../ptyp'

import { ExpedPanel } from './exped-panel'
import { PresetPanel } from './preset-panel'
import { ResourceWeightPanel } from './resource-weight-panel'
import { AfkTimePanel } from './afk-time-panel'
import { FleetCountPanel } from './fleet-count-panel'

class ControlImpl extends Component {
  static propTypes = {
    planner: PTyp.object.isRequired,
    modifyPlanner: PTyp.func.isRequired,
  }

  handleToggleExped = id => () =>
    this.props.modifyPlanner(
      modifyObject(
        'expedFlags',
        modifyObject(
          id, x => !x)))

  handleApplyPreset = expedFlags => () =>
    this.props.modifyPlanner(
      modifyObject(
        'expedFlags',
        () => expedFlags))

  handleModifyFleetCount = modifier =>
    this.props.modifyPlanner(
      modifyObject('fleetCount', modifier))

  handleModifyAfkTime = modifier =>
    this.props.modifyPlanner(
      modifyObject('afkTime', modifier))

  handleModifyWeight = modifier =>
    this.props.modifyPlanner(
      modifyObject('weight', modifier))

  render() {
    const ctrlRowStyle = {
      display: 'flex',
      alignItems: 'stretch',
    }

    const panelStyle = {
      marginTop: 10,
      marginBottom: 0,
      marginLeft: 8,
    }

    const {planner} = this.props
    const {expedFlags} = planner

    return (
      <div className="planner-control-panels">
        <div style={ctrlRowStyle}>
          <ExpedPanel
            style={{
              ...panelStyle,
              width: '80%',
            }}
            expedFlags={expedFlags}
            onToggleExped={this.handleToggleExped}
          />
          <PresetPanel
            style={{
              ...panelStyle,
              width: '20%',
            }}
            onApplyPreset={this.handleApplyPreset}
          />
        </div>
        <div style={ctrlRowStyle}>
          <ResourceWeightPanel
            weight={planner.weight}
            onModifyWeight={this.handleModifyWeight}
            style={{
              ...panelStyle,
              flex: 3,
            }}
          />
          <AfkTimePanel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            afkTime={planner.afkTime}
            onModify={this.handleModifyAfkTime}
          />
          <FleetCountPanel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            fleetCount={planner.fleetCount}
            onModify={this.handleModifyFleetCount}
          />
        </div>
      </div>
    )
  }
}

const Control = connect(
  state => {
    const planner = plannerConfigSelector(state)
    return {planner}
  },
  mapDispatchToProps,
)(ControlImpl)

export {
  Control,
}

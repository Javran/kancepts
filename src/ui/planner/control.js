import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
} from 'react-bootstrap'

import {
  allExpedIdList,
} from '../../exped-info'

import {
  plannerUISelector,
} from '../../selectors'

import {
  mapDispatchToProps,
} from '../../store/reducer/ui/planner'

import { PTyp } from '../../ptyp'

import { ExpedPanel } from './exped-panel'
import { PresetPanel } from './preset-panel'
import { ResourcePriorityPanel } from './resource-priority-panel'
import { AfkTimePanel } from './afk-time-panel'
import { FleetCountPanel } from './fleet-count-panel'


class ControlImpl extends Component {
  static propTypes = {
    planner: PTyp.object.isRequired,
    modifyPlanner: PTyp.func.isRequired,
  }

  handleToggleExped = id => () => {
    const {modifyPlanner} = this.props
    modifyPlanner(planner => ({
      ...planner,
      expedFlags: {
        ...planner.expedFlags,
        [id]: !planner.expedFlags[id],
      },
    }))
  }

  handleApplyPreset = ids => () => {
    const {modifyPlanner} = this.props
    modifyPlanner(planner => ({
      ...planner,
      expedFlags: _.fromPairs(
        allExpedIdList.map(id =>
          [id, ids.includes(id)])),
    }))
  }

  handleChangeFleetCount = e => {
    const fleetCount = parseInt(e.target.value,10)
    const {modifyPlanner} = this.props
    modifyPlanner(planner => ({
      ...planner,
      fleetCount,
    }))
  }

  handleChangeAfkTime = e => {
    const afkTime = parseInt(e.target.value,10)
    const {modifyPlanner} = this.props
    modifyPlanner(planner => ({
      ...planner,
      afkTime,
    }))
  }

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
          <ResourcePriorityPanel
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
            onChangeAfkTime={this.handleChangeAfkTime}
            />
          <FleetCountPanel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            fleetCount={planner.fleetCount}
            onChangeFleetCount={this.handleChangeFleetCount}
          />
        </div>
      </div>
    )
  }
}

const Control = connect(
  state => {
    const planner = plannerUISelector(state)
    return {planner}
  },
  mapDispatchToProps,
)(ControlImpl)

export {
  Control,
}

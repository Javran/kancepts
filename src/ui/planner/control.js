import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  Button,
  FormGroup, Radio,
  Form, FormControl,
} from 'react-bootstrap'

import Slider from 'rc-slider'

import {
  allExpedIdList,
  formatTime,
  expedInfoList,
} from '../../exped-info'

import {
  plannerUISelector,
} from '../../selectors'

import {
  mapDispatchToProps,
} from '../../store/reducer/ui/planner'

import { PTyp } from '../../ptyp'
import { enumFromTo } from '../../utils'
import { presets } from '../../exped-info/presets'

import { ExpedPanel } from './exped-panel'

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
            style={panelStyle}
            expedFlags={expedFlags}
            onToggleExped={this.handleToggleExped}
          />
          <Panel
            style={{
              ...panelStyle,
              width: '20%',
            }}
            header="Presets"
          >
            <div style={{padding: '4px 2px'}}>
              {
                presets.map((preset,ind) => (
                  <Button
                    block
                    onClick={this.handleApplyPreset(preset.ids)}
                    key={
                      // eslint-disable-next-line react/no-array-index-key
                      ind
                    }
                  >
                    {preset.name}
                  </Button>
                ))
              }
            </div>
          </Panel>
        </div>
        <div style={ctrlRowStyle}>
          <Panel
            style={{
              ...panelStyle,
              flex: 3,
            }}
            header="Priority"
          >
            <Slider
              min={-5}
              max={20}
              step={1}
              marks={
                _.fromPairs(enumFromTo(-5,20,v => v+5)
                  .map(x => [x,x]))}
            />
          </Panel>
          <Panel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            header="AFK Time"
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <Form inline style={{width: '60%', flex: 1}}>
                <FormControl
                  onChange={this.handleChangeAfkTime}
                  value={planner.afkTime}
                  type="number" style={{width: '100%'}}
                />
              </Form>
              <div style={{marginLeft: '.5em'}}>
                Mins
              </div>
            </div>
          </Panel>
          <Panel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            header="Fleets"
          >
            <FormGroup
              style={{paddingLeft: 8, width: '100%'}}
              checked={planner.fleetCount}
            >
              {
                [3,2,1].map(fleetCount => (
                  <Radio
                    style={{width: '100%'}}
                    key={fleetCount}
                    checked={fleetCount===planner.fleetCount}
                    onChange={this.handleChangeFleetCount}
                    name="fleet-count"
                    value={fleetCount}>
                    {`${fleetCount} Fleet(s)`}
                  </Radio>
                ))
              }
            </FormGroup>
          </Panel>
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

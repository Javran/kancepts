import React, { Component } from 'react'
import {
  Panel,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'
import { connect } from 'react-redux'

import { PTyp } from '../../ptyp'
import { presets } from '../../exped-info/presets'
import { translateSelector } from '../../selectors'

class PresetPanelImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    onApplyPreset: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style, onApplyPreset, tr} = this.props
    return (
      <Panel
        style={style}
        header={tr('Planner.Presets')}
      >
        <div style={{padding: '4px 2px'}}>
          {
            presets.map(({expedFlags,name}) => (
              <OverlayTrigger key={name} placement="left" overlay={
                <Tooltip id={`planner-preset-${name}`}>
                  {tr(`Planner.PresetAlts.${name}.Desc`)}
                </Tooltip>
              }>
                <Button
                  block
                  onClick={onApplyPreset(expedFlags)}
                >
                  {tr(`Planner.PresetAlts.${name}.Name`)}
                </Button>
              </OverlayTrigger>
            ))
          }
        </div>
      </Panel>
    )
  }
}

const PresetPanel = connect(translateSelector)(PresetPanelImpl)

export { PresetPanel }

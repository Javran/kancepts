import React, { Component } from 'react'
import {
  Panel,
  Button,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { presets } from '../../exped-info/presets'

class PresetPanel extends Component {
  static propTypes = {
    style: PTyp.object,
    onApplyPreset: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style, onApplyPreset} = this.props
    return (
      <Panel
        style={style}
        header="Presets"
      >
        <div style={{padding: '4px 2px'}}>
          {
            presets.map((preset,ind) => (
              <Button
                block
                onClick={onApplyPreset(preset.expedFlags)}
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
    )
  }
}

export { PresetPanel }

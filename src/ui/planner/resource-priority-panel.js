import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ResourceSlider } from './resource-slider'

class ResourcePriorityPanel extends Component {
  static propTypes = {
    style: PTyp.object,
    priority: PTyp.objectOf(PTyp.number).isRequired,
    onModifyPriority: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  handleChangePriority = field => newValue => {
    const {onModifyPriority} = this.props
    onModifyPriority(p => ({
      ...p,
      [field]: newValue,
    }))
  }

  render() {
    const {style,priority} = this.props
    const rowStyle = {
      display: 'flex',
      marginTop: '.8em',
      marginBottom: '2.2em',
    }
    return (
      <Panel
        style={style}
        header="Resource Priority"
      >
        <div style={rowStyle}>
          <ResourceSlider
            name="fuel"
            priority={priority.fuel}
            onChangeValue={this.handleChangePriority('fuel')}
            style={{width: '50%'}}
          />
          <ResourceSlider
            name="steel"
            priority={priority.steel}
            onChangeValue={this.handleChangePriority('steel')}
            style={{width: '50%'}}
          />
        </div>
        <div style={rowStyle}>
          <ResourceSlider
            name="ammo"
            priority={priority.ammo}
            onChangeValue={this.handleChangePriority('ammo')}
            style={{width: '50%'}}
          />
          <ResourceSlider
            name="bauxite"
            priority={priority.bauxite}
            onChangeValue={this.handleChangePriority('bauxite')}
            style={{width: '50%'}}
          />
        </div>
      </Panel>
    )
  }
}

export { ResourcePriorityPanel }

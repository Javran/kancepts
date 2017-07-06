import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ResourceSlider } from './resource-slider'

class ResourceWeightPanel extends Component {
  static propTypes = {
    style: PTyp.object,
    weight: PTyp.objectOf(PTyp.number).isRequired,
    onModifyWeight: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  handleChangeWeight = field => newValue => {
    const {onModifyWeight} = this.props
    onModifyWeight(p => ({
      ...p,
      [field]: newValue,
    }))
  }

  render() {
    const {style,weight} = this.props
    const rowStyle = {
      display: 'flex',
      marginTop: '.8em',
      marginBottom: '2.2em',
    }
    return (
      <Panel
        style={style}
        header="Resource Weight"
      >
        <div style={rowStyle}>
          <ResourceSlider
            name="fuel"
            weight={weight.fuel}
            onChangeValue={this.handleChangeWeight('fuel')}
            style={{width: '50%'}}
          />
          <ResourceSlider
            name="steel"
            weight={weight.steel}
            onChangeValue={this.handleChangeWeight('steel')}
            style={{width: '50%'}}
          />
        </div>
        <div style={rowStyle}>
          <ResourceSlider
            name="ammo"
            weight={weight.ammo}
            onChangeValue={this.handleChangeWeight('ammo')}
            style={{width: '50%'}}
          />
          <ResourceSlider
            name="bauxite"
            weight={weight.bauxite}
            onChangeValue={this.handleChangeWeight('bauxite')}
            style={{width: '50%'}}
          />
        </div>
      </Panel>
    )
  }
}

export { ResourceWeightPanel }

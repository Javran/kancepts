import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  FormGroup,
  Radio,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { translateSelector } from '../../selectors'

class FleetCountPanelImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    fleetCount: PTyp.number.isRequired,
    onModify: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
    trN: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  handleChange = e => {
    const fleetCount = parseInt(e.target.value,10)
    const {onModify} = this.props
    onModify(() => fleetCount)
  }

  render() {
    const {style,fleetCount,tr,trN} = this.props
    return (
      <Panel
        style={style}
        header={tr(`Planner.Fleets`)}
      >
        <FormGroup
          style={{paddingLeft: 8, width: '100%'}}
        >
          {
            [3,2,1].map(curFleetCount => (
              <Radio
                style={{width: '100%'}}
                key={curFleetCount}
                checked={curFleetCount===fleetCount}
                onChange={this.handleChange}
                name="fleet-count"
                value={curFleetCount}>
                {trN('FleetN',curFleetCount)}
              </Radio>
            ))
          }
        </FormGroup>
      </Panel>
    )
  }
}

const FleetCountPanel = connect(translateSelector)(FleetCountPanelImpl)

export { FleetCountPanel }

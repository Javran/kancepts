import React, { Component } from 'react'
import {
  Panel,
  FormGroup,
  Radio,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'

class FleetCountPanel extends Component {
  static propTypes = {
    style: PTyp.object,
    fleetCount: PTyp.number.isRequired,
    onModify: PTyp.func.isRequired,
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
    const {
      style,fleetCount,
    } = this.props
    return (
      <Panel
        style={style}
        header="Fleets"
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
                {`${curFleetCount} Fleet(s)`}
              </Radio>
            ))
          }
        </FormGroup>
      </Panel>
    )
  }
}

export { FleetCountPanel }

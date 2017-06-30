import React, { Component } from 'react'

import { CostPicker } from '../cost-picker'

class CostModel extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fuelPercent: 100,
      ammoPercent: 100,
    }
  }

  handleChangeCost = s =>
    this.setState(s)

  render() {
    const {fuelPercent, ammoPercent} = this.state
    return (
      <div>
        <CostPicker
          prefix="ship-list-"
          fuelPercent={fuelPercent}
          ammoPercent={ammoPercent}
          onChangeCost={this.handleChangeCost}
          style={{width: '90%', marginLeft: 10}}
        />
        <div>
          Table placeholder
        </div>
      </div>
    )
  }
}

export { CostModel }

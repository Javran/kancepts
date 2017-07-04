import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  costModelSelector,
} from '../../selectors'

import { CostPicker } from '../cost-picker'
import { CostTable } from './cost-table'

class CostModelImpl extends Component {
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
    const { costModel } = this.props
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
        <CostTable
          fuelPercent={fuelPercent}
          ammoPercent={ammoPercent}
          costModel={costModel}
        />
      </div>
    )
  }
}

const CostModel = connect(state => {
  const costModel = costModelSelector(state)
  return {costModel}
})(CostModelImpl)

export { CostModel }

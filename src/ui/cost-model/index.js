import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  costModelSelector,
  translateSelector,
} from '../../selectors'

import { CostPicker } from '../cost-picker'
import { CostTable } from './cost-table'

import { PTyp } from '../../ptyp'

class CostModelImpl extends Component {
  static propTypes = {
    costModel: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
    trN: PTyp.func.isRequired,
  }

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
    const {costModel, tr, trN} = this.props
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
          tr={tr}
          trN={trN}
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
  const trs = translateSelector(state)
  return {costModel,...trs}
})(CostModelImpl)

export { CostModel }

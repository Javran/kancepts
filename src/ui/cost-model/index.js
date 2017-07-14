import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  costModelSelector,
  translateSelector,
  costPickerSelector,
} from '../../selectors'

import { CostPicker } from '../cost-picker'
import { CostTable } from './cost-table'

import { PTyp } from '../../ptyp'

class CostModelImpl extends Component {
  static propTypes = {
    costModel: PTyp.func.isRequired,
    fuelPercent: PTyp.number.isRequired,
    ammoPercent: PTyp.number.isRequired,
    tr: PTyp.func.isRequired,
    trN: PTyp.func.isRequired,
  }

  render() {
    const {
      costModel,
      fuelPercent, ammoPercent,
      tr, trN,
    } = this.props
    return (
      <div>
        <CostPicker prefix="ship-list-" />
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
  const cost = costPickerSelector(state)
  return {costModel,...trs, ...cost}
})(CostModelImpl)

export { CostModel }

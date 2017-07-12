import React, { Component } from 'react'

import { PTyp } from '../../ptyp'
import { filters } from '../../ship-filters'
import {
  resourceColor,
} from '../../exped-info'

const renderCostModel = (wildcard, count, prefix) => {
  const filterInfo = filters.find(d => d.id === wildcard)
  const name = typeof filterInfo === 'undefined' ?
    wildcard :
    filterInfo.title
  return (
    <div>
      {`≥${count}, *=${name}`}
    </div>
  )
}

const renderCustom = (fuel, ammo) => (
  <div style={{display: 'flex'}}>
    <div style={{
      flex: 1,
      fontWeight: 'bold',
      color: resourceColor.fuel,
    }}>
      {-fuel}
    </div>
    <div style={{
      flex: 1,
      fontWeight: 'bold',
      color: resourceColor.ammo,
    }}>
      {-ammo}
    </div>
  </div>
)

class CostView extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
    cost: PTyp.object.isRequired,
    prefix: PTyp.string.isRequired,
  }

  render() {
    const {style, cost, prefix} = this.props
    return (
      <div style={style}>
        {
          cost.type === 'cost-model' ?
            renderCostModel(cost.wildcard,cost.count,prefix) :
          cost.type === 'custom' ?
            renderCustom(cost.fuel,cost.ammo) :
          null
        }
      </div>
    )
  }
}

export { CostView }

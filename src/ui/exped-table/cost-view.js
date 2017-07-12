import React, { Component } from 'react'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { filters, compoToStr } from '../../ship-filters'
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

const renderCustom = (fuel, ammo, compo, prefix) => {
  const content = (
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
  return compo ? (
    <OverlayTrigger
      placement="left"
      overlay={
        <Tooltip id={`${prefix}-cost`}>
          {compoToStr(compo)}
        </Tooltip>
      }
    >
      {content}
    </OverlayTrigger>
  ) : content
}

class CostView extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
    cost: PTyp.object.isRequired,
    prefix: PTyp.string.isRequired,
    resupplyInfo: PTyp.shape({
      cost: PTyp.object.isRequired,
      compo: PTyp.object,
    }).isRequired,
    numeric: PTyp.bool.isRequired,
  }

  render() {
    const {style, cost, prefix, resupplyInfo, numeric} = this.props
    const generalCost = resupplyInfo.cost
    const {compo} = resupplyInfo
    return (
      <div style={style}>
        {
          (numeric || cost.type === 'custom') ?
            renderCustom(generalCost.fuel,generalCost.ammo,compo,prefix) :
          cost.type === 'cost-model' ?
            renderCostModel(cost.wildcard,cost.count,prefix) :
          null
        }
      </div>
    )
  }
}

export { CostView }

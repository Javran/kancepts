import React, { Component } from 'react'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { compoToStr, getFilterName } from '../../ship-filters'
import {
  resourceColor,
} from '../../exped-info'

const renderCostModel = (wildcard, count, compo, cost, prefix, tr) => {
  const name = getFilterName(wildcard)
  return (
    <OverlayTrigger
      placement="left"
      overlay={
        <Tooltip id={`${prefix}-cost-cost-model`}>
          <div>
            <div>{tr('Table.RequireNShipsInFleet',count)}</div>
            <div>{tr('ResupplyCost.Wildcard')}: {name}</div>
            <div>{tr('Composition')}: {compoToStr(compo)}</div>
            <div>
              {tr('Cost')}: {
                cost.fuel === 0 ?
                  tr('Resource.NoFuelCost') :
                  `${tr('Resource.Fuel')} ${-cost.fuel}`
              } & {
                cost.ammo === 0 ?
                  tr('Resource.NoAmmoCost') :
                  `${tr('Resource.Ammo')} ${-cost.ammo}`
              }
            </div>
          </div>
        </Tooltip>
      }
    >
      <div>
        {`≥${count}, *=${name}`}
      </div>
    </OverlayTrigger>
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
        <Tooltip id={`${prefix}-cost-custom`}>
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
    tr: PTyp.func.isRequired,
  }

  render() {
    const {style, cost, prefix, resupplyInfo, numeric, tr} = this.props
    const generalCost = resupplyInfo.cost
    const {compo} = resupplyInfo
    return (
      <div style={style}>
        {
          (numeric || cost.type === 'custom') ?
            renderCustom(
              generalCost.fuel,generalCost.ammo,
              compo,prefix) :
          cost.type === 'cost-model' ?
            renderCostModel(
              cost.wildcard,cost.count,
              compo,generalCost,prefix,tr) :
          null
        }
      </div>
    )
  }
}

export { CostView }

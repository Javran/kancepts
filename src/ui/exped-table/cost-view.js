import _ from 'lodash'
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
  const costDesc = cost === null ? tr('Table.NotAva') :
    [
      cost.fuel === 0 ?
        tr('Resource.NoFuelCost') :
        `${tr('Resource.Fuel')} ${-cost.fuel}`,
      cost.ammo === 0 ?
        tr('Resource.NoAmmoCost') :
        `${tr('Resource.Ammo')} ${-cost.ammo}`,
    ].join(' & ')
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
              {tr('Cost')}: {costDesc}
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
      cost: PTyp.object,
      compo: PTyp.object,
    }),
    numeric: PTyp.bool.isRequired,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    resupplyInfo: null,
  }

  render() {
    const {style, cost, prefix, resupplyInfo, numeric, tr} = this.props
    if (resupplyInfo === null) {
      return (
        <div
          style={{width: '100%', textAlign: 'center'}}
        >
          {tr('Table.NotAva')}
        </div>
      )
    }

    const {compo} = resupplyInfo
    const generalCost = resupplyInfo.cost
    if (generalCost === null) {
      // generalCost will be null only if we are using a cost model
      // but cannot find enough ship from ship list.
      if (cost.type !== 'cost-model') {
        return console.error(`unexpected cost type: ${cost.type}`)
      }
      return (
        <div style={style}>
          {
            renderCostModel(
              cost.wildcard,cost.count,
              compo,generalCost,prefix,tr)
          }
        </div>
      )
    }
    return (
      <div style={style}>
        {
          /* eslint-disable indent */
          (numeric || cost.type === 'custom') ?
            renderCustom(
              generalCost.fuel,generalCost.ammo,
              compo,prefix
            ) :
          cost.type === 'cost-model' ?
            renderCostModel(
              cost.wildcard,cost.count,
              compo,generalCost,prefix,tr
            ) :
          null
          /* eslint-enable indent */
        }
      </div>
    )
  }
}

export { CostView }

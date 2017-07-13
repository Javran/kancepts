import React, { PureComponent } from 'react'

import { ItemIcon } from '../../item-icon'
import { PTyp } from '../../../ptyp'
import { pprIncomePercent } from '../../../exped-info'

const renderStandard = (gs,daihatsu,tr) => (
  <div>
    {tr('IncomeModifier.Standard')}, {tr(gs ? 'GreatSuccess' : 'NormalSuccess')}
    {
      daihatsu > 0 && (
        <span>
          ,
          <ItemIcon
            name="dlc"
            style={{height: '1.8em'}}
          />
          x{daihatsu}
        </span>
      )
    }
  </div>
)

const renderCustom = (value,tr) => (
  <div>{tr('IncomeModifier.Custom')}, {pprIncomePercent(value)}</div>
)

class ConfigCell extends PureComponent {
  static propTypes = {
    config: PTyp.object.isRequired,
    tr: PTyp.func.isRequired,
  }

  render() {
    const {config,tr} = this.props
    const {modifier} = config
    return modifier.type === 'standard' ?
        renderStandard(modifier.gs,modifier.daihatsu,tr) :
      modifier.type === 'custom' ?
        renderCustom(modifier.value,tr) :
      null
  }
}

export { ConfigCell }

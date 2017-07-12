import React, { PureComponent } from 'react'

import { ItemIcon } from '../../item-icon'
import { PTyp } from '../../../ptyp'
import { pprIncomePercent } from '../../../exped-info'

const renderStandard = (gs,daihatsu) => (
  <div>
    Standard, {gs ? 'Great Success' : 'Normal Success'}
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

const renderCustom = value => (
  <div>Custom, {pprIncomePercent(value)}</div>
)

class ConfigCell extends PureComponent {
  static propTypes = {
    config: PTyp.object.isRequired,
  }

  render() {
    const {config} = this.props
    const {modifier} = config
    return modifier.type === 'standard' ?
        renderStandard(modifier.gs,modifier.daihatsu) :
      modifier.type === 'custom' ?
        renderCustom(modifier.value) :
      null
  }
}

export { ConfigCell }

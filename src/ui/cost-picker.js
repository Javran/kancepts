import React, { Component } from 'react'
import {
  ButtonToolbar,
  DropdownButton, MenuItem,
} from 'react-bootstrap'

// table copied from:
// https://github.com/KC3Kai/KC3Kai/blob/7d551f3d84a386027286947552e3ef112c65a06b/src/pages/strategy/tabs/expedtable/expedtable.js#L108-L118
import expedCostGrouping from '../assets/exped-cost-grouping.json'

import { PTyp } from '../ptyp'
import { enumFromTo } from '../utils'

const percents = enumFromTo(0,100,x => x+10)

class CostPicker extends Component {
  static propTypes = {
    style: PTyp.object,
    // both fuelPercent and ammoPercent are numbers between 0~100
    fuelPercent: PTyp.number.isRequired,
    ammoPercent: PTyp.number.isRequired,
    // a prefix for a11y stuff.
    prefix: PTyp.string,
    // 3 possible calls:
    // - onChangeCost({fuelPercent})
    // - onChangeCost({ammoPercent})
    // - onChangeCost({fuelPercent,ammoPercent})
    onChangeCost: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
    prefix: '',
  }

  render() {
    const {
      style, prefix,
      onChangeCost,
    } = this.props
    return (
      <div style={style}>
        <ButtonToolbar>
          <DropdownButton
            onSelect={onChangeCost}
            style={{
              width: '15vw',
              maxWidth: 200,
            }}
            title="Presets"
            id={`${prefix}cost-picker-preset`}>
            {
              expedCostGrouping.map(({fuel,ammo,expeds}) => {
                const key = `f${fuel}-a${ammo}`
                const es = expeds.join(', ')
                const desc = `Fuel: ${fuel}%, Ammo: ${ammo}%, Expeditions: ${es}`
                return (
                  <MenuItem
                    key={key}
                    eventKey={{ammoPercent: ammo,fuelPercent: fuel}}>
                    {desc}
                  </MenuItem>
                )
              })
            }
          </DropdownButton>
          <DropdownButton
            style={{
              width: '20vw',
              maxWidth: 250,
            }}
            onSelect={onChangeCost}
            title={`Fuel: ${this.props.fuelPercent}%`}
            id={`${prefix}cost-picker-fuel`}>
            {
              percents.map(fuelPercent => (
                <MenuItem
                  key={fuelPercent}
                  eventKey={{fuelPercent}}>
                  {`${fuelPercent}%`}
                </MenuItem>
              ))
            }
          </DropdownButton>
          <DropdownButton
            style={{
              width: '20vw',
              maxWidth: 250,
            }}
            onSelect={onChangeCost}
            title={`Ammo: ${this.props.ammoPercent}%`}
            id={`${prefix}cost-picker-ammo`}>
            {
              percents.map(ammoPercent => (
                <MenuItem
                  key={ammoPercent}
                  eventKey={{ammoPercent}}>
                  {`${ammoPercent}%`}
                </MenuItem>
              ))
            }
          </DropdownButton>
        </ButtonToolbar>
      </div>
    )
  }
}

export {
  CostPicker,
}

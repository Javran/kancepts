import _ from 'lodash'
import React, { Component } from 'react'
import Slider from 'rc-slider'
import {
  ButtonToolbar,
  DropdownButton, MenuItem,
} from 'react-bootstrap'
import { ItemIcon } from './item-icon'

// table copied from:
// https://github.com/KC3Kai/KC3Kai/blob/7d551f3d84a386027286947552e3ef112c65a06b/src/pages/strategy/tabs/expedtable/expedtable.js#L108-L118
import expedCostGrouping from '../assets/exped-cost-grouping.json'

import { PTyp } from '../ptyp'
import { enumFromTo } from '../utils'

const percents = enumFromTo(0,100,x => x+10)

const percentMarks = _.fromPairs(percents.map(x =>
  [x, `${x}%`]))

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

  handleChange = rp => value => {
    const {onChangeCost} = this.props
    if (rp === 'fuel') {
      onChangeCost({fuelPercent: value})
    }
    if (rp === 'ammo') {
      onChangeCost({ammoPercent: value})
    }
  }

  render() {
    const {
      style, prefix,
      fuelPercent, ammoPercent,
      onChangeCost,
    } = this.props
    return (
      <div style={style}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <DropdownButton
            onSelect={onChangeCost}
            style={{
              width: '15vw',
              maxWidth: 200,
            }}
            title="Presets"
            block
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
          <div style={{flex: 1, display: 'flex', marginLeft: 15}}>
            {
              [
                {rp: 'fuel', value: fuelPercent},
                {rp: 'ammo', value: ammoPercent},
              ].map(({rp,value}) => (
                <div style={{display: 'flex', flex: 1}} key={rp}>
                  <ItemIcon name={rp} style={{width: '1.2em'}} />
                  <Slider
                    style={{marginLeft: 20, marginRight: 20}}
                    value={value}
                    onChange={this.handleChange(rp)}
                    min={0} max={100} step={null} marks={percentMarks} />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export {
  CostPicker,
}

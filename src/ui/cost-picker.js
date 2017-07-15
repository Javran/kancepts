import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Slider from 'rc-slider'
import {
  DropdownButton, MenuItem, Grid, Row, Col, Panel,
} from 'react-bootstrap'
import {
  translateSelector,
  costPickerSelector,
} from '../selectors'
import { ItemIcon } from './item-icon'
import { mapDispatchToProps } from '../store/reducer/ui/cost-picker'

// table copied from:
// https://github.com/KC3Kai/KC3Kai/blob/7d551f3d84a386027286947552e3ef112c65a06b/src/pages/strategy/tabs/expedtable/expedtable.js#L108-L118
import expedCostGrouping from '../assets/exped-cost-grouping.json'

import { PTyp } from '../ptyp'
import { enumFromTo, mergeMapStateToProps } from '../utils'

const percents = enumFromTo(0,100,x => x+10)

const percentMarks = _.fromPairs(percents.map(x =>
  [x, `${x}%`]))

class CostPickerImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    // both fuelPercent and ammoPercent are numbers between 0~100
    fuelPercent: PTyp.number.isRequired,
    ammoPercent: PTyp.number.isRequired,
    // a prefix for a11y stuff.
    prefix: PTyp.string,
    modifyCostPicker: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
    prefix: '',
  }

  // 3 possible calls:
  // - updateCost({fuelPercent})
  // - updateCost({ammoPercent})
  // - updateCost({fuelPercent,ammoPercent})
  updateCost = newCost =>
    this.props.modifyCostPicker(cost => ({
      ...cost, ...newCost,
    }))

  handleChange = rp => value => {
    if (rp === 'fuel') {
      this.updateCost({fuelPercent: value})
    }
    if (rp === 'ammo') {
      this.updateCost({ammoPercent: value})
    }
  }

  render() {
    const {
      style, prefix,
      fuelPercent, ammoPercent,
      tr,
    } = this.props
    return (
      <Panel style={style}>
        <Grid style={{width: '100%', marginBottom: '.5em'}}>
          <Row style={{display: 'flex', alignItems: 'center'}}>
            <Col sm={2} style={{marginRight: '1em'}}>
              <DropdownButton
                onSelect={this.updateCost}
                title={tr('Presets')}
                block
                id={`${prefix}cost-picker-preset`}>
                {
                  expedCostGrouping.map(({fuel,ammo,expeds}) => {
                    const key = `f${fuel}-a${ammo}`
                    const es = expeds.join(', ')
                    const desc = [
                      `${tr('Resource.Fuel')}: ${fuel}%`,
                      `${tr('Resource.Ammo')}: ${ammo}%`,
                      `${tr('Expeditions')}: ${es}`,
                    ].join(', ')
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
            </Col>
            <Col sm={10} style={{width: '100%'}}>
              {
                [
                  {rp: 'fuel', value: fuelPercent},
                  {rp: 'ammo', value: ammoPercent},
                ].map(({rp,value}) => (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                    }} key={rp}>
                    <ItemIcon name={rp} style={{width: '1.2em'}} />
                    <Slider
                      style={{
                        marginLeft: 20,
                        marginRight: 20,
                        marginBottom: 20,
                        marginTop: 20,
                      }}
                      value={value}
                      onChange={this.handleChange(rp)}
                      min={0} max={100} step={null} marks={percentMarks} />
                  </div>
                ))
              }
            </Col>
          </Row>
        </Grid>
      </Panel>
    )
  }
}

const CostPicker = connect(
  mergeMapStateToProps(
    costPickerSelector,
    translateSelector),
  mapDispatchToProps,
)(CostPickerImpl)

export {
  CostPicker,
}

import React, { Component } from 'react'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'
import {
  pprIncomePercent,
  modifierToFactor,
} from '../../exped-info'

const renderStandard = (gs,daihatsu,prefix,factor) => (
  <OverlayTrigger
    placement="left"
    overlay={
      <Tooltip id={`${prefix}income-modifier`}>
        {pprIncomePercent(factor)}
      </Tooltip>
    }
  >
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={{
        fontWeight: 'bold',
        width: '1.1em',
        marginRight: 4,
      }}>
        {gs ? '大' : '普'}
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <ItemIcon name="dlc" style={{height: '2em'}} />
        <span>x{daihatsu}</span>
      </div>
    </div>
  </OverlayTrigger>
)

const renderCustom = value => (
  <div style={{height: '2em', lineHeight: '2em'}}>
    {`${pprIncomePercent(value)}`}
  </div>
)

class ModifierView extends Component {
  static propTypes = {
    style: PTyp.object,
    prefix: PTyp.string,
    numeric: PTyp.bool.isRequired,
    modifier: PTyp.object.isRequired,
  }

  static defaultProps = {
    style: {},
    prefix: '',
  }

  render() {
    const {modifier, style, prefix, numeric} = this.props
    const factor = modifierToFactor(modifier)
    return (
      <div style={style}>
        {
          /* eslint-disable indent */
          (numeric || modifier.type === 'custom') ?
            renderCustom(factor) :
          modifier.type === 'standard' ?
            renderStandard(modifier.gs, modifier.daihatsu, prefix, factor) :
          null
          /* eslint-enable indent */
        }
      </div>
    )
  }
}

export { ModifierView }

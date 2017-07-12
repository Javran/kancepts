import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'
import { modifierToFactor } from '../../exped-info'
import { tableUISelector } from '../../selectors'

// 0 < value < 5
const pprIncomePercent = v => {
  if (v <= 0 || v >= 5)
    return console.error(`invariant violation: ${v} is not in range (0,5)`)
  if (v < 1) {
    const diff = (1-v)*100
    return `-${diff.toFixed(2)}%`
  } else {
    const diff = (v-1)*100
    return `+${diff.toFixed(2)}%`
  }
}

const renderStandard = (gs,daihatsu,prefix,factor) => (
  <OverlayTrigger
    placement="left"
    overlay={
      <Tooltip id={`${prefix}-income-modifier`}>
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

class ModifierViewImpl extends Component {
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
          (numeric || modifier.type === 'custom') ?
            renderCustom(factor) :
          modifier.type === 'standard' ?
            renderStandard(modifier.gs, modifier.daihatsu, prefix, factor) :
          null
        }
      </div>
    )
  }
}

const ModifierView = connect(
  state => {
    const {numeric} = tableUISelector(state).view
    return {numeric}
  }
)(ModifierViewImpl)

export { ModifierView }

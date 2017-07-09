import React, { Component } from 'react'
import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'

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

const viewModifier = modifier => {
  if (modifier.type === 'standard') {
    return (
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{
          fontWeight: 'bold',
          width: '1.1em',
          marginRight: 4,
        }}>
          {modifier.gs ? '大' : '普'}
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <ItemIcon name="dlc" style={{height: '2em'}} />
          <span>x{modifier.daihatsu}</span>
        </div>
      </div>
    )
  }
  if (modifier.type === 'custom')
    return (<div>{`${pprIncomePercent(modifier.value)}`}</div>)
}

class ModifierView extends Component {
  static propTypes = {
    style: PTyp.object,
    modifier: PTyp.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {modifier, style} = this.props
    return (
      <div style={style}>
        {viewModifier(modifier)}
      </div>
    )
  }
}

export { ModifierView }

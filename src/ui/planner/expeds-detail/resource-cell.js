import React, { PureComponent } from 'react'
import { ItemIcon } from '../../item-icon'
import { PTyp } from '../../../ptyp'

class ResourceCell extends PureComponent {
  static propTypes = {
    name: PTyp.string.isRequired,
    value: PTyp.number.isRequired,
  }

  render() {
    const {name, value} = this.props
    return (
      <div style={{display: 'flex'}}>
        <ItemIcon name={name} style={{width: '1.2em'}} />
        <div style={{flex: 1}}>{value}</div>
      </div>
    )
  }
}

export { ResourceCell }

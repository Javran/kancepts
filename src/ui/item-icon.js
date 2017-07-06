import React, { PureComponent } from 'react'

import { PTyp } from '../ptyp'

import {imgMap} from './item-icon-import'

class ItemIcon extends PureComponent {
  static propTypes = {
    name: PTyp.oneOf([...imgMap.keys()]).isRequired,
    className: PTyp.string,
    style: PTyp.object,
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const {className, style, name} = this.props
    return (
      <img
        src={imgMap.get(name)}
        alt={name}
        className={className}
        style={style}
      />
    )
  }
}

export { ItemIcon }

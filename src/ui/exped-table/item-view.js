import React, { Component } from 'react'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'

// eslint-disable-next-line react/prop-types
const mkItem = ({name, maxCount}, isGS) => {
  if (name === null || maxCount === 0)
    return (<span>-</span>)
  const countText = isGS ?
    (maxCount > 1 ? `1~${maxCount}` : '1') :
    `0~${maxCount}`
  return (
    <span>
      <ItemIcon style={{width: '1.1em'}} name={name} />
      <span>{`x${countText}`}</span>
    </span>
  )
}

class ItemView extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
    item: PTyp.object.isRequired,
    isHourly: PTyp.bool.isRequired,
    gs: PTyp.oneOf([
      // null: normal item
      null,
      // true / false: great success item
      true,
      false,
    ]).isRequired,
  }

  render() {
    const {style, item, isHourly, gs} = this.props
    return (
      <div style={style}>
        {mkItem(item,gs !== null)}
      </div>
    )
  }
}

export { ItemView }

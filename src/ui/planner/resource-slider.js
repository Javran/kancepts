import _ from 'lodash'
import React, { PureComponent } from 'react'
import { enumFromTo } from 'subtender'
import Slider from 'rc-slider'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'

const marks = _.fromPairs(
  enumFromTo(-5,20,v => v+5).map(x => [x,x]))

class ResourceSlider extends PureComponent {
  static propTypes = {
    name: PTyp.string.isRequired,
    style: PTyp.object,
    weight: PTyp.number.isRequired,
    onChangeValue: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {name, style, weight, onChangeValue} = this.props
    return (
      <div style={{
        ...style,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1em',
        paddingRight: '1em',
      }}>
        <ItemIcon
          style={{width: '1.4em'}}
          name={name} />
        <div
          style={{
            width: '2.2em',
            marginLeft: '.5em',
            marginRight: '.5em',
          }}
        >
          {weight}
        </div>
        <Slider
          min={-5} max={20}
          value={weight}
          marks={marks}
          onChange={onChangeValue}
        />
      </div>
    )
  }
}

export { ResourceSlider }

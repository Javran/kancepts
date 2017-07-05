import _ from 'lodash'
import React, { Component } from 'react'
import { Panel } from 'react-bootstrap'
import Slider from 'rc-slider'

import { PTyp } from '../../ptyp'
import { enumFromTo } from '../../utils'

class ResourcePriorityPanel extends Component {
  static propTypes = {
    style: PTyp.object,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style} = this.props
    return (
      <Panel
        style={style}
        header="Resource Priority"
      >
        <Slider
          min={-5}
          max={20}
          step={1}
          marks={
            _.fromPairs(enumFromTo(-5,20,v => v+5)
              .map(x => [x,x]))}
        />
      </Panel>
    )
  }
}

export { ResourcePriorityPanel }

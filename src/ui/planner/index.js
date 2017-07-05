import React, { Component } from 'react'
import { Control } from './control'

class Planner extends Component {
  render() {
    return (
      <div>
        <Control />
        <div>ResultView</div>
      </div>
    )
  }
}

export {
  Planner,
}

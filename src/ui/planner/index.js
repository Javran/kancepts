import React, { Component } from 'react'

import { Control } from './control'
import { ResultTable } from './result-table'

class Planner extends Component {
  render() {
    return (
      <div>
        <Control />
        <ResultTable />
      </div>
    )
  }
}

export {
  Planner,
}

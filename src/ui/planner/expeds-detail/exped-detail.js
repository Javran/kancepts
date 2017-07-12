import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PTyp } from '../../../ptyp'
import { expedDetailSelector } from './selectors'

class ExpedDetailImpl extends Component {
  static propTypes = {
    id: PTyp.number.isRequired,
    info: PTyp.object.isRequired,
    config: PTyp.object.isRequired,
    expedIncome: PTyp.object.isRequired,
  }

  render() {
    const {id} = this.props
    return (
      <div>
        placeholder {id}
      </div>
    )
  }
}


const ExpedDetail = connect(
  (state,{id}) =>
    expedDetailSelector(id)(state)
)(ExpedDetailImpl)

export { ExpedDetail }

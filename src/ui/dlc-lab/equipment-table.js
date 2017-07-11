import React, { Component } from 'react'
import { connect } from 'react-redux'

import { PTyp } from '../../ptyp'
import { dlcLabSelector } from '../../selectors'

class EquipmentTableImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    equipments: PTyp.object.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {equipments, style} = this.props
    return (
      <div style={style}>
        Raw: {JSON.stringify(equipments)}
      </div>
    )
  }
}

const EquipmentTable = connect(
  state => {
    const {equipments} = dlcLabSelector(state)
    return {equipments}
  }
)(EquipmentTableImpl)

export { EquipmentTable }

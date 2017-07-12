import React, { Component } from 'react'

import { PTyp } from '../../../ptyp'
import { ExpedDetail } from './exped-detail'

class ExpedsDetail extends Component {
  static propTypes = {
    expedIds: PTyp.arrayOf(PTyp.number).isRequired,
  }

  render() {
    const {expedIds} = this.props
    return (
      <div>
        {
          expedIds.map(expedId => (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
              key={expedId}>
              <ExpedDetail id={expedId} />
            </div>
          ))
        }
      </div>
    )
  }
}

export { ExpedsDetail }

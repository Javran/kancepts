import React, { PureComponent } from 'react'

import { expedInfoList, resourceProperties } from '../../../exped-info'
import { PTyp } from '../../../ptyp'
import { pprTime } from '../../../utils'
import { ItemIcon } from '../../item-icon'

class ExpedDetail extends PureComponent {
  static propTypes = {
    id: PTyp.number.isRequired,
  }

  render() {
    const {id} = this.props
    const expedInfo = expedInfoList.find(ei => ei.id === id)
    const {resource} = expedInfo
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div>
          {
            [
              `Expedition #${id}`,
              expedInfo.name,
              pprTime(expedInfo.time),
            ].join(', ')
          }
        </div>
        <div style={{display: 'flex'}}>
          {
            resourceProperties.map(rp => (
              <div key={rp} style={{width: '4em'}}>
                <ItemIcon
                  name={rp}
                  style={{
                    width: '1.2em',
                    marginRight: '.2em',
                  }} />
                <span>{resource[rp]}</span>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

export { ExpedDetail }

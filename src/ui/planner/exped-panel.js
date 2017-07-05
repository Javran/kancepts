import _ from 'lodash'
import React, { Component } from 'react'
import {
  Panel,
  Button,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import {
  allExpedIdList,
  expedInfoList,
  formatTime,
} from '../../exped-info'

class ExpedPanel extends Component {
  static propTypes = {
    style: PTyp.object,
    expedFlags: PTyp.objectOf(PTyp.bool).isRequired,
    onToggleExped: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style, expedFlags, onToggleExped} = this.props
    return (
      <Panel
        style={{
          ...style,
          width: '80%',
        }}
        header="Expeditions"
      >
        <div style={{
          display: 'flex',
          padding: '4px 2px',
          justifyContent: 'space-between',
        }}>
          {

            _.chunk(allExpedIdList,8).map((expedIds,ind) => {
              const world = ind+1
              return (
                <div
                  key={world}
                  style={{width: '19%', marginRight: 2, marginLeft: 2}}
                  >
                  {
                    expedIds.map(expedId => {
                      const info =
                        expedInfoList.find(i => i.id === expedId)
                      const flag = expedFlags[expedId]
                      return (
                        <Button
                          key={expedId}
                          bsStyle={flag ? 'success' : 'default'}
                          bsSize="small"
                          onClick={onToggleExped(expedId)}
                          block>
                          <div style={{
                            width: '100%',
                            display: 'flex', alignItems: 'baseline'}}>
                            <div
                              style={{
                                flex: 1,
                                textAlign: 'left',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                paddingRight: '0.2em',
                              }}
                            >
                              {`${expedId} ${info.name}`}
                            </div>
                            <div style={{
                              alignSelf: 'flex-right',
                              textAlign: 'right'}}>
                              {formatTime(info.time)}
                            </div>
                          </div>
                        </Button>
                      )
                    })
                  }
                </div>
              )
            })
          }
        </div>
      </Panel>
    )
  }
}

export { ExpedPanel }

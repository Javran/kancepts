import React, { Component } from 'react'
import {
  Panel,
  Button,
} from 'react-bootstrap'
import { enumFromTo } from '../../utils'

import { formatTime, expedInfoList } from '../../exped-info'

class Control extends Component {
  render() {
    const ctrlRowStyle = {
      display: 'flex',
      alignItems: 'stretch',
    }

    const panelStyle = {
      marginTop: 10,
      marginBottom: 0,
      marginLeft: 8,
    }

    return (
      <div className="planner-control-panels">
        <div style={ctrlRowStyle}>
          <Panel
            style={{
              ...panelStyle,
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
                enumFromTo(1,5).map(world => {
                  const expedFirst =world*8-7
                  const expedLast = world*8
                  return (
                    <div
                      key={world}
                      style={{width: '19%', marginRight: 2, marginLeft: 2}}
                    >
                      {
                        enumFromTo(expedFirst,expedLast).map(expedId => {
                          const info = expedInfoList.find(i => i.id === expedId)
                          return (
                            <Button
                              key={expedId}
                              bsSize="small"
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
          <Panel
            style={{
              ...panelStyle,
              width: '20%',
            }}
            header="Presets"
          >
            Presets
          </Panel>
        </div>
        <div style={ctrlRowStyle}>
          <Panel
            style={{
              ...panelStyle,
              flex: 3,
            }}
            header="Priority"
          >
            Resource Priority
          </Panel>
          <Panel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            header="AFK Time"
          >
            AFK Time
          </Panel>
          <Panel
            style={{
              ...panelStyle,
              flex: 1,
            }}
            header="Fleets"
          >
            Available fleets
          </Panel>
        </div>
      </div>
    )
  }
}

export {
  Control,
}

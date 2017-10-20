import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  Button,
} from 'react-bootstrap'

import { translateSelector } from '../../selectors'
import { PTyp } from '../../ptyp'
import {
  allExpedIdList,
  expedInfoList,
  formatTime,
} from '../../exped-info'

// TODO: remove hacky stuff
const allExpedIdList2 = allExpedIdList.filter(x => x < 100)

class ExpedPanelImpl extends Component {
  static propTypes = {
    style: PTyp.object,
    expedFlags: PTyp.objectOf(PTyp.bool).isRequired,
    onToggleExped: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {style, expedFlags, onToggleExped, tr} = this.props
    return (
      <Panel
        style={style}
        header={tr('Planner.Expeditions')}
      >
        <div style={{
          display: 'flex',
          padding: '4px 2px',
          justifyContent: 'space-between',
        }}>
          {
            _.chunk(allExpedIdList2,8).map((expedIds1,ind) => {
              const world = ind+1
              const expedIds = world === 1 ? [...expedIds1,100,101,102] : expedIds1
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
                          bsStyle={flag ? 'primary' : 'default'}
                          style={flag ? {} : {opacity: .5}}
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

const ExpedPanel = connect(translateSelector)(ExpedPanelImpl)

export { ExpedPanel }

import _ from 'lodash'
import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { PTyp } from '../../../ptyp'
import { resourceProperties } from '../../../exped-info'
import { expedDetailSelector } from './selectors'
import { ResourceCell } from './resource-cell'
import { ConfigCell } from './config-cell'
import { compoToStr } from '../../../ship-filters'

const pprTime = time => {
  const hh = Math.floor(time / 60)
  const mm = time - hh*60
  return _.compact([
    hh > 0 ? `${hh} hr` : null,
    mm > 0 ? `${mm} min` : null,
  ]).join(' ')
}

class ExpedDetailImpl extends Component {
  static propTypes = {
    id: PTyp.number.isRequired,
    info: PTyp.object.isRequired,
    config: PTyp.object.isRequired,
    expedIncome: PTyp.object.isRequired,
  }

  render() {
    const {id, info, config, expedIncome} = this.props
    const {name, time} = info
    const textStyle = {textAlign: 'left'}
    const {gross, resupplyInfo} = expedIncome
    const {cost, compo} = resupplyInfo
    const cellStyle = {verticalAlign: 'middle'}
    return (
      <div style={{
        marginBottom: 6,
      }}>
        <div style={{display: 'flex', marginLeft: '2em'}}>
          <div
            style={{...textStyle, width: '8em'}}>
            Expedition #{id}
          </div>
          <div
            style={{...textStyle, width: '11em'}}>
            {name}
          </div>
          <div
            style={{...textStyle, width: '6em'}}>
            {pprTime(time)}
          </div>
        </div>
        <Table
          style={{
            tableLayout: 'fixed',
            width: '30em',
            marginBottom: 0,
            marginTop: 5,
          }}
          condensed bordered>
          <tbody>
            <tr>
              <td style={{...cellStyle, width: '8em'}}>
                Resource
              </td>
              {
                resourceProperties.map(rp => (
                  <td key={rp} style={{width: '5em'}}>
                    <ResourceCell
                      name={rp}
                      value={gross[rp]}
                    />
                  </td>
                ))
              }
            </tr>
            <tr>
              <td style={cellStyle}>
                Cost
              </td>
              <td>
                <ResourceCell name="fuel" value={-cost.fuel} />
              </td>
              <td>
                <ResourceCell name="ammo" value={-cost.ammo} />
              </td>
            </tr>
            <tr>
              <td style={cellStyle}>
                Config
              </td>
              <td colSpan={4} style={cellStyle}>
                <ConfigCell config={config} />
              </td>
            </tr>
            {
              compo !== null && (
                <tr>
                  <td style={cellStyle}>
                    Composition
                  </td>
                  <td colSpan={4} style={cellStyle}>
                    {compoToStr(compo)}
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>
      </div>
    )
  }
}


const ExpedDetail = connect(
  (state,{id}) =>
    expedDetailSelector(id)(state)
)(ExpedDetailImpl)

export { ExpedDetail }

import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { connect } from 'react-redux'
import { PTyp } from '../../../ptyp'
import { resourceProperties } from '../../../exped-info'
import { translateSelector } from '../../../selectors'
import { expedDetailSelector } from './selectors'
import { ResourceCell } from './resource-cell'
import { ConfigCell } from './config-cell'
import { compoToStr } from '../../../ship-filters'
import { pprTime } from '../../../utils'

class ExpedDetailImpl extends Component {
  static propTypes = {
    info: PTyp.object.isRequired,
    config: PTyp.object.isRequired,
    expedIncome: PTyp.object.isRequired,
    tr: PTyp.func.isRequired,
  }

  render() {
    const {info, config, expedIncome, tr} = this.props
    const {name, time, dispNum} = info
    const textStyle = {textAlign: 'left'}
    const {gross, resupplyInfo} = expedIncome
    const {cost, compo} = resupplyInfo
    const cellStyle = {verticalAlign: 'middle'}
    return (
      <div style={{
        marginBottom: 6,
        color: '#ffffff',
      }}>
        <div style={{display: 'flex', marginLeft: '2em'}}>
          <div
            style={{...textStyle, width: '8em'}}>
            {tr('Expedition')} {dispNum}
          </div>
          <div
            style={{...textStyle, width: '11em'}}>
            {name}
          </div>
          <div
            style={{...textStyle, width: '8em'}}>
            {pprTime(time,tr)}
          </div>
        </div>
        <Table
          style={{
            tableLayout: 'fixed',
            width: '30em',
            marginBottom: 0,
            marginTop: 5,
            color: '#ffffff',
          }}
          condensed bordered>
          <tbody>
            <tr>
              <td style={{...cellStyle, width: '8em'}}>
                {tr('ResourceText')}
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
                {tr('Cost')}
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
                {tr('Config')}
              </td>
              <td colSpan={4} style={cellStyle}>
                <ConfigCell config={config} tr={tr} />
              </td>
            </tr>
            {
              compo !== null && (
                <tr>
                  <td style={cellStyle}>
                    {tr('Composition')}
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
  (state,{id}) => {
    const {tr} = translateSelector(state)
    return {...expedDetailSelector(id)(state),tr}
  }
)(ExpedDetailImpl)

export { ExpedDetail }

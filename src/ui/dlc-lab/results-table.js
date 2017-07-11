import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  FormControl,
} from 'react-bootstrap'

import { dlcLabSelector } from '../../selectors'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'

class ResultsTable extends Component {
  render() {
    const mkHeader = (content, style={}) => (
      <td style={{
        verticalAlign: 'middle',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...style,
      }}>{content}</td>
    )

    // TODO
    const mkRow = (name, value='TODO', key=undefined) => (
      <tr key={key}>{mkHeader(name)}<td>{value}</td></tr>
    )

    return (
      <Table
        style={{tableLayout: 'fixed'}}
        striped bordered condensed hover>
        <tbody>
          <tr>
            {
              mkHeader('Raw Income',{width: '45%'})
            }
            <td>
              <FormControl
                type="input"
              />
            </td>
          </tr>
          {
            [
              'Income Modifier',
              'Basic Income',
              'Equipment Count',
              'Ave. Improvement',
              'DLC Bonus',
              'Toku DLC Bonus',
              'Total Income',
            ].map((n,ind) => mkRow(n,undefined,ind))
          }
        </tbody>
      </Table>
    )
  }
}

export { ResultsTable }

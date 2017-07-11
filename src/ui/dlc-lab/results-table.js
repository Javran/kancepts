import React, { Component } from 'react'
import {
  Table,
} from 'react-bootstrap'

class ResultsTable extends Component {
  render() {
    // TODO
    const mkRow = (name, value='TODO', key=undefined) => (
      <tr key={key}><td>{name}</td><td>{value}</td></tr>
    )
    return (
      <Table
        striped bordered condensed hover>
        <thead>
          <tr>
            <td>Name</td>
            <td>Value</td>
          </tr>
        </thead>
        <tbody>
          {
            [
              'Raw Income',
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

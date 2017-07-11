import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  FormControl,
} from 'react-bootstrap'

import { dlcLabUISelector } from '../../selectors'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'
import { PTyp } from '../../ptyp'
import { modifyObject } from '../../utils'

class ResultsTableImpl extends Component {
  static propTypes = {
    rawIncome: PTyp.number.isRequired,
    modifyDlcLabUI: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      rawIncomeStr: String(props.rawIncome),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rawIncome !== nextProps.rawIncome) {
      this.setState({rawIncomeStr: String(nextProps.rawIncome)})
    }
  }

  debouncedRawIncomeUpdate = _.debounce(
    () => {
      const rawIncome = Number(this.state.rawIncomeStr)
      if (_.isInteger(rawIncome) &&
          rawIncome >= 0 && rawIncome <= 5000) {
        const {modifyDlcLabUI} = this.props
        modifyDlcLabUI(
          modifyObject(
            'rawIncome',
            () => rawIncome))
      } else {
        this.setState({rawIncomeStr: String(this.props.rawIncome)})
      }
    },
    500)

  handleChangeRawIncomeStr = e =>
    this.setState(
      {rawIncomeStr: e.target.value},
      this.debouncedRawIncomeUpdate)

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
                onChange={this.handleChangeRawIncomeStr}
                value={this.state.rawIncomeStr}
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
              'Actual Modifier',
            ].map((n,ind) => mkRow(n,undefined,ind))
          }
        </tbody>
      </Table>
    )
  }
}

const ResultsTable = connect(
  state => {
    const {rawIncome} = dlcLabUISelector(state)
    return {rawIncome}
  },
  mapDispatchToProps)(ResultsTableImpl)

export { ResultsTable }

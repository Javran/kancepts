import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Table,
  FormControl,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { dlcLabUISelector } from '../../selectors'
import { dlcResultsSelector } from './selectors'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'
import { PTyp } from '../../ptyp'
import { modifyObject } from '../../utils'

class ResultsTableImpl extends Component {
  static propTypes = {
    rawIncome: PTyp.number.isRequired,
    resultRows: PTyp.arrayOf(PTyp.shape({
      id: PTyp.string.isRequired,
      name: PTyp.string.isRequired,
      content: PTyp.node.isRequired,
      tooltip: PTyp.node,
    })).isRequired,
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
    const {resultRows} = this.props
    const mkHeader = (content, style={}) => (
      <td style={{
        verticalAlign: 'middle',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        ...style,
      }}>{content}</td>
    )

    const renderRow = ({id, name, content, tooltip}) => (
      <tr key={id}>
        {mkHeader(name)}
        {
          tooltip !== null ? (
            <OverlayTrigger placement="left" overlay={
              <Tooltip id={`result-row-${name}`}>
                {tooltip}
              </Tooltip>}>
              <td>{content}</td>
            </OverlayTrigger>) : (
              <td>{content}</td>
            )
        }
      </tr>
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
            resultRows.map(renderRow)
          }
        </tbody>
      </Table>
    )
  }
}

const ResultsTable = connect(
  state => {
    const {rawIncome} = dlcLabUISelector(state)
    const resultRows = dlcResultsSelector(state)
    return {rawIncome, resultRows}
  },
  mapDispatchToProps)(ResultsTableImpl)

export { ResultsTable }

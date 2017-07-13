import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Panel,
  FormGroup,
  Checkbox,
  Button,
  FormControl,
} from 'react-bootstrap'

import { EquipmentTable } from './equipment-table'
import { NewEquipmentPanel } from './new-equipment-panel'
import { ResultsTable } from './results-table'
import { dlcLabUISelector, translateSelector } from '../../selectors'
import { mapDispatchToProps } from '../../store/reducer/ui/dlc-lab'
import { PTyp } from '../../ptyp'
import { modifyObject } from '../../utils'

class DlcLabImpl extends Component {
  static propTypes = {
    kinuK2: PTyp.bool.isRequired,
    gsPercent: PTyp.number.isRequired,
    modifyDlcLabUI: PTyp.func.isRequired,
    tr: PTyp.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      gsPercentStr: String(props.gsPercent),
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.gsPercent !== nextProps.gsPercent) {
      this.setState({gsPercentStr: String(nextProps.gsPercent)})
    }
  }

  handleToggleKinuK2 = e => {
    const {modifyDlcLabUI} = this.props
    const kinuK2 = e.target.checked
    modifyDlcLabUI(
      modifyObject(
        'kinuK2',
        () => kinuK2))
  }

  handleGsPercentChange = gsPercent => () => {
    const {modifyDlcLabUI} = this.props
    modifyDlcLabUI(
      modifyObject(
        'gsPercent',
        () => gsPercent))
  }

  debouncedGsPercentUpdate = _.debounce(
    () => {
      const gsPercent = Number(this.state.gsPercentStr)
      if (_.isInteger(gsPercent) &&
          gsPercent >= 0 &&
          gsPercent <= 100) {
        this.handleGsPercentChange(gsPercent)()
      } else {
        this.setState({gsPercentStr: String(this.props.gsPercent)})
      }
    },
    500)

  handleGsPercentTextChange = e =>
    this.setState(
      {gsPercentStr: e.target.value},
      this.debouncedGsPercentUpdate)

  render() {
    const {kinuK2, tr} = this.props
    const {gsPercentStr} = this.state
    return (
      <div style={{display: 'flex'}}>
        <Panel
          className="dlc-lab-control-panel"
          style={{
            width: '60%',
            marginRight: 10,
          }}
          header={tr('Expedition')}
        >
          <FormGroup style={{marginBottom: 5}}>
            <Checkbox
              onChange={this.handleToggleKinuK2}
              checked={kinuK2} inline>
              {tr('DlcLab.IncludeKinuK2')}
            </Checkbox>
          </FormGroup>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{marginRight: 5, flex: 1}}>{tr('GreatSuccess')}:</div>
            <Button
              onClick={this.handleGsPercentChange(0)}
              bsSize="small" style={{minWidth: '6em'}}>
              0%
            </Button>
            <FormControl
              style={{
                width: '40%',
                marginLeft: 5,
                marginRight: 5,
              }}
              onChange={this.handleGsPercentTextChange}
              value={gsPercentStr}
              type="text" />
            <Button
              onClick={this.handleGsPercentChange(100)}
              bsSize="small" style={{minWidth: '6em'}}>
              100%
            </Button>
          </div>
          <EquipmentTable style={{marginTop: 8, marginBottom: 5}} />
          <NewEquipmentPanel />
        </Panel>
        <Panel
          className="dlc-lab-control-panel"
          style={{flex: 1}}
          header={tr('DlcLab.Results')}
        >
          <ResultsTable />
        </Panel>
      </div>
    )
  }
}

const DlcLab = connect(
  state => {
    const {kinuK2, gsPercent} = dlcLabUISelector(state)
    const {tr} = translateSelector(state)
    return {kinuK2, gsPercent, tr}
  },
  mapDispatchToProps,
)(DlcLabImpl)

export { DlcLab }

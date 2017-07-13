import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { IncomeModifierEdit } from './income-modifier-edit'
import { ResupplyCostEdit } from './resupply-cost-edit'

import { PTyp } from '../../ptyp'
import { translateSelector } from '../../selectors'

class ExpedRowEditImpl extends Component {
  static propTypes = {
    modifier: PTyp.object,
    cost: PTyp.object,
    id: PTyp.number.isRequired,
    onModifyModifier: PTyp.func.isRequired,
    onModifyCost: PTyp.func.isRequired,
    onSave: PTyp.func,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    modifier: null,
    cost: null,
    onSave: null,
  }

  render() {
    const {
      modifier, cost, id,
      onModifyModifier, onModifyCost,
      onSave,
      tr,
    } = this.props
    // make the value a boolean
    const isInputValid = !!onSave
    if (modifier === null || cost === null)
      return null

    const panelStyle = {
      marginTop: 10,
      marginBottom: 0,
      marginLeft: 8,
    }
    return (
      <div style={{
        display: 'flex',
        alignItems: 'stretch',
        marginBottom: 10,
      }}>
        <Panel
          className="exped-row-edit-panel"
          style={{
            ...panelStyle,
            flex: 1,
            width: '47.5%',
          }}
          header={tr('IncomeModifier.Name')}>
          <IncomeModifierEdit
            id={id}
            modifier={modifier}
            tr={tr}
            onModify={onModifyModifier}
          />
        </Panel>
        <Panel
          className="exped-row-edit-panel"
          style={{
            ...panelStyle,
            flex: 1,
            width: '47.5%',
          }}
          header={tr('ResupplyCost.Name')}>
          <ResupplyCostEdit
            id={id}
            cost={cost}
            tr={tr}
            onModify={onModifyCost}
          />
        </Panel>
        <Button
          bsSize="xsmall"
          bsStyle={isInputValid ? 'default' : 'danger'}
          disabled={!isInputValid}
          onClick={onSave}
          style={{
            width: '5%',
            alignSelf: 'flex-end',
            marginLeft: 8,
          }}
        >
          <FontAwesome name="save" />
        </Button>
      </div>
    )
  }
}

const ExpedRowEdit = connect(translateSelector)(ExpedRowEditImpl)

export { ExpedRowEdit }

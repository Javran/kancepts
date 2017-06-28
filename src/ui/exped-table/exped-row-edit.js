import React, { Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'

import { IncomeModifierEdit } from './income-modifier-edit'
import { ResupplyCostEdit } from './resupply-cost-edit'

class ExpedRowEdit extends Component {
  render() {
    const {
      modifier, cost, id,
      onModifyModifier, onModifyCost,
    } = this.props
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
          header="Income Modifier">
          <IncomeModifierEdit
            id={id}
            modifier={modifier}
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
          header="Resupply Cost">
          <ResupplyCostEdit
            id={id}
            cost={cost}
            onModify={onModifyCost}
          />
        </Panel>
        <Button bsSize="xsmall" style={{
          width: '5%',
          alignSelf: 'flex-end',
          marginLeft: 8,
        }}>
          <FontAwesome name="save" />
        </Button>
      </div>
    )
  }
}

export { ExpedRowEdit }

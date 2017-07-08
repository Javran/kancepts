import _ from 'lodash'
import React, { Component } from 'react'
import {
  Panel,
  Form, FormControl,
} from 'react-bootstrap'

import { handleNoSubmit } from '../../utils'
import { PTyp } from '../../ptyp'

/*
   input mechanism: having two text fields: "hourStr" and "minuteStr"

   - state is kept internally in this Component

   - a change in property afkTime updates both fields

   - a text field edit changes the corresponding field immediately,
     but update only happens after a delay (500ms)

   - if the field contains error, afkTime property is used to restore states
     instead of updating actual afkTime.

 */

const stateFromAfkTime = afkTime => {
  if (_.isInteger(afkTime) && afkTime >= 0) {
    const hh = Math.floor(afkTime / 60)
    const mm = afkTime - hh*60
    return {
      minuteStr: String(mm),
      hourStr: String(hh),
    }
  } else {
    return {
      minuteStr: '',
      hourStr: '',
    }
  }
}

class AfkTimePanel extends Component {
  static propTypes = {
    style: PTyp.object,
    afkTime: PTyp.number.isRequired,
    onModify: PTyp.func.isRequired,
  }

  static defaultProps = {
    style: {},
  }

  constructor(props) {
    super(props)
    this.state = stateFromAfkTime(props.afkTime)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.afkTime !== nextProps.afkTime) {
      this.setState(stateFromAfkTime(nextProps.afkTime))
    }
  }

  debouncedUpdateAfkTime = _.debounce(
    () => {
      const {minuteStr, hourStr} = this.state
      const hh = Number(hourStr)
      const mm = Number(minuteStr)

      if (_.isInteger(hh) && _.isInteger(mm)) {
        const {onModify} = this.props
        onModify(() => hh*60+mm)
      } else {
        this.setState(stateFromAfkTime(this.props.afkTime))
      }
    },
    500)

  handleChangeHourStr = e => {
    const hour = Math.max(0,parseInt(e.target.value,10))
    this.setState(
      {hourStr: String(hour)},
      this.debouncedUpdateAfkTime
    )
  }

  handleChangeMinuteStr = e => {
    const minute = Math.max(0,parseInt(e.target.value,10))
    this.setState(
      {minuteStr: String(minute)},
      this.debouncedUpdateAfkTime
    )
  }

  render() {
    const {style} = this.props
    const {minuteStr, hourStr} = this.state
    return (
      <Panel
        style={style}
        header="AFK Time"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: 5,
          }}>
          <Form
            onSubmit={handleNoSubmit}
            inline style={{flex: 1}}>
            <FormControl
              onChange={this.handleChangeHourStr}
              value={hourStr}
              type="number" style={{width: '100%'}}
            />
          </Form>
          <div style={{marginLeft: '.5em', width: '30%'}}>
            Hours
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Form
            onSubmit={handleNoSubmit}
            inline style={{flex: 1}}>
            <FormControl
              onChange={this.handleChangeMinuteStr}
              value={minuteStr}
              type="number" style={{width: '100%'}}
            />
          </Form>
          <div style={{marginLeft: '.5em', width: '30%'}}>
            Mins
          </div>
        </div>
      </Panel>
    )
  }
}

export { AfkTimePanel }

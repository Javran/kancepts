import React, { Component } from 'react'
import {
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap'

import { PTyp } from '../../ptyp'
import { ItemIcon } from '../item-icon'

const mapMaybeRanged = f => x => x.ranged ?
  {...x, min: f(x.min), max: f(x.max)} :
  {...x, value: f(x.value)}

const maybeRangedToAverage = x => x.ranged ?
  (x.min + x.max)/2 : x.value

const prepareText = (maybeRanged, isHourly, time, gs, tr) => {
  const noGSItem = gs === false
  if (noGSItem) {
    return {
      content: '0',
      contentClass: 'text-danger',
      tooltip: tr('Table.ItemIsGreatSuccessExclusive'),
    }
  }
  if (isHourly) {
    // hourly view, first do division accordingly
    const r = mapMaybeRanged(x => x*60*8/time)(maybeRanged)
    // show expectation
    const content = `${maybeRangedToAverage(r).toFixed(1)}/8hr`
    // show details in tooltip
    const tooltip = r.ranged ?
      `${r.min.toFixed(2)}~${r.max.toFixed(2)} / 8 hours` :
      `${r.value.toFixed(2)} / 8 hours`
    return {
      content,
      contentClass: null,
      tooltip,
    }
  } else {
    // normal view, no tooltip
    const content = maybeRanged.ranged ?
      `${maybeRanged.min}~${maybeRanged.max}` :
      String(maybeRanged.value)
    return {
      content,
      contentClass: null,
      tooltip: null,
    }
  }
}

class ItemView extends Component {
  static propTypes = {
    style: PTyp.object.isRequired,
    item: PTyp.object.isRequired,
    isHourly: PTyp.bool.isRequired,
    time: PTyp.number.isRequired,
    // null: normal item
    // true / false: great success item
    gs: PTyp.bool,
    prefix: PTyp.string.isRequired,
    tr: PTyp.func.isRequired,
  }

  static defaultProps = {
    gs: null,
  }

  render() {
    const {style, item, isHourly, gs, time, prefix, tr} = this.props
    const {name, maxCount} = item
    if (name === null || maxCount === 0)
      return (<span>-</span>)
    const count = (() => {
      const min = gs === null ? 0 : 1
      const max = maxCount
      return min === max ?
        {ranged: false, value: min} :
        {ranged: true, min, max}
    })()
    const {content,contentClass,tooltip} =
      prepareText(count,isHourly,time,gs,tr)
    const contentNode = (
      <span>
        <ItemIcon style={{width: '1.1em'}} name={name} />
        <span className={contentClass !== null ? contentClass : undefined}>
          {`x${content}`}
        </span>
      </span>
    )
    return (
      <div style={style}>
        {
          tooltip ? (
            <OverlayTrigger
              placement="left"
              overlay={
                <Tooltip id={`${prefix}detail`}>
                  {tooltip}
                </Tooltip>
              }
            >
              {contentNode}
            </OverlayTrigger>
          ) : (
            contentNode
          )
        }
      </div>
    )
  }
}

export { ItemView }

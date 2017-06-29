import React, { PureComponent } from 'react'

import { PTyp } from '../ptyp'

// TODO: I know this looks awful, but first we need a working version...

import fuelImg from '../assets/icons/fuel.png'
import ammoImg from '../assets/icons/ammo.png'
import steelImg from '../assets/icons/steel.png'
import bauxiteImg from '../assets/icons/bauxite.png'

import bucketImg from '../assets/icons/bucket.png'
import instantBuildImg from '../assets/icons/instant-build.png'
import devMatImg from '../assets/icons/dev-mat.png'
import screwImg from '../assets/icons/screw.png'

import coinSmallImg from '../assets/icons/coin-small.png'
import coinMediumImg from '../assets/icons/coin-medium.png'
import coinLargeImg from '../assets/icons/coin-large.png'

import dlcImg from '../assets/icons/dlc.png'

import ringImg from '../assets/icons/ring.png'

const imgMap = new Map([
  ['fuel', fuelImg],
  ['ammo', ammoImg],
  ['steel', steelImg],
  ['bauxite', bauxiteImg],
  ['bucket', bucketImg],
  ['instant-build', instantBuildImg],
  ['dev-mat', devMatImg],
  ['screw', screwImg],
  ['coin-small', coinSmallImg],
  ['coin-medium', coinMediumImg],
  ['coin-large', coinLargeImg],
  ['dlc', dlcImg],
  ['ring', ringImg],
])

class ItemIcon extends PureComponent {
  static propTypes = {
    name: PTyp.oneOf([...imgMap.keys()]).isRequired,
    className: PTyp.string,
    style: PTyp.object,
  }

  static defaultProps = {
    className: '',
    style: {},
  }

  render() {
    const {className, style, name} = this.props
    return (
      <img
        src={imgMap.get(name)}
        alt={name}
        className={className}
        style={style}
      />
    )
  }
}

export { ItemIcon }

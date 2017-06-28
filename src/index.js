import React from 'react'
import ReactDOM from 'react-dom'
import { join } from 'path-extra'

import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { ExpedRecommender } from './ui'
import { register } from './registerServiceWorker'

ReactDOM.render(
  <div className="root">
    <link
      rel="stylesheet"
      href={join(__dirname,'..','assets','index.css')}
    />
    <ExpedRecommender />
  </div>,
  document.getElementById('root'))
register()

import React from 'react'
import ReactDOM from 'react-dom'
import { join } from 'path-extra'
import { Provider } from 'react-redux'

import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { ExpedRecommender } from './ui'
import { register } from './registerServiceWorker'

import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <div className="root">
      <link
        rel="stylesheet"
        href={join(__dirname,'..','assets','index.css')}
      />
      <ExpedRecommender />
    </div>
  </Provider>,
  document.getElementById('root'))
register()

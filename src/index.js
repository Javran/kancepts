import React from 'react'
import ReactDOM from 'react-dom'
import { join } from 'path-extra'
import { Provider } from 'react-redux'

import 'rc-slider/assets/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { KanceptsMain } from './ui'
import { register } from './registerServiceWorker'

import { store } from './store'

ReactDOM.render(
  (
    <div className="root">
      <link
        rel="stylesheet"
        href={join(__dirname,'..','assets','index.css')}
      />
      <Provider store={store}>
        <KanceptsMain />
      </Provider>
    </div>
  ),
  document.getElementById('root'))
register()

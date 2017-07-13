import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import 'rc-slider/assets/index.css'
import 'font-awesome/css/font-awesome.css'
import './assets/index.css'

import { KanceptsMain } from './ui'
import { register } from './registerServiceWorker'

import { store } from './store'

/*

   TODO

   - ship list

     - sorting
     - find a way to allow list modification

   - settings (TODO)

     - i18n
     - data import / export

 */

ReactDOM.render(
  (
    <div className="root">
      <Provider store={store}>
        <KanceptsMain />
      </Provider>
    </div>
  ),
  document.getElementById('root'))
register()

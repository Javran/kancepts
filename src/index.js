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
     - autoconfig table
     - data import / export
     - table batch:

       - reset all
       - apply great success for
           - expeditions that

               - longer than ? mins
               - resource sum >= ?

           - dlc: require 0(*)/1/2/3/4
           - fleet count: 6(*)/5/4

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

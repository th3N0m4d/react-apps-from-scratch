import React from 'react'
import { render } from 'react-dom'

import './App.scss'

const App = () => (
  <div>
    <span className='lnr lnr-clock' /> lnr-clock
  </div>
)

render(
  <App />,
  document.getElementById('app')
)

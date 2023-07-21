import React from 'react'
import { Icon } from '@iconify/react'

function Header({regular, setRegular}) {
  let regularToggle = {
    backgroundColor: regular ? 'yellow' : 'white'
  }

  let premiumToggle = {
    backgroundColor: regular ? 'white' : 'yellow'
  }
  
  return (
    <header className='header'>
      <div className='title'>
        <h1><Icon icon = "typcn:location" />Costco Gas Stations Map</h1>
      </div>
      <div className = 'toggle-gas'>
        <button onClick = {() => setRegular(true)} className = 'toggle-btn' style = {regularToggle}>Regular</button>
        <button onClick = {() => setRegular(false)} className = 'toggle-btn' style = {premiumToggle}>Premium</button>
      </div>
    </header>
  )
}

export default Header
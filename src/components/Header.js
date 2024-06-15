import React from 'react'
import { Icon } from '@iconify/react'
import '../styles/Header.css'

function Header() {
  return (
    <header className='header'>
      <div className='title'>
        <h1><Icon icon = "typcn:location" /> Costco Gas Stations Map</h1>
      </div>
    </header>
  )
}

export default Header
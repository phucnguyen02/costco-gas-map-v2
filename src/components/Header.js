import React, { useContext } from 'react'
import { Icon } from '@iconify/react'
import './Header.css'
import ReactSwitch from 'react-switch'
import { RegularContext } from './Context'

function Header() {
  const [isRegular, setRegular] = useContext(RegularContext);
  return (
    <header className='header'>
      <div className='title'>
        <h1><Icon icon = "typcn:location" />Costco Gas Stations Map</h1>
      </div>
      <div className = 'toggle-gas'>
        <h1>Premium:</h1>
        <ReactSwitch onChange = {() => {setRegular(!isRegular)}} checked = {isRegular === false} className = 'toggle-btn'/>
      </div>
    </header>
  )
}

export default Header
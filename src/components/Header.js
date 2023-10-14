import React, { useContext, useState } from 'react'
import { Icon } from '@iconify/react'
import '../styles/Header.css'
import ReactSwitch from 'react-switch'
import { RegularContext } from './RegularContext'
import { CenterContext } from './CenterContext'

function Header() {
  const {isRegular, setRegular} = useContext(RegularContext);
  const {centerState, setCenterState} = useContext(CenterContext);
  const [stateInput, setStateInput] = useState("");
  function changeStateInput({target}){
    setStateInput(target.value)
  }

  function handleKeyDown(event){
    if(event.key === 'Enter'){
      setCenterState(stateInput);
    }
  }
  return (
    <header className='header'>
      <div className='title'>
        <h1><Icon icon = "typcn:location" />Costco Gas Stations Map</h1>
      </div>
      <div className = 'toggle-gas'>
        <h1>Premium:</h1>
        <ReactSwitch onChange = {() => {setRegular(!isRegular)}} checked = {isRegular === false} className = 'toggle-btn'/>
      </div>
      {/* <div className = 'center-state'>
        <input value = {stateInput} onChange = {changeStateInput} onKeyDown = {handleKeyDown}/>
      </div> */}
      
    </header>
  )
}

export default Header
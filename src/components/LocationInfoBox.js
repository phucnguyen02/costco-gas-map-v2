import React from 'react'
import './LocationInfoBox.css'

function LocationInfoBox({ info, regular }) {
  return (
    <div className='location-info'>
        <h2>Warehouse Info</h2>
        <ul>
            <li>Address: <strong>{ info.name }</strong></li>
            <li>Price: <strong>{ regular ? info.regular_gas : info.premium_gas}</strong></li>
        </ul>
    </div>
  )
}

export default LocationInfoBox
import React from 'react'
import './LocationInfoBox.css'

function LocationInfoBox({ info}) {
  return (
    <div className='location-info'>
        <h2>Warehouse Info</h2>
        <ul>
            <li>Address: <strong>{ info.name }</strong></li>
        </ul>
    </div>
  )
}

export default LocationInfoBox
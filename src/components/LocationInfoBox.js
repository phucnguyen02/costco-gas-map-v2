import React from 'react'

function LocationInfoBox({ info }) {
  return (
    <div className='location-info'>
        <h2>Warehouse Info</h2>
        <ul>
            <li>Address: <strong>{ info.name }</strong></li>
            <li>Regular Gas: <strong>{ info.regular_gas}</strong></li>
            <li>Premium Gas: <strong>{ info.premium_gas}</strong></li>
        </ul>
    </div>
  )
}

export default LocationInfoBox
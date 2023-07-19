import React from 'react'
import { Icon } from '@iconify/react'

function LocationMarker({lat, lng, onClick}) {
  return (
    <div className='location-marker' onClick={onClick}>
        <Icon icon = "typcn:location" className='location-icon' />
    </div>
  )
}

export default LocationMarker
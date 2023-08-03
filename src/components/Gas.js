import {useState, useContext} from 'react'
import { RegularContext } from './RegularContext'
import Marker from './Marker'

function Gas({coords, map}){
    const [data, setData] = useState(coords);
    const {isRegular} = useContext(RegularContext);
    return (
        <>
            {
                data.map((elem, index) => (
                    <Marker key = {index} map = {map} position = {elem.position}>
                        <div className = 'marker'>
                            <h2>{isRegular ? elem.regular_gas : elem.premium_gas}</h2>
                        </div>
                    </Marker>
                ))
            }
        </>
    )
}

export default Gas;
import { useEffect, useState } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import axios from "axios";
import { RegularContext } from './components/RegularContext'
import { Wrapper } from '@googlemaps/react-wrapper'

const firebaseConfig = require('./firebaseConfig.json')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [coords, setCoords] = useState([])
  const [loading, setLoading] = useState(true)
  const [isRegular, setRegular] = useState(() => {
    const saved = localStorage.getItem("regular");
    const initialValue = JSON.parse(saved);
    return initialValue == null ? true : initialValue
  })

  useEffect(() => {
    async function getGeocode(location){
      let address = location.Address.split(" ").join("+")
      let city = location.City.split(" ").join("+")
      let state = location.State
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      const response = await axios.get(url)
      const data = response.data.results[0]
      const info = {
          name: data.formatted_address,
          position: {
              lat: data.geometry.location.lat,
              lng: data.geometry.location.lng
          },
          regular_gas: location.Regular_Gas,
          premium_gas: location.Premium_Gas
      }
      return info;
    }

    const fetchEvents = async () => {
      setLoading(true)
      const warehouseCol = collection(db, 'warehouses');
      const warehouseSnapshot = await getDocs(warehouseCol)
      const warehouseList = warehouseSnapshot.docs.map(doc => doc.data());
      setCoords(await Promise.all(warehouseList.map((location) => getGeocode(location))));
      setLoading(false)
    }
    
    fetchEvents()
  }, [])

  useEffect(() => {
    localStorage.setItem("regular", isRegular);
  }, [isRegular])

  return (
    <RegularContext.Provider value = { {isRegular, setRegular} }>
      <Header/>
      { !loading ? 
      <Wrapper apiKey = {process.env.REACT_APP_GOOGLE_MAPS_API_KEY} version = "beta" libraries = {["marker"]}>
        <Map coords = {coords} />
      </Wrapper> : 
      <Loader/>}
    </RegularContext.Provider>
  );
}

export default App;

import { useEffect, useState } from "react";
import Map from "./components/Map";
import Loader from "./components/Loader";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import axios from "axios";

const firebaseConfig = require('./firebaseConfig.json')
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [coords, setCoords] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getGeocode(location){
      let address = location.Address.split(" ").join("+")
      let city = location.City.split(" ").join("+")
      let state = location.State
      let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address},+${city},+${state}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
      const response = await axios.get(url)
      const data = response.data.results[0]
      const coordinates = {
          name: data.formatted_address,
          position: {
              lat: data.geometry.location.lat,
              lng: data.geometry.location.lng
          }
      }
      return coordinates;
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
  return (
    <div>
      { !loading ? <Map coords = {coords} /> : <Loader/>}
    </div>
  );
}

export default App;

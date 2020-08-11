import React,{useState,useEffect,useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import "mapbox-gl/dist/mapbox-gl.css";
require('dotenv').config()

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const MapboxGLMap = ()=>{
    const mapContainer = useRef(null)
    const [map, setMap] = useState(null);
    const [mapState,setMapState]=useState({
        lng: -74,
        lat: 40.72,
        zoom: 10.3
    })
    useEffect(()=>{
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN
        const initializeMap=({setMap,mapContainer})=>{
            const map = (new mapboxgl.Map(
                {
                    container: mapContainer.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [mapState.lng, mapState.lat],
                    zoom: mapState.zoom
                }
            ))
            map.on("load", () => {
                setMap(map);
                map.resize();
            });
        }
          if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[map])

    return(
        <div ref={el=>mapContainer.current=el} style={styles} />
    )
}

export default MapboxGLMap
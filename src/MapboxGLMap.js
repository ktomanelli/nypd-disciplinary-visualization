import React,{useState,useEffect,useRef} from 'react'
import mapboxgl from 'mapbox-gl';
import PolicePrecincts from './PolicePrecincts.json'

import "mapbox-gl/dist/mapbox-gl.css";
require('dotenv').config()

const styles = {
  width: "100vw",
  height: "calc(100vh - 80px)",
  position: "absolute"
};

const MapboxGLMap = (props)=>{

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
                const layers = map.getStyle().layers
                setMap(map);
                map.resize();
                PolicePrecincts.features.forEach(precinct=>{
                    // console.log(precinct)
                    const id = precinct.properties.precinct
                    map.addSource(`precinct-${id}`,{
                        type:'geojson',
                        data:precinct
                    })
                    map.addLayer({

                        //use ramp for style thing in here,
                        //only use 1 source/layer
                        id:`precincts-fill-${id}`,
                        'type': 'fill',
                        'source': `precinct-${id}`,
                        'layout': {},
                        'paint': {
                            'fill-color': getFillColor(id),
                            'fill-opacity': 0.4
                        }
                    })
                })
            });
        }
          if (!map) initializeMap({ setMap, mapContainer });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[map])

    const getFillColor=(id)=>{
    
        return '#ff3'
    }


    return(
        <div ref={el=>mapContainer.current=el} style={styles} />
    )
}

export default MapboxGLMap
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
        props.data.forEach(complaint=>{
            const precinct = complaint.precinct
            const increment = PolicePrecincts.features.find(precinctArea=>{
                if(precinctArea.properties.precinct===precinct){

                    return true}
            })
            if(increment){
                if(increment.properties.complaints){
                    increment.properties.complaints+=1
                }else{
                    increment.properties.complaints=1
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
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
                    // console.log(precinct)
                    map.addSource(`precincts`,{
                        type:'geojson',
                        data:PolicePrecincts
                    })
                    map.addLayer({
                        id:`precincts-fill`,
                        'type': 'fill',
                        'source': `precincts`,
                        'layout': {},
                        'paint': {
                            'fill-color': {
                                property: 'complaints',
                                stops: [
                                    [0, '#E8E3E3'],
                                    [100, '#EDDEDE'],
                                    [200, '#FAD1D1'],
                                    [300, '#FFCCCC'],
                                    [400, '#F0A8A8'],
                                    [500, '#FF9999'],
                                    [600, '#FF6666'],
                                    [700, '#FF3333'],
                                    [800, '#FF0000'],
                                    [900, '#CC0000'],
                                    [1000, '#990000'],
                                    [1100, '#660000'],
                                  ]
                            },
                            'fill-opacity': 0.6
                        }
                    })
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
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
    const r = 0
    const g = 128
    const b = 255
    const mapContainer = useRef(null)
    const [map, setMap] = useState(null);
    const [mapState,setMapState]=useState({
        lng: -74,
        lat: 40.72,
        zoom: 10.3
    })

    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
      
    function rgbToHex(r, g, b) {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
    }
    const getColors=(max)=>{
        const arr=[]
        for(let i=0;i<=max;i+=100){
            arr.push([i,rgbToHex(parseInt(i/100 * r/10), parseInt(i/100 * g/10), parseInt(i/100 * b/10))])
        }
        console.log(arr)
        return arr
    }

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
                                stops: getColors(1000)
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
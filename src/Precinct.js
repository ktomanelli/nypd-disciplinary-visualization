import React from 'react'

const Precinct = (props)=>{
    console.log('ayooo')
    props.map.addSource(`precinct-${props.id}`,{
        type:'geojson',
        data:props.precinct
    })
    props.map.addLayer({
        id:`precincts-fill-${props.id}`,
        'type': 'fill',
        'source': `precinct-${props.id}`,
        'layout': {},
        'paint': {
            'fill-color': getFillColor(props.id),
            'fill-opacity': 0.4
        }
    })

    const getFillColor=(id)=>{
        console.log(props)
        return '#ff3'
    }
    return <><p>ayo</p></>
}


export default Precinct
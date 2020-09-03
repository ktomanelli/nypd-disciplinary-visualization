import React,{useState,useEffect} from 'react';
import Papa from 'papaparse'

import MapboxGLMap from './MapboxGLMap'

const App=() => {

const [data,setData] = useState(null)
// const [precinctMap,setPrecintMap] = {}
useEffect(()=>{
  const pathToCsv=require('./propublica_ccrb.csv')
  Papa.parse(pathToCsv,{
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (result)=>setData(result.data)
  })
},[])
useEffect(()=>{
  data ? console.log(parseInt(data[0].command_at_incident.substr(0,3))) : console.log('data not loaded')
},[data])
  return (
    <div className="App">
      <h1>NYPD Complaint Visualization</h1>
      {data?<MapboxGLMap data={data}/>:''}
    </div>
  );
}

export default App;

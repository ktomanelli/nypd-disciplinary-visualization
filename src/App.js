import React,{useState,useEffect} from 'react';
import Papa from 'papaparse'

import MapboxGLMap from './MapboxGLMap'

const App=() => {

const [data,setData] = useState(null)
useEffect(()=>{
  const pathToCsv=require('./propublica_ccrb.csv')
  Papa.parse(pathToCsv,{
    header: true,
    download: true,
    skipEmptyLines: true,
    complete: (result)=>setData(result.data)
  })
},[])
  return (
    <div className="App">
      <h1>ayoo</h1>
      <MapboxGLMap />
    </div>
  );
}

export default App;

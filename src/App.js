import React,{useState,useEffect} from 'react';
import './App.css';
import Papa from 'papaparse'
// import csvdb from 'csv-database'

const App=() => {
  // const csvHeaders=[
  //   'unique_mos_id',	
  //   'first_name',	
  //   'last_name',	
  //   'command_now',	
  //   'complaint_id',	
  //   'month_received',	
  //   'year_received',	
  //   'month_closed',	
  //   'year_closed',	
  //   'command_at_incident',	
  //   'rank_abbrev_incident',	
  //   'rank_abbrev_now',	
  //   'rank_now',	
  //   'rank_incident',	
  //   'mos_ethnicity',	
  //   'mos_gender',	
  //   'mos_age_incident',	
  //   'complainant_ethnicity',	
  //   'complainant_gender',	
  //   'complainant_age_incident',	
  //   'fado_type',	
  //   'allegation',	
  //   'precinct',	
  //   'contact_reason',	
  //   'outcome_description',
  //   'board_disposition',
  // ]

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
      {console.log(data)}
    </div>
  );
}

export default App;

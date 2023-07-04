import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../Redux/Reducers/generalReducer';
import Navigation from './Navigation';  
import { DataGrid } from '@mui/x-data-grid';

import { data, query } from '../App.Config';




function Reference() {
   const user=useSelector((state)=>state.userReducer.user);
   const courses=useSelector((state)=>state.generalReducer.general.courses);
   const [courseArr, setcourseArr] = useState([...data.allcourse])
    const [searchTeerm, setsearchTeerm] = useState("");
    const {navigationFall, locked}=useSelector((state)=>state.displayReducer.display);
    let dispatch=useDispatch()
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_BACKEND}courses/`+user.campus+'').then((response)=>{
   
  if(response.data.success){
  
      dispatch(setCourse(response.data.data))
      
  }
  })
}, [])




 



  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,
   
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 250,
 
    },

    {
      field: 'department',
      headerName: 'Department',
      width: 150,
 
     
    },
    {
      field: 'level',
      headerName: 'Level',
      width: 150,
sortable:false,
filterable:false,

    },
  ];


useEffect(()=>{

  if(locked){
   navigate('/resume')}
 
 }, [locked])
useEffect(()=>{
  localStorage.setItem('last_page', location.hash)
  
  }, [])

  return (
    <>
      <Navigation active={'reference'} />
    <div className={navigationFall?'board fall':'board'}>
   
    <div className='container'>
    <br></br><br></br>
    <div className="row">
   
        <div className="col-sm-8">
          <div className='card padding'>
          <h4>
    Course Reference
</h4>
<h6>{user.institution}</h6>
          </div>

<div className='card shadow'>
  
    <div className="table-responsive" >
    
                  <div style={{ height: '420px' }}>
                    <DataGrid
                    rows={courses}
                      columns={columns}
                   
                      />
                  </div>

</div>
             
                

</div>
</div>
<div className="col-sm-3">
</div>
<div className="col-sm-3">
</div>
</div>
</div>
</div>
    </>
  )
}

export default Reference;
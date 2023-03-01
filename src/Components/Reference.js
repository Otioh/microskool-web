import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../Redux/Reducers/generalReducer';
import Navigation from './Navigation';


function Reference() {
   const user=useSelector((state)=>state.userReducer.user);
   const courses=useSelector((state)=>state.generalReducer.general.courses);
    const [searchTeerm, setsearchTeerm] = useState("");
    const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
    let dispatch=useDispatch()
useEffect(()=>{
  axios.get('http://192.168.43.31:5000/courses/'+user.campus+'').then((response)=>{
   
  if(response.data.success){
  
      dispatch(setCourse(response.data.data))
      
  }
  })
}, [])

  return (
    <>
      <Navigation active={'reference'} />
    <div className={navFall?'board fall':'board'}>
   
    <div className='container'>
    <br></br><br></br>
    <div className="row">
   
        <div className="col-sm-8">
          <div className='card padding'>
          <h4>
    Course Reference
</h4>
<h6>{user.institution}</h6>
          <input type="search" className={`form-control`} onChange={(e)=>{
    setsearchTeerm(e.target.value);
    
    }} placeholder="Search Course" />
          </div>

<div className='card shadow'>
  
    <div className="table-responsive" >
    <table className={`table table-light table-striped table-hover table-condensed `}>
<tbody>

        {courses.filter((course) => { if(searchTeerm==="" || searchTeerm.length<3){
            return null;
        }else if(course.title.toLowerCase().includes(searchTeerm.toLowerCase()) || course.code.toLowerCase().includes(searchTeerm.toLowerCase()) || course.department.toLowerCase().includes(searchTeerm.toLowerCase())){
return course;
        }
        else{
            return null;
        }
    }).map((course, key)=>{
        
       return <tr key={key}>
        <td>
        {course.code}
        </td>
        <td>
        {course.title}
        </td>
        <td>
        {course.department} Department
        </td>
        <td>
        {course.level} Level
        </td>
       
      </tr>
    })}
        
</tbody>
</table>
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
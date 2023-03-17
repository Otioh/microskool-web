import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { setAddPeriod, updateTimeTable } from '../Redux/Reducers/generalReducer';
import { setalert, setload } from '../Redux/Reducers/displayReducer';

import { useNavigate } from 'react-router-dom';




  function AddPeriod() {
    const courses=useSelector((state)=>state.generalReducer.general.courses);
    const myCourses=useSelector((state)=>state.generalReducer.general.myCourses);
    const user=useSelector((state)=>state.userReducer.user);
   
let navigate=useNavigate()
    let dispatch=useDispatch();
    const [time_in, setTime_In] = useState("")
    const [time_out, setTime_Out] = useState("")
    const [course, setCourse] = useState("")
    const [venue, setvenue] = useState("")
    const [day, setday] = useState("")
useEffect(()=>{
  dispatch(setalert({status:false, msg:'', type:'info'}))

},[])

    const savePeriod=()=>{
   
      if(time_in==="" || time_out==="" || course==="" || venue==="" || day===""){
        // message.warning("All Fields are required");
dispatch(setalert({status:true, msg:'All Fields are required', type:'danger', cap:'Error'}))
      }else{

        dispatch(updateTimeTable({day, course,time_in,time_out,venue, voted:'false', votetype:'', correct:0, wrong:0, user_email:user.email, user:user.first_name+" "+user.surname, id:Math.random(0,200)}))
dispatch(setAddPeriod(false))
dispatch(setalert({status:true, msg:'Added Succesfully', type:'success', cap:'Success'}))
//         axios.get(`https://microskool.com/app/saveperiod.php?email=${sessionStorage.getItem("session")}&&code=${Course}&&day=${day}&&timein=${Time_In}&&timeout=${Time_Out}&&venue=${venue}`).then((res)=>{
// if(res.data==="success"){
//   // message.success("Added Succesfully");
// }else{
//   // message.error(res.data);
// }
// })

    }

  
  }

 
   


  return (
    <div className='container'><div className='row'>
   
        <div className='col-sm-4'>
<div style={{display:'flex'}}>
        <select className={`form-select`}  onChange={(e)=>{
setCourse(e.target.value)
}} >
  <option>
    Select Course
  </option>
{
  myCourses.map((course, key)=>{
    return <option value={course.course} key={key}>
      {course.course}
    </option>
  })
}
</select>
<button className='btn' title='Edit Courses' onClick={()=>{
  navigate('/courses')
}}>
  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
</button>
</div>
        </div>
        <div className='col-sm-4' >
<select className={`form-control`} onChange={(e)=>{
setTime_In(e.target.value)
}} > 
    <option>
Time_In
    </option>
    <option value="7AM">7AM</option>
        <option value="8AM">8AM</option>
        <option value="9AM">9AM</option>
        <option value="10AM">10AM</option>
        <option value="11AM">11AM</option>
        <option value="12NOON">12NOON</option>
        <option value="1PM">1PM</option>
        <option value="2PM">2PM</option>
        <option value="3PM">3PM</option>
        <option value="4PM">4PM</option>
        <option value="5PM">5PM</option>
        <option value="6PM">6PM</option>
        <option value="7PM">7PM</option>
</select>
</div>
<div className='col-sm-4'>
<select className={`form-control`} onChange={(e)=>{
setTime_Out(e.target.value)
}} >
    <option>
Time_Out
    </option>
    <option value="7AM">7AM</option>
        <option value="8AM">8AM</option>
        <option value="9AM">9AM</option>
        <option value="10AM">10AM</option>
        <option value="11AM">11AM</option>
        <option value="12NOON">12NOON</option>
        <option value="1PM">1PM</option>
        <option value="2PM">2PM</option>
        <option value="3PM">3PM</option>
        <option value="4PM">4PM</option>
        <option value="5PM">5PM</option>
        <option value="6PM">6PM</option>
        <option value="7PM">7PM</option>
</select>
</div>
        </div>
        
        <div className='row'>
        <div className='col-sm-4'>
        <input className={`form-control`}  placeholder='Venue' onChange={(e)=>{
setvenue(e.target.value);
}} />
        </div>
        <div className='col-sm-4'>
        <select className={`form-control`} onChange={(e)=>{
setday(e.target.value)
}} >
    <option>
Day
    </option>
    <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thursday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
</select>
</div>
<div className='col-sm-4'>
<button className={`btn microskool-border`}  onClick={savePeriod} >
    <FontAwesomeIcon icon={faSave}/>
</button>
</div>
        </div>
        
        </div>
  )
}

export default AddPeriod
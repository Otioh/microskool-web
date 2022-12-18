import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { addAssignment, updateAssign } from '../Redux/Reducers/generalReducer';
import { setalert, setload } from '../Redux/Reducers/displayReducer';
import Alert from './Alert';


function AddAssignment() {
    const courses=useSelector((state)=>state.generalReducer.general.courses);
    const myCourses=useSelector((state)=>state.generalReducer.general.myCourses);
    const user=useSelector((state)=>state.userReducer.user);
       const alert=useSelector((state)=>state.displayReducer.display.alert)

    let dispatch=useDispatch();
    const [question, setquestion] = useState("")
    const [deadline, setdeadline] = useState("")
    const [course, setCourse] = useState("")
    const [lecturer, setlecturer] = useState("")
    const [image, setimage] = useState('');

useEffect(()=>{
  dispatch(setalert({status:false, msg:'', type:'info'}))

},[])

    const saveAssign=()=>{
   
      if(question==="" || deadline==="" || course==="" || lecturer==="" || image===""){
        // message.warning("All Fields are required");
dispatch(setalert({status:true, msg:'All Fields are required', type:'danger', cap:'Error'}))
      }else{

        dispatch(updateAssign({
          id:Math.random(0,100),
          question,
          date:new Date(),
          deadline,
          lecturer,
          user:user.email,
          image:'http://192.168.43.31:3000/static/media/twelve.87605878a6985f4c4e97.png',
          course
      }))
dispatch(addAssignment(false))
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
      <Alert msg={alert.msg} cap={alert.cap} status={alert.status}  type={alert.type} />
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
    return <option value={course} key={key}>
      {course}
    </option>
  })
}
</select>
<button className='btn'>
  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
</button>
</div>

        </div>
        <div className='col-sm-4' >
<input className={`form-control`} placeholder='Deadline' type='date' onChange={(e)=>{
setdeadline(e.target.value)
}} /> 

</div>
<div className='col-sm-4' >
<textarea className={`form-control`} placeholder='Question' type='text' onChange={(e)=>{
setquestion(e.target.value)
}} ></textarea> 

</div>
<div className='col-sm-4' >
<input className={`form-control`} placeholder='Lecturer Name' type='text' onChange={(e)=>{
setlecturer(e.target.value)
}} /> 
</div>


<div className='col-sm-4'>
  <label for='file'>
    Select Supporting Image
  </label>
<input className={`form-control`} id='file' type='file' onChange={(e)=>{
setimage(e.target.value)
}} />
    </div>
        </div>
        <div className='row'>
<div className='col-sm-4'>
<button className={`btn microskool-button`}  onClick={saveAssign} >
    <FontAwesomeIcon icon={faSave}/> Post
</button>
</div>
        </div>
        </div>
  )
}

export default AddAssignment;
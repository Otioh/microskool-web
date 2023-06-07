import React, { useState, useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faEdit, faFile, faTimes, faUser} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { addAssignment, setSecondUser, setaddAssignment, updateAssign } from '../Redux/Reducers/generalReducer';
import { setalert, setload, setspin } from '../Redux/Reducers/displayReducer';

import { useNavigate } from 'react-router-dom';


function AddAssignment() {
    const courses=useSelector((state)=>state.generalReducer.general.courses);
    const myCourses=useSelector((state)=>state.generalReducer.general.myCourses);
    const user=useSelector((state)=>state.userReducer.user);
       const alert=useSelector((state)=>state.displayReducer.display.alert)
let navigate=useNavigate()
    let dispatch=useDispatch();
    const [question, setquestion] = useState("")
    const [deadline, setdeadline] = useState("")
    const [course, setCourse] = useState("")
    const [lecturer, setlecturer] = useState("")
    const [file, setfile] = useState({});
    const [revFile, setrevFile] = useState(null)

useEffect(()=>{
  dispatch(setalert({status:false, msg:'', type:'info'}))

},[])

    const saveAssign=()=>{

      if(question==="" || deadline==="" || course==="" || lecturer==="" || file.filename==="" || revFile===null){
    
dispatch(setalert({status:true, msg:'All Fields are required', type:'danger', cap:'Error'}))
      }else{
        dispatch(setspin(true))
        const formData=new FormData()
        formData.append('file', file.file)
    
        axios.post(`${process.env.REACT_APP_BACKEND}postFile/${user.id}`, formData).then((res)=>{
          
        

})

        axios.post(`${process.env.REACT_APP_BACKEND}assignments`, { course, question, deadline, lecturer,filename:user.id+"*"+file.filename, file:file.file, campus:user.campus, filestat:"MiSB|"+file.filesize+"| -- Pages", user:user.email }).then((respons)=>{
          dispatch(setspin(false))
    dispatch(setaddAssignment(false))
            dispatch(setalert({ status: true, msg: respons.data.message, type: 'info', cap: 'Info' }))

})
     

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
<button className='btn' onClick={()=>{
  navigate('/courses')
}}>
  <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
</button>
</div>

        </div>
        <div className='col-sm-4' >
          <label>
            Deadline
          </label>
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
      <span className={` microskool-border`}>
       
        <FontAwesomeIcon icon={faFile} /> <label>Attach .misb</label> <input type='file' id='misb' accept='.misb' onChange={(e)=>{
          dispatch(setspin(true))
         const formData = new FormData()
       
          formData.append('file', e.target.files[0])

          axios.post(`${process.env.REACT_APP_BACKEND}file/${e.target.files[0].name}`, formData).then((res) => {
if(res.data.success){
  setrevFile(res.data.data)
  dispatch(setalert({ status: true, msg: "File Details Retrieved", type: 'info', cap: 'Info' }))
  dispatch(setspin(false))

}else{
  setrevFile(null)
  dispatch(setspin(false))
  dispatch(setalert({ status: true, msg: res.data.message, type: 'danger', cap: 'Error' }))
  document.getElementById('misb').value = null;
}
            })
          setfile({ filename: e.target.files[0].name, filesize: parseFloat(e.target.files[0].size/1000).toFixed(1)+"KB", file: e.target.files[0]})
        }} />

        {revFile ? <span><strong> {revFile?.title?.substring(0, 32)}</strong>...  <i>edited by </i> {revFile?.editorname}</span> : <></>} {revFile ? <a target='_blank' rel='noreferrer' href={'/#/user/'+revFile?.author} className='btn microskool-button' > <FontAwesomeIcon icon={faUser}></FontAwesomeIcon></a>:<></>}

        {revFile ? <button className='btn text-danger' onClick={() => {
          setrevFile(null)
  
          dispatch(setalert({ status: true, msg: "File Reset", type: 'info', cap: 'Info' }))
          document.getElementById('misb').value = null;

        }}> <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></button> : <></>}

</span>


        </div>
        <br/>
        <div className='row'>
<div className='col-sm-4'>

          <button className={`btn microskool-button`} onClick={saveAssign} >
   Post
</button>
</div>
        </div>
        </div>
  )
}

export default AddAssignment;
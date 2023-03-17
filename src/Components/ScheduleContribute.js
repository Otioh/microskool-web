import React, { useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faThumbsUp, faThumbsDown, faUser, faAdd, faClock, faSave} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navigation from './Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';

import { useNavigate } from 'react-router-dom';
import { correctVote, wrongVote , setAddPeriod} from '../Redux/Reducers/generalReducer';
import Modal from './Modal';
import AddPeriod from './AddPeriod';




function ScheduleContribute() {
  const user=useSelector((state)=>state.userReducer.user);
  const courses=useSelector((state)=>state.generalReducer.general.courses);
   const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
   const timeTable=useSelector((state)=>state.generalReducer.general.timeTable);
   let nvigate=useNavigate();
   const {addPeriod}=useSelector((state)=>state.generalReducer.general);
   const {alert, locked}=useSelector((state)=>state.displayReducer.display)
   const dispatch= useDispatch()
   useEffect(()=>{
    localStorage.setItem('last_page', location.hash)
    
    }, [])
    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
    
const closePop=()=>{

  dispatch(setAddPeriod(false))
}
   
const setRoll=()=>{
dispatch(setalert({status:true, cap:'Welcome', type:'info', msg:'Any Period that receives more Wrong Votes than Correct Votes would be removed from schedule'}))
}
  useEffect(() => {
    setRoll()  
    return () => {
   
    }
  },[] )

  return (
    <>
      <Navigation active={'schedule'} />
    <div className={navFall?'board fall':'board'}>
    <div className='container'>
      <br/>
      <button onClick={()=>{
       nvigate('/schedule')
       dispatch(setAddPeriod(false))
      }} className='btn'>
      <FontAwesomeIcon icon={faBackward} />  Back
      </button><br/><br/>
      <div className="title">
       <h4>Daily Periods </h4>
</div>
<div className='row'>
 
  <div className='col-sm-6'>
    <button className={`btn microskool-border`} style={{margin:"5px"}} onClick={()=>{
dispatch(setAddPeriod(true))
    }}>
    <FontAwesomeIcon icon={faAdd} /> Add

    </button>
  <ul className={`list-group bg-secondary`}>
  { addPeriod?<Modal config={{align:'flex-end', justify:'right'}} body={<AddPeriod/>} header={'Add Period'} footer={<button className='btn-close' onClick={()=>{closePop()}} ></button> } />:<></>}

  {timeTable.map((period, key)=>{
return   <>     <li  className={`list-group-item d-flex justify-content-between align-items-center`}>
          <b className={`list-group-item-text `}>{period.course}</b>
          <text>
            {period.time_in} - {period.time_out} <br/>{period.venue}
          </text>
         <text>
          <FontAwesomeIcon icon={faClock} /> {period.day.substring(0,3)}
         </text>
        </li>

<span className={`inner`} style={{display:"inline", marginBottom:"5px", backgroundColor:'whitesmoke'}}>
<button className='btn' style={period.voted==="true" && period.votetype==="correct"? {color:"rgb(83,83,170)"}:{}} onClick={()=>{
  dispatch(correctVote(period.id));
  dispatch(setalert({status:true, type:'success', msg:'Voted', cap:'Success'}))
      axios.get(`https://microskool.com/app/voteperiod.php?email=${sessionStorage.getItem("session")}&&id=${period.id}&&vote=correct`).then((res)=>{
if(res.data==="success"){
  dispatch(setalert({status:true, type:'success', msg:'Voted', cap:'Success'}))
}else{
  dispatch(setalert({status:true, type:'danger', msg:res.data, cap:'Error'}));
}
})               }}>
         <FontAwesomeIcon icon={faThumbsUp} /> {period.correct}
        </button>
        <button className='btn' style={period.voted==="true" && period.votetype==="wrong"? {color:"rgb(83,83,170)"}:{}} onClick={()=>{
   dispatch(wrongVote(period.id));
   dispatch(setalert({status:true, type:'success', msg:'Voted', cap:'Success'}))
axios.get(`https://microskool.com/voteperiod.php?email=${sessionStorage.getItem("session")}&&id=${period.id}&&vote=wrong`).then((res)=>{
  if(res.data==="success"){
    dispatch(setalert({status:true, type:'success', msg:'Voted', cap:'Success'}))
  }else{
    dispatch(setalert({status:true, type:'danger', msg:res.data, cap:'Error'}));}
})
          
          }}>
         <FontAwesomeIcon icon={faThumbsDown} /> {period.wrong}
        </button>
        <i style={period.user_email===user.email?{color:"rgb(83,83,170)", float:"right", cursor:'pointer'}:{color:"gray", float:"right", cursor:'pointer'}} onClick={()=>{period.user_email===user.email? (function(){nvigate('/profile')})():(function (email){})(period.user_email)}}>
 <FontAwesomeIcon  icon={faUser} /> {period.user_email===user.email?" You": period.user.substring(0,9)}...
 </i> 
        </span>
 </>
  })
}

</ul>
  </div>
</div>
    </div>
    </div>
    </>  
  )
}
export default ScheduleContribute;
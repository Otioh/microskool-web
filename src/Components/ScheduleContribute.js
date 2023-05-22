import React, { useEffect,useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faThumbsUp, faThumbsDown, faUser, faAdd, faClock, faSave} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Navigation from './Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';

import { useNavigate } from 'react-router-dom';
import { correctVote, wrongVote , setAddPeriod, setSecondUser, setCorrectCount,  setWrongCount} from '../Redux/Reducers/generalReducer';
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
   let navigate=useNavigate()
   useEffect(()=>{
    localStorage.setItem('last_page', location.hash)
   
axios
  .get(`${process.env.REACT_APP_BACKEND}votes/user/`+user.email)
  .then((resp) => {
resp.data.data.forEach((id)=>{
  if (id.type === "correct"){
dispatch(correctVote(parseInt(id.subject_id)));
  }else{ dispatch(wrongVote(parseInt(id.subject_id)));
  }

})

  });

    }, [])

    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
    
const closePop=()=>{

  dispatch(setAddPeriod(false))
}
   
const setRoll=()=>{
dispatch(setalert({status:true, cap:'Welcome', type:'info', msg:'Any Period that receives more thumbs down than thumbs up would be removed from schedule'}))
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
return (
  <>
    {" "}
    <li
      className={`list-group-item d-flex justify-content-between align-items-center`}
    >
      <b className={`list-group-item-text `}>{period.course}</b>
      <text>
        {period.time_in} - {period.time_out} <br />
        {period.venue}
      </text>
      <text>
        <FontAwesomeIcon icon={faClock} /> {period.day.substring(0, 3)}
      </text>
    </li>
    <span
      className={`inner`}
      style={{
        display: "inline",
        marginBottom: "5px",
        backgroundColor: "whitesmoke",
      }}
    >
      <button
        className="btn"
        style={
          period.voted === "true" && period.votetype === "correct"
            ? { color: "rgb(83,83,170)" }
            : {}
        }
        onClick={() => {
          axios
            .post(`${process.env.REACT_APP_BACKEND}votes`, {
              subject: "schedule",
              subject_id: period.id,
              type: "correct",
              user: user.email,
              campus: user.campus,
              department: user.department,
              level: user.level,
            })
            .then((res) => {
              if (res.data.success) {
                dispatch(
                  setalert({
                    status: true,
                    type: "success",
                    msg: "Voted",
                    cap: "Success",
                  })
                );
                dispatch(correctVote(period.id));
              } else {
                dispatch(
                  setalert({
                    status: true,
                    type: "danger",
                    msg: res.data.message,
                    cap: "Error",
                  })
                );
              }
            });
        }}
      >
        <FontAwesomeIcon icon={faThumbsUp} /> {period.correct}
      </button>
      <button
        className="btn"
        style={
          period.voted === "true" && period.votetype === "wrong"
            ? { color: "brown" }
            : {}
        }
        onClick={() => {
          axios
            .post(`${process.env.REACT_APP_BACKEND}votes`, {
              subject: "schedule",
              subject_id: period.id,
              type: "wrong",
              user: user.email,
              campus: user.campus,
              department: user.department,
              level: user.level,
            })
            .then((res) => {
              if (res.data.success) {
                dispatch(
                  setalert({
                    status: true,
                    type: "success",
                    msg: "Voted",
                    cap: "Success",
                  })
                );
                dispatch(wrongVote(period.id));
              } else {
                dispatch(
                  setalert({
                    status: true,
                    type: "danger",
                    msg: res.data.message,
                    cap: "Error",
                  })
                );
              }
            });
        }}
      >
        <FontAwesomeIcon icon={faThumbsDown} /> {period.wrong}
      </button>
      <i
        style={
          period.user === user.email
            ? { color: "rgb(83,83,170)", float: "right", cursor: "pointer" }
            : { color: "gray", float: "right", cursor: "pointer" }
        }
        onClick={() => {
          period.user === user.email
            ? (function () {
                nvigate("/profile");
              })()
            : (function (email) {
                dispatch(setSecondUser(email));
                navigate("/user-profile");
              })(period.user);
        }}
      >
        <FontAwesomeIcon icon={faUser} />{" "}
        {period.user === user.email ? " You" : period.user.substring(0, 5)}...
      </i>
    </span>
  </>
);
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
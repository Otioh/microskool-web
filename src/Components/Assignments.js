import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import { setAssignments, setViewAssignment, setaddAssignment } from '../Redux/Reducers/generalReducer';
import AddAssignment from './AddAssignment';
import { faAdd, faBook, faBookOpen, faCoins, faDownLong, faDownload, faEye, faThumbsUp, faTimes, faWarning } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import DropMenu from './DropMenu';
import { useStepContext } from '@mui/material';
import axios from 'axios';


function Assignments() {
   let dispatch = useDispatch();
   let navigate = useNavigate();
  const user=useSelector((state)=>state.userReducer.user);
  const courses=useSelector((state)=>state.generalReducer.general.courses);
  const assignments=useSelector((state)=>state.generalReducer.general.assignments);
const [seachterm, setseachterm] = useState('')


useEffect(()=>{
axios.get("http://localhost:5000/assignments/unical").then((res)=>{
  if(res.data.success){
    res.data.data.forEach((ass)=>{
    
    })
dispatch(setAssignments(res.data.data));
  }
  
});
}, [])



    const [anchorEl, setAnchorEl] = useState(null);
       const [anchorElWarn, setAnchorElWarn] = useState(null);
  const open = Boolean(anchorEl);
    const openWarn = Boolean(anchorElWarn);
  const handleClick = (event) => {
       setAnchorEl(event.currentTarget);
  };
    const handleClickWarning = (event) => {
      setAnchorElWarn(event.currentTarget);
    };
  
  const handleClose = () => {
    setAnchorEl(null);
  };
    const handleCloseWarn = () => {
      setAnchorElWarn(null);
    };

  const handleNextAction=()=>{
navigate('/editor')
  }


   const { navigationFall, locked, navFall } = useSelector(
     (state) => state.displayReducer.display
   );
   const [assign, setAssign]=useState({question:'', image:'', course:'', deadline:'', lecturer:''});
   const {viewAssignment, addAssignment}=useSelector((state)=>state.generalReducer.general);
  const closePop=()=>{
    dispatch(setViewAssignment(false))
  }
const closePopAss=()=>{
  dispatch(setaddAssignment(false))
}
useEffect(()=>{

  if(locked){
   navigate('/resume')}
 
 }, [locked])
useEffect(()=>{
  localStorage.setItem('last_page', location.hash)
  
  }, [])
 
  return (
    <>
      <Navigation active={"assignment"} />
      <div className={navFall ? "board fall" : "board"}>
        {addAssignment ? (
          <Modal
            config={{ align: "flex-end", justify: "right" }}
            body={<AddAssignment />}
            header={`Post New Assignment`}
            footer={
              <button
                className="btn-close"
                onClick={() => {
                  closePopAss();
                }}
              ></button>
            }
          />
        ) : (
          <></>
        )}

        <br />
        <input
          className="form-control"
          style={{ width: "200px", float: "right" }}
          placeholder="Search Assignment"
          type="search"
          onChange={(e) => {
            setseachterm(e.target.value);
          }}
        />
        <button
          className="btn microskool-button"
          onClick={() => {
            dispatch(setaddAssignment(true));
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New{" "}
        </button>


        <div className='row'>
<div className='col-sm-6'>
<div className='card'>
<div className='card-header'>
<span className='title'>
Assignments for you 
</span> {user.first_name} 
<button  className="btn microskool-border" onClick={()=>{
dispatch(setaddAssignment(true))
}}>
    <FontAwesomeIcon icon={faAdd} />  New 
</button>
</div>
<div className='card-body'>
<div className='assignment-list'>
<ul className='list-group '>

{
  assignments.map((assignment, key)=>{
    return <li key={key} style={{cursor:'pointer'}} className='list-group-item d-flex justify-content-between align-items-center' onClick={()=>{
navigate('/viewer')
    }}>
    <img style={{width:'50px', height:'50px', borderRadius:'17px'}} src={assignment.image} alt={assignment.course} />
    <span>  {
        assignment.course
      }</span>

    <span>  {
        assignment.question.substring(0,12)
      }....</span>

      <span>
        {assignment.deadline}
      </span>
      <span>
        {
          assignment.lecturer
        }
      </span>
    </li>
  })
}

</ul>


</div>


</div>
</div>
</div>
        </div>
        { viewAssignment?<Modal config={{align:'flex-end', justify:'right'}} body={<div className='container'><div className='card'> {assign.question} <i>Assignment By: {assign.lecturer}</i> </div><img src={assignments[0].image}  alt={assignments[0].course} /></div>} header={`${assign.course} Assignment to be submitted ${assign.deadline}`} footer={<button className='btn-close' onClick={()=>{closePop()}} ></button> } />:<></>}
        { addAssignment?<Modal config={{align:'flex-end', justify:'right'}} body={<AddAssignment/>} header={`Post New Assignment`} footer={<button className='btn-close' onClick={()=>{closePopAss()}} ></button> } />:<></>}

        </div>
     

      </div>
    </>
  );
}

export default Assignments;
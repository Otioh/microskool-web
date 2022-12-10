import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import { setViewAssignment, setaddAssignment } from '../Redux/Reducers/generalReducer';
import AddAssignment from './AddAssignment';
import { faAdd } from '@fortawesome/free-solid-svg-icons';


function Assignments() {
  const user=useSelector((state)=>state.userReducer.user);
  const courses=useSelector((state)=>state.generalReducer.general.courses);
  const assignments=useSelector((state)=>state.generalReducer.general.assignments);
   const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
   const [assign, setAssign]=useState({question:'', image:'', course:'', deadline:'', lecturer:''});
   const {viewAssignment, addAssignment}=useSelector((state)=>state.generalReducer.general);
  const closePop=()=>{
    dispatch(setViewAssignment(false))
  }
const closePopAss=()=>{
  dispatch(setaddAssignment(false))
}

  let dispatch =useDispatch();
  return (
    <div>
      <Navigation active={'assignment'} />
      <div className={navFall?'board fall':'board'}>
<div className='container'>


        <div className='row'>
<div className='col-sm-6'>
<div className='card'>
<div className='card-header'>
<span className='title'>
Assignments for you 
</span> {user.first_name} <a href='/#/profile'> Edit your [{courses.length}] courses</a>
</div>
<div className='card-body'>
<div className='assignment-list'>
<ul className='list-group '>

{
  assignments.map((assignment, key)=>{
    return <li key={key} style={{cursor:'pointer'}} className='list-group-item d-flex justify-content-between align-items-center' onClick={()=>{
setAssign({...assign, image:assignment.image, course:assignment.course, deadline:assignment.deadline, lecturer:assignment.lecturer})    
      dispatch(setViewAssignment(true))
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
        <button style={{position:"fixed", bottom:"6%", right:"2%", zIndex:"200"}} className="btn microskool-border" onClick={()=>{
dispatch(setaddAssignment(true))
}}>
    <FontAwesomeIcon icon={faAdd} />  New Assignment
</button>

      </div>
    </div>
  )
}

export default Assignments;
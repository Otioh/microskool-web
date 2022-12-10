import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowAltCircleLeft, faDashboard, faBookOpen, faVideoCamera, faClock, faCalculator, faListAlt, faUser, faSearch, faGear, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import MicroskoolIcon from '../Images/micro.png';
import {toggleNavFall} from '../Redux/Reducers/displayReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Navigation({active}) {
    const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
const dispatch= useDispatch();
let navigate=useNavigate();
  return (
    <div className={navFall?'navigation shadow fall':'navigation shadow'}>
        <div>
<div className='menu-icon'>
<img alt='logo' src={MicroskoolIcon}/>
</div>
     <text className={navFall?'item-text title fall':'item-text title'}> Microskool</text>
     { navFall?<button className='no-btn navbtn' onClick={()=>{
        dispatch(toggleNavFall());
     }}>
        <FontAwesomeIcon icon={faArrowAltCircleRight}></FontAwesomeIcon>
     </button>:
     <button className='no-btn navbtn' onClick={()=>{
        dispatch(toggleNavFall());
     }}>
        <FontAwesomeIcon icon={faArrowAltCircleLeft}></FontAwesomeIcon>
     </button>
}
      </div>
   
<hr/>
<div>
<div className={active==='search'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/search')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'} >
Search
</div>
</div>



<div className={active==='dashboard'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/dashboard')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faDashboard}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Dashboard
</div>
</div>


<div className={active==='lectures'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/lectures')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Lectures
</div>
</div>



<div className={active==='assignment'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/assignment')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Assignments
</div>
</div>



<div className={active==='schedule'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/schedule')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Schedule
</div>
</div>



<div className={active==='calculator'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/calculator')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faCalculator}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Calculator
</div>
</div>


<div className={active==='reference'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/reference')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Reference
</div>
</div>


<div className={active==='profile'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/profile')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Profile
</div>
</div>



<div className={active==='settings'?`menu-item active`:`menu-item`} onClick={()=>{
    navigate('/settings')
}}>
<div className='menu-icon'>
    <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
</div>
<div className={navFall?'item-text fall':'item-text'}>
Settings
</div>
</div>
</div>



    </div>
  )
}

export default Navigation

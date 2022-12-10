import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faDashboard, faBookOpen,  faBookAtlas, faVideoCamera, faClock, faCalculator, faListAlt, faUser,faCoins, faSearch, faGear } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import Navigation from './Navigation';
import { useDispatch, useSelector } from 'react-redux';
import { funSeque } from 'flame-tools';
import { useNavigate } from 'react-router-dom';
import { setEdit } from '../Redux/Reducers/generalReducer';


function Dashboard() {
   const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
   const user=useSelector((state)=>state.userReducer.user);
   let navigate=useNavigate();
   let dispatch=useDispatch()
if(user.institution===''||user.department===''||user.level===''){
   funSeque({delaySeconds:1}, ()=>{

   },
   
   ()=>{
      navigate('/profile')
   },
   ()=>{
dispatch(setEdit(true))
   }
   )
}
  return (
    <>
    <Navigation active={'dashboard'} />
    <div className={navFall?'board fall':'board'}>

   
    <div className='container'>
        <Alert status={true} type='info' msg={`to your Dashboard`} cap={`Welcome`} />


<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
<span className='icon'> <span className='icon'>  <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon></span></span>
Lectures 
</div>
<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
<span className='icon'> <span className='icon'>  <FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon></span></span>
Assignments
</div>
<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faBookAtlas}></FontAwesomeIcon></span>
Past Questions
</div>
<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faClock}></FontAwesomeIcon></span>
Lecture Schedule
</div>


<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faCalculator}></FontAwesomeIcon></span>
GPA Calculator
</div>

<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon></span>
Course Reference
</div>

<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon></span>
Profile
</div>


<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon></span>
Earnings
</div>

<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faGear}></FontAwesomeIcon></span>
Settings
</div>

<div className='card shadow grid-menu' style={{height:'105px', width:'105px'}}>
   <span className='icon'>  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></span>
Search
</div>
</div>
    </div>
    
    </>
  )
}

export default Dashboard

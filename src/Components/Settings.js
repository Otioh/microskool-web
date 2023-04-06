import React, { useEffect, useState} from 'react';

import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faGear, faDisplay, faBell, faUserGear, faEdit, faCheck, faWarning, faQuestion, faDownload, faKey} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import Alert from './Alert';



function Settings() {
  const [theme, settheme] = useState('light');
const [dark, setdark] = useState(false);
const {navigationFall, locked}=useSelector((state)=>state.displayReducer.display);
useEffect(()=>{
  localStorage.setItem('last_page', location.hash)
  
  }, [])
  useEffect(()=>{

    if(locked){
     navigate('/resume')}
   
   }, [locked])
useEffect(() => {
  if(dark===true){
    settheme('dark')
  }else{
    settheme('light')
  }
  axios.get(`https://microskool.com/api/server/settheme.php?email=${sessionStorage.getItem("session")}&&theme=${theme}`).then((res)=>{

})

}, [theme, dark])



  return (
    <>
     <Navigation active={'settings'} />
    <div className={navigationFall?'board fall':'board'}>
    <div className='container'>
      <Alert cap={'Settings'} msg={'Customize your settings'} status={true} type={'info'}/>
<div className='row'>

<div className="col-sm-5">
<div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card shadow padding ${theme}`}>
<div className='card-title'>
<div style={{marginBottom:"15px"}}>
<h6>Language</h6>
<label>
  English
</label><span style={{float:"right"}}>
<input type='radio' className='form-check' checked /></span>
</div></div>
<div className='card-footer'>
<i className='tag'> <h > <FontAwesomeIcon icon={faGear} /> General Settings </h></i>
</div>
</div>
  </div>

  <div className="col-sm-5">
<div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card padding shadow ${theme}`}>
<div className='card-title'>
<h6>Account Status</h6>
Activate <span style={{float:"right"}}><button className="btn btn-outline-secondary"> <FontAwesomeIcon icon={faCheck} onClick={()=>{

}} /> </button></span>
<br/><br/>
<h6>Password</h6>
Change Password <span style={{float:"right"}}><button className="btn btn-outline-secondary" onClick={()=>{

}} > <FontAwesomeIcon icon={faKey} /> </button></span>

</div>
<div className='card-footer'>

 <i className='tag'> <h > <FontAwesomeIcon icon={faUserGear} /> Security/Account Settings </h></i>
</div>
</div>
  </div>

  <div className="col-sm-5">
<div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card  padding shadow ${theme}`}>
<div className='card-title'>
<div style={{marginBottom:"15px"}}>
<h6>Notification Medium</h6>
<label>
  E-Mails
</label><span style={{float:"right"}}>
<input type='checkbox' className='form-control form-check form-check-input' checked /></span>
<br/>
<label>
  SMS
</label><span style={{float:"right"}}>
<input className='form-control form-check form-check-input' type='checkbox' checked /></span>

<br/>
<label>
  Push 
</label><span style={{float:"right"}}>
<input className='form-control form-check form-check-input' type='checkbox' checked /></span>
<br/><br/>
<h6>Notification Frequency</h6>
<label>
  Regular
</label><span style={{float:"right"}}>
<input type='radio' checked /></span>
<br/>
<label>
  Daily
</label><span style={{float:"right"}}>
<input type='radio'  /></span>

<br/>
<label>
  Weekly 
</label><span style={{float:"right"}}>
<input type='radio'  /></span>

</div>
</div>

<div className='card-footer'>

 <i className='tag'> <h > <FontAwesomeIcon icon={faBell} /> Notification Settings </h></i>
</div>
</div>
  </div>

  <div className="col-sm-5">
<div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card padding shadow ${theme}`}>
<div className='card-title'><> 
<div style={{marginBottom:"15px"}}>
<h6>Theme</h6>
Toggle Dark Mode <span style={{float:"right"}}>{dark===true?<input className=' form-switch form-switch-input' type='checkbox' defaultChecked onChange={()=>{
setdark(!dark);
}} />:<input className='form-switch' type='checkbox' onChange={()=>{
  setdark(!dark);
  }} />} </span>
</div>
<div style={{marginBottom:"15px"}}>
<h6>Side Navigation</h6>
Always Fall Navigation Bar (Default) <span style={{float:"right"}}><input className='form-control form-check form-check-input' type='checkbox' defaultChecked onChange={()=>{

}} /></span>

</div>
</></div>
<div className='card-footer'>
 <i className='tag'> <h > <FontAwesomeIcon icon={faDisplay} /> Appearance Settings </h></i>
</div>
</div>
  </div>

  <div className="col-sm-5">
<div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card padding shadow ${theme}`}>
<div className='card-title'>
<div style={{marginBottom:"15px"}}>
<h6>Feedback</h6>
Report a problem <span style={{float:"right"}}><button className="btn btn-outline-secondary"> <FontAwesomeIcon icon={faWarning} /> </button></span>
</div>
</div>
<div className='card-footer'>
 <i className='tag'> <h > <FontAwesomeIcon icon={faGear} /> Support </h></i>
</div>
</div>
  </div>

    <div className='col-sm-5'>
    <div style={{border:"solid 2px lightgray", boxShadow:"none"}} className={`card padding shadow ${theme}`}>
<div className='card-title'>
<h6>About Microskool</h6>
                  &copy; Microskool 2023 --- version 3.0.0 -- Click to Install <span style={{ float: "right" }}><a target="__blank" href="http://microskool.com/downloads" className="btn btn-outline-secondary"><FontAwesomeIcon icon={faDownload} /> </a></span>
</div>
<br/>
<div className='card-footer'>
 <i className='tag'> <h > <FontAwesomeIcon icon={faGear} /> Powered by <a href="https://firsta.com.ng/" target="__blank">Firsta</a> </h></i>
</div>
</div>
    </div>
</div>
    </div>
</div>
    </>
  )
}

export default Settings;
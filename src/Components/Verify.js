import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';
import { funSeque } from 'flame-tools';

function Verify({email}) {
  let navigate=useNavigate();
  let dispatch=useDispatch();
 const [code, setCode]= useState('');
 const alert=useSelector((state)=>state.displayReducer.display.alert)
  const verify=()=>{
    axios.post('http://192.168.43.31:5000/auth/'+email, {code}).then((response)=>{
      if(response.data.success){
        funSeque({delaySeconds:2},()=>{
          dispatch(setalert({...alert, status:true, type:'success', msg:response.data.message}))
      }, ()=>{
        navigate('/dashboard')
      } )
       
      }else{
        dispatch(setalert({...alert, status:true, type:'danger', msg:response.data.message}))
      }
    })
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-sm-4'>

        </div>
        <div className='col-sm-4'>
 
        <div className='card shadow'>
        <div className='card-header'>
Email Confirmation
        </div>
        <div className='card-body'>
Enter Code sent to your email (<strong>{email}</strong>):
<input type='text' value={code} placeholder='Enter Code' className='form-control' onChange={(e)=>{
  setCode(e.target.value);
  dispatch(setalert({...alert, status:false}))

}} />
        </div>
        <div className='card-footer'>
<button className='btn microskool-button' onClick={()=>{
if(code===''){
dispatch(setalert({...alert, status:true, cap:'Error', type:'danger', msg:"Verification Code can't be empty"}))

}else{
  verify()
}
 
}}>
  <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Verify
</button>
        </div>

      </div>
  
        </div>
        <div className='col-sm-4'>

        </div>

      </div>
        </div>
  )
}

export default Verify

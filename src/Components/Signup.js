import React, { useState , useEffect} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MicroskoolIcon from '../Images/micro.png';
import {faLock,  faUserLock} from '@fortawesome/free-solid-svg-icons';

import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { funSeque } from 'flame-tools';
import { useDispatch, useSelector } from 'react-redux';
import { setalert, setload } from '../Redux/Reducers/displayReducer';



function Signup() {
    let dispatch=useDispatch();
    const alert=useSelector((state)=>state.displayReducer.display.alert)
   const [email, setEmail]= useState("");
   const [password, setpassword] = useState("");
   const [first_name, setfirst_name] = useState("");
   const [surname, setsurname] = useState("");
   const [phone, setphone] = useState("");
   const [matric, setmatric] = useState("");
   const [passwordConfirm, setpasswordConfirm] = useState("");
   useEffect(() => {
        return () => {
       dispatch(setalert({...alert, status:false, type:'info'}))
    };
}, [email, password, first_name, surname, phone, matric, passwordConfirm]);

let navigate=useNavigate();

const process=()=>{
if(password===passwordConfirm){



    axios.post(`${process.env.REACT_APP_BACKEND}users`, {email,password, first_name, surname, phone, matric}).then((response)=>{

    if(response.data.success){
        funSeque({delaySeconds:2}, ()=>{
        dispatch(setalert({...alert, cap:'Congrats', status:true, type:'success', msg:response.data.message}))
},
()=>{

    navigate('/login');
}
)
}else{
    dispatch(setalert({...alert, status:true,  type:'danger',cap:'Error', msg:response.data.message}))
}
    

    })

}else{
    dispatch(setalert({...alert, status:true,  type:'danger',cap:'Error', msg:'Password Mismatched'}))
}
}

 
  return (
    <>

<div className='mother centered'>
    <div className='card shadow margin'>
<div className='card-header'>
    <img alt='Logo' className='microskool-icon' src={MicroskoolIcon} />
<text style={{float:"right"}} className='microskool-title'>
Create Account
</text>
</div>
<div className='card-body'>


<input type='text' className='form-control' value={first_name} placeholder='First Name' onChange={(e)=>{
setfirst_name(e.target.value)
}} />

<input type='text' className='form-control' value={surname} placeholder='Surname' onChange={(e)=>{
setsurname(e.target.value)
}} />


<input type='text' className='form-control' value={matric} placeholder='Matric No' onChange={(e)=>{
setmatric(e.target.value)
}} />


<input type='tel' className='form-control' value={phone} placeholder='WhatsApp Phone' onChange={(e)=>{
setphone(e.target.value)
}} />



<input type='email' className='form-control' value={email} placeholder='E-Mail' onChange={(e)=>{
setEmail(e.target.value)
}} />



<input type='password' className='form-control' value={password} placeholder='Password ' onChange={(e)=>{
setpassword(e.target.value)
}} />



<input type='password' className='form-control' value={passwordConfirm} placeholder='Confirm Password ' onChange={(e)=>{
setpasswordConfirm(e.target.value)
}} />

</div>
<div className='card-footer'>

<button className='btn microskool-button' onClick={process}>
        <FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon> Sign Up
        </button>
        <Link to='/login'>
        <button className='btn microskool-outline-button'>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login?
        </button>   
</Link>
</div>
    </div>

</div>

    </>
  )
}

export default Signup

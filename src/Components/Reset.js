import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MicroskoolIcon from '../Images/micro.png';
import {faLock, faKey, faUserLock, faEye} from '@fortawesome/free-solid-svg-icons';

import {updateUser} from '../Redux/Reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { funSeque} from 'flame-tools';
import { useSelector, useDispatch} from 'react-redux';
import { setalert, setload, setspin } from '../Redux/Reducers/displayReducer';

import {Modal, ModalHeader, ModalBody, ModalTitle, ModalFooter} from 'react-bootstrap';

function Reset() {
 
 const dispatch= useDispatch()
const user  = useSelector((state)=>{
return state.userReducer.user;
   })
   const alert=useSelector((state)=>state.displayReducer.display.alert)
   const [modal, setmodal] = useState(false)
   const [email, setEmail]= useState("");
   const [password, setpassword] = useState()
const [code, setcode] = useState('')
const [confirm, setconfirm] = useState("")

let navigate=useNavigate();
let next='/synch';


    const handlePasswordChange=(e)=>{
        e.preventDefault();
        dispatch(setspin(true));
        axios.post(`${process.env.REACT_APP_BACKEND}reset`, { email, currentPassword:code, code, newPassword:password }).then((response) => {

            if (response.data.success) {


                dispatch(setalert({ status: true, cap: 'Password Reset', type: 'success', msg: response.data.message }))


                dispatch(setspin(false))
                setmodal(false)



            } else {

                dispatch(setalert({ status: true, type: 'danger', cap: 'Error', msg: response.data.message }))
                dispatch(setspin(false))
            }


        })
    }



const processes=  ()=>{
    dispatch(setspin(true))
 let ss=false;
    axios.get(`${process.env.REACT_APP_BACKEND}reset/${email}`).then((response)=>{

    if(response.data.success){

        
        dispatch(setalert({status:true,cap:'Password Reset', type:'success', msg:response.data.message}))

      
        dispatch(setspin(false))
setmodal(true)



}else{

    dispatch(setalert({ status:true,  type:'danger',cap:'Error', msg:response.data.message}))
    dispatch(setspin(false))
}
    

    }).then(()=>{
        ss=true
    })
return ss;
  
}

useEffect(() => {
    

    return () => {

        dispatch(setalert({ status:false, type:'info'}))
    };
}, [email, password]);

  return (
    <>
<Modal show={modal} animation={true} autoFocus={true} backdrop={true} onHide={()=>{
setmodal(!modal)
}} keyboard={true} onEscapeKeyDown={
    ()=>{
        setmodal(!modal)
    }
} >
<ModalHeader>
    <ModalTitle>
        Change Password
    </ModalTitle>
</ModalHeader>
<ModalBody>
    <form onSubmit={handlePasswordChange}>

    <input required className='form-control' placeholder='Confirm. Code or Current Password' onChange={(e)=>{
        setcode(e.target.value);
    }} />
                      <input className='form-control' type='password' placeholder='New Password' required onChange={(e) => {
                          setpassword(e.target.value);
                      }} />
                      <input className='form-control' type='password' placeholder='Confirm Password' required onChange={(e) => {
                          setconfirm(e.target.value);
                      }} />
<button className='btn microskool-button'>
    Change
</button>
    </form>
</ModalBody>

</Modal>
<div className='mother centered'>
    <div className='card shadow margin'>
<div className='card-header'>
    <img alt='Logo' className='microskool-icon' src={MicroskoolIcon} />
<text style={{float:"right"}} className='microskool-title'>
Reset
</text>
</div>
<div className='card-body'>


<input type='email' className='form-control' value={email} placeholder='E-Mail' onChange={(e)=>{
setEmail(e.target.value)
}} />
</div>
<div className='card-footer'>

<button className='btn microskool-button' onClick={()=>{
                          funSeque({ isPromise: true }, processes)
}}>
        <FontAwesomeIcon icon={faKey}></FontAwesomeIcon> Reset
        </button>
        <button className='btn microskool-outline-button' onClick={()=>{
    navigate('/login')
}}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login?
        </button>   

</div>
    </div>

</div>

    </>
  )
}

export default Reset

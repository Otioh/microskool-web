import React, { useState, useEffect } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import MicroskoolIcon from '../Images/micro.png';
import {faLock, faKey, faUserLock, faEye} from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import {updateUser} from '../Redux/Reducers/userReducer';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { funSeque} from 'flame-tools';
import { useSelector, useDispatch} from 'react-redux';
import { setalert, setload, setspin } from '../Redux/Reducers/displayReducer';



function Login() {
 
 const dispatch= useDispatch()
const user  = useSelector((state)=>{
return state.userReducer.user;
   })
   const alert=useSelector((state)=>state.displayReducer.display.alert)
   
   const [email, setEmail]= useState(user.email);
   const [password, setpassword] = useState(user.password)
let navigate=useNavigate();
useEffect(()=>{
    if(sessionStorage.getItem('email')!==null){
      
    navigate('/synch')
    }
})
let next='/synch';
const  verified= ()=>{
  dispatch(setspin(true))
    let neu=false;
        axios.get('http://192.168.43.31:5000/auth/'+email).then((response)=>{
            console.log(response.data.data);
            if(response.data.success){
                dispatch(setalert({ status:true, type:'success',cap:'Success', msg:"Authentication Completed"}));
            neu=true;
           
           }else{
          
            dispatch(setalert({ status:true, type:'danger', msg:"Verify your email to continue"}));
          
            next='/verifymail';
           }
            
        }) 
return neu;
        
}


useEffect(()=>{

    if(sessionStorage.getItem('email')==="" || sessionStorage.getItem('email')===null){
     
    }else{
        navigate('/login')
    }
  }, [])
  




const process=  ()=>{
 let ss=false;
    axios.post('http://192.168.43.31:5000/auth', {email,password}).then((response)=>{

    if(response.data.success){
    funSeque({delaySeconds:2, isPromise:false},()=>{
dispatch(updateUser(response.data.data[0]))
sessionStorage.setItem('email', email)
    },
     ()=>{
        
        dispatch(setalert({status:true,cap:'Email Verification', type:'danger', msg:response.data.message}))

        dispatch(setalert({ cap:'Congrats', status:true, type:'success', msg:response.data.message}))
        dispatch(setspin(false))
    return true
   
},
()=>{

},
()=>{

    navigate(next);
}

)
}else{

    dispatch(setalert({ status:true,  type:'danger',cap:'Error', msg:response.data.message}))
    dispatch(setload(false))
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

<div className='mother centered'>
 
    <div className='card shadow margin'>
<div className='card-header'>
    <img alt='Logo' className='microskool-icon' src={MicroskoolIcon} />
<text style={{float:"right"}} className='microskool-title'>
Login
</text>
</div>
<div className='card-body'>
<Alert msg={alert.msg} cap={alert.cap} type={alert.type} status={alert.status} />

<input type='email' className='form-control' value={email} placeholder='E-Mail' onChange={(e)=>{
setEmail(e.target.value)
}} />
<span style={{display:'flex'}}>
<input type='password' id='password'  className='form-control' value={password} placeholder='Password ' onChange={(e)=>{
setpassword(e.target.value)
}} /><button style={{outline:0, border:'none'}} className='btn' id='btn' onClick={()=>{
document.getElementById('password').type='text';
document.getElementById('btn').disabled=true
}}  ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></button>
</span>
</div>
<div className='card-footer'>

<button className='btn microskool-button' onClick={()=>{
     funSeque({delaySeconds:2,isPromise:true},verified,process)
}}>
        <FontAwesomeIcon icon={faLock}></FontAwesomeIcon> Login
        </button>
<br/>
<button className='btn microskool-outline-button' onClick={()=>{
    navigate('/reset')
}}>
        <FontAwesomeIcon icon={faKey}></FontAwesomeIcon> Reset Password
        </button>   
<Link to='/signup'>

        <button className='btn microskool-outline-button'>
        <FontAwesomeIcon icon={faUserLock}></FontAwesomeIcon> Sign Up
        </button>   
        </Link>

</div>
    </div>

</div>

    </>
  )
}

export default Login

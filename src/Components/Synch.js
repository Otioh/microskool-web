import axios from 'axios';
import { cl, funSeque } from 'flame-tools';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon from '../Images/micro.png'; 
import { setCourse } from '../Redux/Reducers/generalReducer';

function Synch() {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    const user=useSelector((state)=>state.userReducer.user);
    
    useEffect(()=>{
      

        axios.get('http://192.168.43.31:5000/users/'+sessionStorage.getItem('email')+'').then((response)=>{

        if(response.data.success){
    dispatch(updateUser(response.data.data[0]))
        }
        
})

axios.get('http://192.168.43.31:5000/courses/'+user.campus+'').then((response)=>{
   
if(response.data.success){

    dispatch(setCourse(response.data.data))
    
}
})
    }, [])
    funSeque({delaySeconds:5}, ()=>{

    }, 
    ()=>{
      
navigate('/dashboard')
    })
  return (
    <div className='container'  style={{backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', height:'100vh'}}>

        <div style={{display:'flex', alignItems:'center', justifyContent:'center', width:'100px', height:'100px', padding:'20px', backgroundColor:'whitesmoke', borderRadius:'50%'}}>


<img alt='Logo' style={{width:'90px'}} src={icon} />
</div>
      </div>
   
  )
}

export default Synch

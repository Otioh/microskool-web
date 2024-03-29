import axios from 'axios';
import { cl, funSeque } from 'flame-tools';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import icon from '../Images/micro.png'; 
import { setCourse, setMyCourses, setTimeTable } from '../Redux/Reducers/generalReducer';
import { updateUser } from '../Redux/Reducers/userReducer';
import { data } from '../App.Config';

function Synch() {
    let dispatch=useDispatch();
    let navigate=useNavigate();
    const user=useSelector((state)=>state.userReducer.user);


    
    useEffect(()=>{
      
      // dispatch(updateUser(data.users[0]))
      axios.get(`${process.env.REACT_APP_BACKEND}users/`+localStorage.getItem('email')+'').then((response)=>{

        if(response.data.success){
    dispatch(updateUser(response.data.data[0]))
  
        }
        
})

      // dispatch(setMyCourses(data.mycourses))
      axios.get(`${process.env.REACT_APP_BACKEND}mycourses/`+localStorage.getItem('email')+'').then((response)=>{

if(response.data.success){
dispatch(setMyCourses(response.data.data))
}

})

      // dispatch(setMyCourses(data.mycourses))
      axios
        .get(
          `${process.env.REACT_APP_BACKEND}schedules/` +
            localStorage.getItem("campus") +
            "/" +
            localStorage.getItem("department") +
            "/" +
            localStorage.getItem("level")
        )
        .then((response) => {
          if (response.data.success) {
            dispatch(setTimeTable(response.data.data));
          }
        });


      // dispatch(setCourse(data.allcourse))
      axios.get(`${process.env.REACT_APP_BACKEND}courses/`+user.campus+'').then((response)=>{
   
if(response.data.success){

    dispatch(setCourse(response.data.data))
    
}
})
    }, [])
    funSeque({delaySeconds:5}, ()=>{

    }, 
    ()=>{
      if(localStorage.getItem('last_page')!==null && localStorage.getItem('last_page')!=='#/login' && localStorage.getItem('last_page')!=='#/resume'){
location.hash=localStorage.getItem('last_page')
      }else{
        navigate('/dashboard')
      }
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


import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setload } from '../Redux/Reducers/displayReducer';
import { updateUser } from '../Redux/Reducers/userReducer';
import axios from 'axios';
import {funSeque} from 'flame-tools';
import { setCourse } from '../Redux/Reducers/generalReducer';

function Loader({load}) {
  const {edit, logout}=useSelector((state)=>state.generalReducer.general);
  let dispatch=useDispatch();

  const user=useSelector((state)=>state.userReducer.user);
  
  useEffect(()=>{
   
    if(sessionStorage.getItem('email')!==null){
    funSeque({delaySeconds:3, isPromise:false}, 
      ()=>{
        axios.get('http://192.168.43.31:5000/users/'+sessionStorage.getItem('email')+'').then((response)=>{

        if(response.data.success){
    dispatch(updateUser(response.data.data[0]))
        }
        
  })
      },
      ()=>{


        axios.get('http://192.168.43.31:5000/courses/'+user.campus+'').then((response)=>{
          console.log(response.data)
         if(response.data.success){
         
           dispatch(setCourse(response.data.data))
           dispatch(setload(false))
         }
         })
      }
      
      )

    }
  }, [])
  


  return (
    <div style={load===true?{height:'100vh',width:'100vw', position:'fixed', zIndex:'200', backgroundColor:'rgba(255,255,255,0.6)',display:'flex',alignItems:'center', justifyContent:'center' }:{display:'none'}}>
    <button className='btn-close' onClick={()=>{
dispatch(setload(false))
    }}>
      
    </button>
    <div className='spinner-border text-primary'>
      
    </div>
    </div>
  )
}

export default Loader

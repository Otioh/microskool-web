
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setalert, setload } from '../Redux/Reducers/displayReducer';
import { updateUser } from '../Redux/Reducers/userReducer';
import axios from 'axios';
import {funSeque} from 'flame-tools';
import { setCourse, setMyCourses, setNetwork, setTimeTable } from '../Redux/Reducers/generalReducer';
import { data } from '../App.Config';

function Loader({load}) {
  const {edit, logout}=useSelector((state)=>state.generalReducer.general);
  let dispatch=useDispatch();

  const user=useSelector((state)=>state.userReducer.user);
  
  useEffect(()=>{

    if(localStorage.getItem('email')!==null){
    funSeque({delaySeconds:1, isPromise:false}, 
      ()=>{
        dispatch(updateUser({email:localStorage.getItem('email') ,
        phone:localStorage.getItem('phone') ,
        matric:localStorage.getItem('matric') ,
        department:localStorage.getItem('department') ,
        level:localStorage.getItem('level') ,
        institution:localStorage.getItem('institution') ,
        first_name:localStorage.getItem('first_name') ,
        surname:localStorage.getItem('surname') ,
        campus:localStorage.getItem('campus'), 
        coins:parseFloat(localStorage.getItem('coins')) ,
        image:localStorage.getItem('image'),
        password:localStorage.getItem('password')
  
      }))


      },
      ()=>{
        axios.get('http://192.168.43.31:5000/users/'+localStorage.getItem('email')+'').then((response)=>{

        if(response.data.success){
    dispatch(updateUser(response.data.data[0]))

        }
        
  })



      },
      ()=>{


        // dispatch(setMyCourses(data.mycourses))

         axios.get('http://192.168.43.31:5000/mycourses/'+localStorage.getItem('email')).then((response)=>{

         if(response.data.success){
         
           dispatch(setMyCourses(response.data.data))
         
         }
         })


        // dispatch(setMyCourses(data.mycourses))
        axios
          .get(
            "http://192.168.43.31:5000/schedules/" +
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
   
      },
      ()=>{
     
        setTimeout(() => {
          // dispatch(setCourse(data.allcourse))
          axios.get('http://192.168.43.31:5000/courses/'+user.campus).then((response)=>{

          if(response.data.success){
          
            dispatch(setCourse(response.data.data))
          
          }
          })
        }, 5000);
    
        dispatch(setload(false));
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

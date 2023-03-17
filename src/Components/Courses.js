import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import twelve from '../Images/twelve.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera, faBook, faGear, faSearch, faTimes, faCheck, faAdd } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { updateUser } from '../Redux/Reducers/userReducer';

import { setCourse, setEdit, setLogout, setMyCourses, setaddCourse } from '../Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import UploadPix from './UploadPix';
import axios from 'axios';
import { setalert, setload } from '../Redux/Reducers/displayReducer';
import { ProcessManager } from '../Process';



function Courses() {
  const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
  const user=useSelector((state)=>state.userReducer.user);
  const { addCourse, uploadPix, myCourses, network}=useSelector((state)=>state.generalReducer.general);
 
  const courses=useSelector((state)=>state.generalReducer.general.courses);
  const [pereson, setPerson]=useState({...user});
  const [campuses, setcampuses] = useState([]);
  const {alert, locked}=useSelector((state)=>state.displayReducer.display)
  useEffect(()=>{
    localStorage.setItem('last_page', location.hash)
    
    }, [])
    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
  const [searchTeerm, setsearchTeerm] = useState("");
  const [departments, setdepartments] = useState([]);
  let added=false;
  let dispatch=useDispatch()
  let navigate=useNavigate();
const [level, setlevel] = useState('');
const [department, setdepartment] = useState('');
const [code, setcode] = useState('');
const [title, settitle] = useState('');



const createCourse=({code, title, department, level})=>{

  if(network){
    axios.post('http://192.168.43.31:5000/courses/', {code, title, campus:user.campus, department, level, user:user.email}).then((res)=>{
      if(res.data.success){
        dispatch(setalert({...alert, msg:res.data.message, type:'success', status:true, cap:'Success'}))
        dispatch(setaddCourse(false))
      }
      else{
        dispatch(setalert({...alert, msg:res.data.message, type:'danger', status:true, cap:'Error'}))
      }
    })
  }else{
  let feedback='';
  feedback=ProcessManager.addProcess(
        ()=>{
      axios.post('http://192.168.43.31:5000/courses/', {code, title, campus:user.campus, department, level, user:user.email}).then((res)=>{
        if(res.data.success){
          dispatch(setalert({...alert, msg:res.data.message, type:'success', status:true, cap:'Success'}))
        }
        else{
          dispatch(setalert({...alert, msg:res.data.message, type:'danger', status:true, cap:'Error'}))
        }
      })

}
        )

        dispatch(setalert({...alert, msg:feedback, type:'bad_network', status:true, cap:'Processor'}))
        dispatch(setaddCourse(false))
       
}
}


const postCourse=()=>{
  axios.post('http://192.168.43.31:5000/courses/', {code, title, campus:user.campus, department, level, user:user.email}).then((response)=>{

  })
}
useEffect(()=>{
dispatch(setalert({...alert, msg:'Select the courses for the Semester as features/services depends on your courses', cap:'Info', status:true, type:'info'}))


}, [])

  useEffect(()=>{
    axios.get('http://192.168.43.31:5000/courses/'+user.campus+'').then((response)=>{
     
    if(response.data.success){
    
        dispatch(setCourse(response.data.data))
        
    }
    })
    axios.get('http://192.168.43.31:5000/departments').then((response)=>{
  if(response.data.success){
    setdepartments(response.data.data)
  }
})
  })

  
  return (
    <div>
       <Navigation active={'profile'} />
    <div className={navFall?'board fall':'board'}>
   <div className='container'>
<div className='row'>
  <div className='col-sm-12'>
<div className='card shadow'>
<div className='card-header'>
  <div className='title'>
<FontAwesomeIcon icon={faBook}></FontAwesomeIcon>  Edit Courses
  </div>
</div>
<div className='card-body'>

<div className='row'>
<div className='col-sm-3'>
    <ul className=' list-group'>
        <h6>Selected Semester Courses [{myCourses.length  }]</h6>
{myCourses.map((course, key)=>{

        return <li key={key} className='list-group-item d-flex justify-content-between align-items-center'>
<strong>{course.course}</strong>
<button className='btn text-danger' onClick={()=>{
  if(network){
    axios.delete('http://192.168.43.31:5000/mycourses/'+course.id).then((response)=>{
      if(response.data.success){
        dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
     
      }else{
        dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
     
      } 
     
      axios.get('http://192.168.43.31:5000/mycourses/'+localStorage.getItem('email')).then((response)=>{

      if(response.data.success){
      
        dispatch(setMyCourses(response.data.data))
      
      }
      
      })

  })
  }else{
 dispatch(setalert({...alert, msg: ProcessManager.addProcess(()=>{
  axios.delete('http://192.168.43.31:5000/mycourses/'+course.id).then((response)=>{
    if(response.data.success){
      dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
   
    }else{
      dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
   
    }    
  axios.get('http://192.168.43.31:5000/mycourses/'+localStorage.getItem('email')).then((response)=>{

      if(response.data.success){
      
        dispatch(setMyCourses(response.data.data))
      
      }
   
     
      })

  })

}), type:'bad_network', status:true, cap:'Processor'}))
}

 



}}> <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> </button>
        </li>

    })
}
</ul>
    </div>



    <div className='col-sm-9'>
    { addCourse?<Modal config={{align:'flex-end', justify:'right'}} header={'Create a New Course'} body={<>
<div className='row'>

  <div className='col-sm-6'>
<input className='form-control' placeholder='Course Code' onChange={(e)=>{
setcode(e.target.value)

        }} />
  </div>

  <div className='col-sm-6'>
  <select  className='form-select' onChange={(e)=>{
setlevel(e.target.value)
        }}>
       <option>Select level</option>
        <option value='100'>
          100
        </option>
        <option value='200'>
          200
        </option>
        <option value='300'>
          300
        </option>
        <option value='400'>
          400
        </option>

        <option value='500'>
          500
        </option>
        </select>

  </div>

  <div className='col-sm-6'>
<input className='form-control' placeholder='Course Title' onChange={(e)=>{
settitle(e.target.value)
        }} />
  </div>

  <div className='col-sm-6'>
  <select  className='form-select' onChange={(e)=>{
setdepartment(e.target.value)
        }}>
          <option>Select department</option>
            {
  departments.map((departmen)=>{
return    <option value={`${departmen.name}`}>
   {`${departmen.name}`}
    </option>
  })
}

        </select>

     
  </div>
  </div>
      </>} footer={<><button className='btn microskool-button' onClick={()=>{
   
      createCourse({code, title, department, level})}}>Add</button><button className='btn-close' onClick={()=>dispatch(setaddCourse(false))}></button></>} />:<></>}



<span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> <input type={'search'} placeholder={' Search Courses ['+courses.length+']'} className=' form-control-plaintext' onChange={(e)=>{
    setsearchTeerm(e.target.value);
    
    }}/>
    <button className='btn microskool-button' title='New Course' onClick={()=>{

     dispatch(setaddCourse(true))
     dispatch(setalert({...alert, msg:'Ensure you do not enter misleading information into Microskool system to avoid account suspension.', cap:'Warning', status:true, type:'warning'}))

    }}> <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> </button>
</span>
<ul className=' list-group' style={{height:'60vh',fontSize:'small', overflow:'auto'}}>
{courses.filter((course) => { if(searchTeerm===""){
            return course;
        }else if(course.title.toLowerCase().includes(searchTeerm.toLowerCase()) || course.code.toLowerCase().includes(searchTeerm.toLowerCase()) || course.department.toLowerCase().includes(searchTeerm.toLowerCase())){
return course;
        }
        else{
            return null;
        }
    }).map((course, key)=>{
added=false;
myCourses.forEach((cur)=>{
    if(course.code===cur.course){
      added=true;
    }
})
        return <li key={key} className='list-group-item d-flex justify-content-between align-items-center'>
<strong>{course.code}</strong>
<span>{course.title}</span>
<span>{course.department}</span>
{
  added?<button className='btn text-success'><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>: <button className='btn text-microskool' onClick={()=>{

    if(network){
    axios.post('http://192.168.43.31:5000/mycourses', {user:user.email, code:course.code}).then((response)=>{
    if(response.data.success){
      dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
   
    }else{
      dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
   
    } 
    axios.get('http://192.168.43.31:5000/mycourses/'+localStorage.getItem('email')).then((response)=>{

        if(response.data.success){
        
          dispatch(setMyCourses(response.data.data))
        
        }
        })
    })}
    else{
     dispatch(setalert({...alert, msg:ProcessManager.addProcess(
      ()=>{
      axios.post('http://192.168.43.31:5000/mycourses', {user:user.email, code:course.code}).then((response)=>{
      if(response.data.success){
        dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
     
      }else{
        dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
     
      }    
     axios.get('http://192.168.43.31:5000/mycourses/'+localStorage.getItem('email')).then((response)=>{

        if(response.data.success){
        
          dispatch(setMyCourses(response.data.data))
        
        }
  
       
        })
    })})
        
        , type:'bad_network', status:true, cap:'Processor'}))

    }
}} >Add</button>
}
        </li>
 
    }) 
}
</ul>

    </div>

 

</div>


</div>
<div className='card-footer'>


      


<button className='btn btn-outline-secondary' title='Profile' onClick={()=>{
navigate('/profile')
}}><FontAwesomeIcon icon={faUser}></FontAwesomeIcon> </button>
<button className='btn btn-outline-secondary' title='Settings' onClick={()=>{
  navigate('/settings')
}}><FontAwesomeIcon icon={faGear}></FontAwesomeIcon> </button>


</div>
</div>
  </div>



</div>
   </div>
      </div>
    </div>
  )
}

export default Courses
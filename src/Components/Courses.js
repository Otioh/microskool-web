import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import twelve from '../Images/twelve.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera, faBook, faGear, faSearch, faTimes, faCheck, faAdd } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { updateUser } from '../Redux/Reducers/userReducer';

import { setCourse, setEdit, setLogout, setMyCourses, setUploadPix } from '../Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import UploadPix from './UploadPix';
import axios from 'axios';
import { setload } from '../Redux/Reducers/displayReducer';



function Courses() {
  const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
  const user=useSelector((state)=>state.userReducer.user);
  const {edit, logout, uploadPix, myCourses}=useSelector((state)=>state.generalReducer.general);
  const courses=useSelector((state)=>state.generalReducer.general.courses);
  const [pereson, setPerson]=useState({...user});
  const [campuses, setcampuses] = useState([]);
  const [searchTeerm, setsearchTeerm] = useState("");
  const [departments, setdepartments] = useState([]);
  let added=false;
  let dispatch=useDispatch()
  let navigate=useNavigate();

  useEffect(()=>{
    axios.get('http://192.168.43.31:5000/courses/'+user.campus+'').then((response)=>{
     
    if(response.data.success){
    
        dispatch(setCourse(response.data.data))
        
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
        <h6>Selected Semester Courses</h6>
{myCourses.map((course, key)=>{

        return <li key={key} className='list-group-item d-flex justify-content-between align-items-center'>
<strong>{course.course}</strong>
<button className='btn text-danger' onClick={()=>{
    axios.delete('http://192.168.43.31:5000/mycourses/'+course.id).then((response)=>{
        axios.get('http://192.168.43.31:5000/mycourses/'+sessionStorage.getItem('email')).then((response)=>{

        if(response.data.success){
        
          dispatch(setMyCourses(response.data.data))
        
        }
        })

    })

}}> <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon> </button>
        </li>

    })
}
</ul>
    </div>



    <div className='col-sm-9'>
<span style={{display:'flex', justifyContent:'center', alignItems:'center'}}>    <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon> <input type={'search'} placeholder={' Search Courses'} className=' form-control-plaintext' onChange={(e)=>{
    setsearchTeerm(e.target.value);
    
    }}/>
    <button className='btn btn-primary' title='New Course'> <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> </button>
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
  added?<button className='btn text-success'><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></button>: <button className='btn text-primary' onClick={()=>{
 
    axios.post('http://192.168.43.31:5000/mycourses', {user:user.email, code:course.code}).then((response)=>{
        axios.get('http://192.168.43.31:5000/mycourses/'+sessionStorage.getItem('email')).then((response)=>{

        if(response.data.success){
        
          dispatch(setMyCourses(response.data.data))
        
        }
        })
    })
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
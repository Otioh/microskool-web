import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUser, faBook, faGear, faSearch, faTimes, faCheck, faAdd, faTrash, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';

import { DataGrid } from '@mui/x-data-grid';
import { setCourse, setEdit, setLogout, setMyCourses, setaddCourse } from '../Redux/Reducers/generalReducer';

import axios from 'axios';
import { setalert, setload, setspin } from '../Redux/Reducers/displayReducer';
import { ProcessManager } from '../Process';
import { data } from '../App.Config';
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import OpenIcon from "@mui/icons-material/ViewColumn";
import DownlaodIcon from "@mui/icons-material/Edit"; 
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

function Courses() {
  const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
  const user=useSelector((state)=>state.userReducer.user);

  const { addCourse, uploadPix, myCourses, network}=useSelector((state)=>state.generalReducer.general);
  const [courseArr, setcourseArr] = useState([])
  const courses=useSelector((state)=>state.generalReducer.general.courses);
  const [pereson, setPerson]=useState({...user});
  const [campuses, setcampuses] = useState([]);
  const {alert, locked}=useSelector((state)=>state.displayReducer.display)
  const [courseHodler, setCourseHolder]= useState({})

  const [ added, setAdded ] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {

    setAnchorEl(null);
  };

  const selectComponents=(id)=>{ 
   setCourseHolder(id)
    setAdded(false)
    myCourses.forEach((cur) => {
      if (id.code === cur.course) {
     
        setAdded(true)
      }
    })
   
  }

  useEffect(()=>{
    localStorage.setItem('last_page', location.hash)
    
    }, [])


  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'code',
      headerName: 'Code',
      width: 150,

    },
    {
      field: 'title',
      headerName: 'Title',
      width: 150,

    },

    {
      field: 'department',
      headerName: 'Department',
      width: 150,


    },
    {
      field: 'level',
      headerName: 'Level',
      width: 150,
      filterable: false,
      sortable: false,

    },
    {
      field: "action",
      headerName: "Actions",
      filterable:false,
      sortable:false,
      renderCell: () => (
        <div>
          <button className='btn text-microskool' 
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            
          >
            <MoreVertOutlinedIcon/>
          </button>
         
        </div>
      ),
    },
  ];



    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
  const [searchTeerm, setsearchTeerm] = useState("");
  const [departments, setdepartments] = useState([]);
  
  let dispatch=useDispatch()
  let navigate=useNavigate();
const [level, setlevel] = useState('');
const [department, setdepartment] = useState('');
const [code, setcode] = useState('');
const [title, settitle] = useState('');



const createCourse=({code, title, department, level})=>{

  if(network){
    axios.post(`${process.env.REACT_APP_BACKEND}courses/`, {code, title, campus:user.campus, department, level, user:user.email}).then((res)=>{
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
      axios.post(`${process.env.REACT_APP_BACKEND}courses/`, {code, title, campus:user.campus, department, level, user:user.email}).then((res)=>{
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
  axios.post(`${process.env.REACT_APP_BACKEND}courses/`, {code, title, campus:user.campus, department, level, user:user.email}).then((response)=>{

  })
}
useEffect(()=>{
dispatch(setalert({...alert, msg:'Select the courses for the Semester as features/services depends on your courses', cap:'Info', status:true, type:'info'}))


}, [])

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_BACKEND}courses/`+user.campus+'').then((response)=>{
     
    if(response.data.success){
    
        dispatch(setCourse(response.data.data))
        
    }
    })
    axios.get(`${process.env.REACT_APP_BACKEND}departments`).then((response)=>{
  if(response.data.success){
    setdepartments(response.data.data)
  }
})
  }, [])

  
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
    dispatch(setspin(true))
    axios.delete(`${process.env.REACT_APP_BACKEND}mycourses/`+course.id).then((response)=>{
      if(response.data.success){
        dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
     
      }else{
        dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
     
      } 
     
      axios.get(`${process.env.REACT_APP_BACKEND}mycourses/`+localStorage.getItem('email')).then((response)=>{

      if(response.data.success){
      
        dispatch(setMyCourses(response.data.data))
        dispatch(setspin(false))
      }
      
      })

  })
  }else{
 dispatch(setalert({...alert, msg: ProcessManager.addProcess(()=>{
  axios.delete(`${process.env.REACT_APP_BACKEND}mycourses/`+course.id).then((response)=>{
    if(response.data.success){
      dispatch(setalert({...alert, msg:response.data.message, type:'success', status:true, cap:'Success'}))
   
    }else{
      dispatch(setalert({...alert, msg:response.data.message, type:'danger', status:true, cap:'Error'}))
   
    }    
  axios.get(`${process.env.REACT_APP_BACKEND}mycourses/`+localStorage.getItem('email')).then((response)=>{

      if(response.data.success){
      
        dispatch(setMyCourses(response.data.data))
      
      }
   
     
      })

  })

}), type:'bad_network', status:true, cap:'Processor'}))
}

 



}}> <FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon> </button>
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



<span style={{display:'flex', justifyContent:'center', alignItems:'center'}}> 
    <button className='btn microskool-button' title='New Course' onClick={()=>{

     dispatch(setaddCourse(true))
     dispatch(setalert({...alert, msg:'Ensure you do not enter misleading information into Microskool system to avoid account suspension.', cap:'Warning', status:true, type:'warning'}))

    }}> <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> </button>
</span>


                        <div style={{ height: '420px' }}>
                          <DataGrid
                            rows={courses}
                            columns={columns}
                          onRowClick={(rows) => { selectComponents(rows.row) }}

                          />
                          <Menu
                            id="demo-positioned-menu"
                            aria-labelledby="demo-positioned-button"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                            transformOrigin={{
                              vertical: 'top',
                              horizontal: 'left',
                            }}
                          >
                            

                          {added ? <button className='btn text-success'> <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon> Added</button>:<MenuItem onClick={(event)=>{



                         

                                  if (network) {
                                    dispatch(setspin(true))
                                    axios.post(`${process.env.REACT_APP_BACKEND}mycourses`, { user: user.email, code: courseHodler.code }).then((response) => {
                                    handleClose(event)  
                                    if (response.data.success) {
                                        dispatch(setalert({ ...alert, msg: response.data.message, type: 'success', status: true, cap: 'Success' }))

                                      } else {
                                        dispatch(setalert({ ...alert, msg: response.data.message, type: 'danger', status: true, cap: 'Error' }))

                                      }
                                      axios.get(`${process.env.REACT_APP_BACKEND}mycourses/` + localStorage.getItem('email')).then((response) => {

                                        if (response.data.success) {

                                          dispatch(setMyCourses(response.data.data))
                                          dispatch(setspin(false))

                                        }
                                      })
                                    })
                                  }
                                  else {
                                    handleClose(event)  
                                    dispatch(setalert({
                                      ...alert, msg: ProcessManager.addProcess(
                                        () => {
                                          axios.post(`${process.env.REACT_APP_BACKEND}mycourses`, { user: user.email, code: course.code }).then((response) => {
                                            if (response.data.success) {
                                              dispatch(setalert({ ...alert, msg: response.data.message, type: 'success', status: true, cap: 'Success' }))

                                            } else {
                                              dispatch(setalert({ ...alert, msg: response.data.message, type: 'danger', status: true, cap: 'Error' }))

                                            }
                                            axios.get(`${process.env.REACT_APP_BACKEND}mycourses/` + localStorage.getItem('email')).then((response) => {

                                              if (response.data.success) {

                                                dispatch(setMyCourses(response.data.data))

                                              }


                                            })
                                          })
                                        })

                                      , type: 'bad_network', status: true, cap: 'Processor'
                                    }))

                                  }
                                
                              

                            }}>

                              <OpenIcon
                                sx={{ fontSize: "18px", color: 'rgb(83,83,170)' }}
                              />
                              Add

                            </MenuItem>
                           } <MenuItem onClick={handleClose}>


                              <DownlaodIcon
                                sx={{ fontSize: "18px", color: 'rgb(83,83,170)' }}
                              />
                              Edit

                            </MenuItem>
                          </Menu>
                        </div>


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
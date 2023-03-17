import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import twelve from '../Images/twelve.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera, faMoneyBill, faBoxOpen, faBarsProgress, faLock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { updateUser } from '../Redux/Reducers/userReducer';
import { setEdit, setLogout, setTransactions, setUploadPix } from '../Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import UploadPix from './UploadPix';
import axios from 'axios';
import { ProcessManager } from '../Process';
import { setalert, setLocked } from '../Redux/Reducers/displayReducer';






function Profile() {
  const {navigationFall,locked}=useSelector((state)=>state.displayReducer.display);
  const user=useSelector((state)=>state.userReducer.user);
  const {edit, logout, uploadPix, myCourses, network, transactions}=useSelector((state)=>state.generalReducer.general);
  const [pereson, setPerson]=useState({...user});
  const [campuses, setcampuses] = useState([]);
  const [departments, setdepartments] = useState([]);
  
  let dispatch=useDispatch()
  let navigate=useNavigate();
  useEffect(()=>{
    localStorage.setItem('last_page', location.hash)
    
    }, [])
    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
  useEffect(()=>{
axios.get('http://192.168.43.31:5000/campuses').then((response)=>{
  if(response.data.success){
    setcampuses(response.data.data)
  }
})

axios.get('http://192.168.43.31:5000/departments').then((response)=>{
  if(response.data.success){
    setdepartments(response.data.data)
  }
})


axios.get('http://192.168.43.31:5000/transactions/'+user.email).then((response)=>{
  if(response.data.success){
   dispatch( setTransactions(response.data.data))
  }
})

  }, [])


  
  return (
    <div>
       <Navigation active={'profile'} />
    <div className={navigationFall?'board fall':'board'}>
   <div className='container'>
<div className='row'>
  <div className='col-sm-5'>
<div className='card shadow'>
<div className='card-header'>
  <div className='title'>
<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>  {`${user.first_name} ${user.surname}`} 
  </div>
</div>
<div className='card-body'>
<div style={{width:'100%', height:'300px', display:'flex', alignItems:'center', justifyContent:'center'}}>
<div style={{backgroundImage: 'url("'+user.image+'")',backgroundSize:'cover', width:'80%', height:'95%', borderRadius:'50%'}}>

</div>
</div>

<button className='btn text-microskool'  style={{width:'97%'}} onClick={()=>{
  dispatch(setUploadPix(true))
}}>
<FontAwesomeIcon icon={faCamera}></FontAwesomeIcon> Edit Picture
</button>
<br/><br/>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> {user.email}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> {user.phone}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon> {user.matric}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faSchool}></FontAwesomeIcon> {user.institution}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon> {user.department}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faLevelUp}></FontAwesomeIcon> {user.level}</div>
{
uploadPix?<Modal config={{align:'flex-start', justify:'left'}} header={'Upload Your Profile Picture'}footer={<> <button className='btn-close' onClick={()=>dispatch(setUploadPix(false))}></button> </>} body={<UploadPix/>} />:<></>
}

{ edit?<Modal config={{align:'flex-end', justify:'left'}} header={'Update Your Profile'} body={<>

  
      <input placeholder='First Name' value={pereson.first_name} className='form-control form-text'onChange={(e)=>{
setPerson({...pereson, first_name:e.target.value})
        }} />
      <input placeholder='Surname' value={pereson.surname} className='form-control form-text' onChange={(e)=>{
setPerson({...pereson, surname:e.target.value})
        }} />
      <input placeholder='JAMB/Matric' value={pereson.matric} className='form-control form-text'onChange={(e)=>{
setPerson({...pereson, matric:e.target.value})
        }} />
<select className='form-select' 
onChange={(e)=>{
setPerson({...pereson, institution:e.target.value.split('---')[0], campus:e.target.value.split('---')[1]})
        }} >
      {
        user.institution===""?        <option >
Select Campus        </option>
:        <option value={user.institution}>
{user.institution}
</option>

      }
{
  campuses.map((campus)=>{
return    <option value={`${campus.name}---${campus.acro}`}>
   {`${campus.name}---${campus.acro}`}
    </option>
  })
}
</select>


        <select  className='form-select' onChange={(e)=>{
setPerson({...pereson, department:e.target.value})
        }}>
             {
        user.department===""?        <option >
Select Department        </option>
:        <option value={user.department}>
{user.department}
</option>

      }
{
  departments.map((departmen)=>{
return    <option value={`${departmen.name}`}>
   {`${departmen.name}`}
    </option>
  })
}

        </select>

        <select  className='form-select' onChange={(e)=>{
setPerson({...pereson, level:e.target.value})
        }}>
        <option value={user.level}>
          {user.level} --Level
        </option>
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


      </>} footer={<><button className='btn microskool-button' onClick={()=>{
        dispatch( updateUser(pereson) )
      dispatch(setEdit(false))
if(network){
      axios.post('http://192.168.43.31:5000/users/'+user.email+'', pereson).then((response)=>{

      })

    }else{
     let feedback= ProcessManager.addProcess(()=>{
        axios.post('http://192.168.43.31:5000/users/'+user.email+'', pereson).then((response)=>{

      })
      })
      dispatch(setalert({...alert, msg:feedback, type:'bad_network', status:true, cap:'Processor'}))
      
    }
      }}> <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> </button> <button className='btn-close' onClick={()=>dispatch(setEdit(false))}></button> </>} />:<></> }

      { logout?<Modal config={{align:'flex-end', justify:'right'}} header={'Confirm Logout'} body={<>
      Sure to logout?
      </>} footer={<><button className='btn btn-danger' onClick={()=>{
         dispatch( updateUser({}) )
         localStorage.clear();
navigate('/')
}}>Logout</button><button className='btn-close' onClick={()=>dispatch(setLogout(false))}></button></>} />:<></>}


</div>
<div className='card-footer'>


      


<button className='btn btn-outline-secondary' title='Edit Profile' onClick={()=>{
  dispatch(setEdit(true))
}}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </button>
<button className='btn btn-outline-secondary' title='Account Security' onClick={()=>{
  navigate('/settings')
}}><FontAwesomeIcon icon={faUserGear}></FontAwesomeIcon> </button>
<button className='btn btn-outline-primary' title='Lock' onClick={()=>{
dispatch(setLocked(true))
}}><FontAwesomeIcon icon={faLock}></FontAwesomeIcon> </button>
<button className='btn btn-outline-danger' title='Logout' onClick={()=>{
dispatch(setLogout(true))
}}><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon> </button>

</div>
</div>
  </div>
  <div className='col-sm-4'>
<div className='card'>
  <div className='card-header'>
<div className='title text-success'><FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> eNaira Earnings</div>
  </div>
  <div className='card-body'>
<h1 className=' text-success'>
  <FontAwesomeIcon  icon={faCoins}></FontAwesomeIcon> {parseFloat(user.coins).toFixed(2)}
</h1>
<hr/>
<div className='hist' style={{width:'100%'}}>
  <h6>Transactions History</h6>

  <div className='table-responsive'>
    
<table className='table text-success table-hover table-striped table-success table-striped-columns' style={{fontSize:'small'}}>
<thead className='text-light bg-success'>
  <th>
    Item
  </th>

  <th>
    Amount
  </th>
  <th>

    Date
  </th>
</thead>
<tbody>
  {
    transactions.map((trans)=>{
      return  <tr>
      <td>
       {trans.item}
      </td>
  
      <td>
      {trans.amount}
      </td>
      <td>
      {trans.date}
      </td>
    </tr>
    })
  }
 

</tbody>
</table>
  </div>
  
</div>
  </div>
  <div className='card-footer'>
  <button className='btn btn-outline-success' title='Opening Wallet' onClick={()=>{
    navigate('/coins')
  }}><FontAwesomeIcon icon={faBarsProgress}></FontAwesomeIcon>  </button>
  
  </div>

</div>
  </div>

  <div className='col-sm-3'>
    <div className='card'>
      <div className='card-header'>
<div className='title'>
<FontAwesomeIcon icon={faBookSkull}></FontAwesomeIcon> My Courses [{myCourses.length  }]
</div>
      </div>
      <div className='card-body'>

<ul className='list-group' style={{fontSize:'small'}}>
  {
    myCourses.map((course, key)=>{
      return   <li key={key} className='list-group-item'>
      {
      course.course
      } 
      </li>
    })
  }

  
</ul>
      </div>
      <div className='card-footer'>
      <button className='btn btn-outline-secondary' title='Edit Courses' onClick={()=>{
        navigate('/courses')
      }}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </button>
      </div>

    </div>
    </div>

</div>
   </div>
      </div>
    </div>
  )
}

export default Profile
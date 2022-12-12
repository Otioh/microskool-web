import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import twelve from '../Images/twelve.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins, faUser, faEnvelope, faPhone, faIdCard, faSchool, faPeopleGroup, faLevelUp, faEdit, faUserGear, faBookSkull, faSave, faCreditCard, faShare, faShareAlt, faPowerOff, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal';
import { updateUser } from '../Redux/Reducers/userReducer';

import { setEdit, setLogout, setUploadPix } from '../Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import UploadPix from './UploadPix';
import axios from 'axios';



function Profile() {
  const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
  const user=useSelector((state)=>state.userReducer.user);
  const {edit, logout, uploadPix}=useSelector((state)=>state.generalReducer.general);
  const [pereson, setPerson]=useState({...user});
  const [campuses, setcampuses] = useState([]);
  const [departments, setdepartments] = useState([]);
  
  let dispatch=useDispatch()
  let navigate=useNavigate();
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


  }, [])

  return (
    <div>
       <Navigation active={'profile'} />
    <div className={navFall?'board fall':'board'}>
   <div className='container'>
<div className='row'>
  <div className='col-sm-4'>
<div className='card shadow'>
<div className='card-header'>
  <div className='title'>
<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>  {`${user.first_name} ${user.surname}`} 
  </div>
</div>
<div className='card-body'>

<img alt={user.first_name} src={user.image} style={{borderRadius:'50%', height:'auto', width:'95%', boxShadow:'0 0 4px black'}} />
<button className='btn microskool-button'  style={{width:'97%'}} onClick={()=>{
  dispatch(setUploadPix(true))
}}>
<FontAwesomeIcon icon={faCamera}></FontAwesomeIcon> Edit Picture
</button>
<br/>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon> {user.email}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faPhone}></FontAwesomeIcon> {user.phone}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon> {user.matric}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faSchool}></FontAwesomeIcon> {user.institution}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faPeopleGroup}></FontAwesomeIcon> {user.department}</div>
<div style={{margin:'7px',width:'80%'}}><FontAwesomeIcon icon={faLevelUp}></FontAwesomeIcon> {user.level}</div>
{
uploadPix?<Modal config={{align:'flex-start', justify:'left'}} header={'Upload Your Profile Picture'}footer={<><button className='btn microskool-button' onClick={()=>{
dispatch(setUploadPix(false))
}}> <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> </button> <button className='btn-close' onClick={()=>dispatch(setUploadPix(false))}></button> </>} body={<UploadPix/>} />:<></>
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
        </select>


      </>} footer={<><button className='btn microskool-button' onClick={()=>{
        dispatch( updateUser(pereson) )
      dispatch(setEdit(false))
      axios.post('http://192.168.43.31:5000/users/'+user.email+'', pereson).then((response)=>{
console.log(response.data );
      })
      }}> <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> </button> <button className='btn-close' onClick={()=>dispatch(setEdit(false))}></button> </>} />:<></> }

      { logout?<Modal config={{align:'flex-end', justify:'right'}} header={'Confirm Logout'} body={<>
      Sure to logout?
      </>} footer={<><button className='btn btn-danger' onClick={()=>{
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
<button className='btn btn-outline-danger' title='Logout' onClick={()=>{
dispatch(setLogout(true))
}}><FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon> </button>

</div>
</div>
  </div>
  <div className='col-sm-5'>
<div className='card'>
  <div className='card-header'>
<div className='title'><FontAwesomeIcon icon={faCoins}></FontAwesomeIcon> Earnings</div>
  </div>
  <div className='card-body'>
<h1 >
  <FontAwesomeIcon style={{color:'gold'}} icon={faCoins}></FontAwesomeIcon> {parseFloat(user.coins).toFixed(2)}
</h1>
<hr/>
<div className='hist' style={{width:'100%'}}>
  <h6>Transactions History</h6>

  <div className='table-responsive'>
    
<table className='table table-warning table-hover' style={{fontSize:'small'}}>
<thead>
  <th>
    Item
  </th>
  <th>
    Description
  </th>
  <th>
    Amount
  </th>
  <th>

    Date
  </th>
</thead>
<tbody>
  <tr>
    <td>
      Reward Earned
    </td>
    <td>
      This is the details of the transaction
    </td>
    <td>
      1,000
    </td>
    <td>
      12/12/2022
    </td>
  </tr>
</tbody>
</table>
  </div>
  
</div>
  </div>
  <div className='card-footer'>
  <button className='btn btn-outline-secondary' title='Transfer Coins'><FontAwesomeIcon icon={faCreditCard}></FontAwesomeIcon> Transfer </button>
<button className='btn btn-outline-secondary' title='Refer & Earn'><FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon> Refer </button>

  </div>

</div>
  </div>

  <div className='col-sm-3'>
    <div className='card'>
      <div className='card-header'>
<div className='title'>
<FontAwesomeIcon icon={faBookSkull}></FontAwesomeIcon> My Courses
</div>
      </div>
      <div className='card-body'>

<ul className='list-group'>
  <li className='list-group-item'>
GSS101 
</li>
  
</ul>
      </div>
      <div className='card-footer'>
      <button className='btn btn-outline-secondary' title='Edit Profile'><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </button>
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
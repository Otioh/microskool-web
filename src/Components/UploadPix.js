import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUploadPix } from '../Redux/Reducers/generalReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

function UploadPix() {
  const formData = new FormData();
  let dispatch=useDispatch();
    const user=useSelector((state)=>state.userReducer.user);

  
  return (
    <div >
      <input type={'file'} className='form-control' onChange={(e)=>{
        formData.append('avatar', e.target.files[0])
        formData.append('email', user.email)
        axios.post('http://192.168.43.31:5000/profile/'+user.email+'', formData).then((response)=>{
  console.log(response.data);
})
dispatch(setUploadPix(false))
      }} />

    </div>
  )
}

export default UploadPix

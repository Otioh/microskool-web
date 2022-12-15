import axios from 'axios';
import React from 'react'
import { useDispatch } from 'react-redux';
import { setUploadPix } from '../Redux/Reducers/generalReducer';

function UploadPix() {
  const formData = new FormData();
  let dispatch=useDispatch();

  
  return (
    <div >
      <input type={'file'} className='form-control' onChange={(e)=>{
        formData.append('avatar', e.target.files[0])
        axios.post('http://192.168.43.31:5000/profile', formData).then((response)=>{
  console.log(response.data);
})
dispatch(setUploadPix(false))
      }} />
 {/* <button className='btn microskool-button' onClick={()=>{


}}> <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> </button> */}
    </div>
  )
}

export default UploadPix

import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setUploadPix } from '../Redux/Reducers/generalReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { setalert, setload } from '../Redux/Reducers/displayReducer';
import { useNavigate } from 'react-router-dom';
import { ProcessManager } from '../Process';

function UploadPix() {
  const formData = new FormData();
  let dispatch=useDispatch();
    const user=useSelector((state)=>state.userReducer.user);
    const alert=useSelector((state)=>state.displayReducer.display.alert)
    let navigate=useNavigate()
    const {  network}=useSelector((state)=>state.generalReducer.general);

  
  return (
    <div >
      <input type={'file'} className='form-control form-control-file' onChange={(e)=>{
        formData.append('avatar', e.target.files[0])
        formData.append('email', user.email)
     if(network){axios.post('http://192.168.43.31:5000/profile/'+user.email+'', formData).then((response)=>{

     location.reload()
      
 })}else{ let feedback=ProcessManager.addProcess(()=>{
  axios.post('http://192.168.43.31:5000/profile/'+user.email+'', formData).then((response)=>{

  
     
})
 }
)
dispatch(setalert({...alert, msg:feedback, type:'bad_network', status:true, cap:'Processor'}))
     }
dispatch(setUploadPix(false))
      }} />

    </div>
  )
}

export default UploadPix
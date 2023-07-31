import React, { useEffect, useState } from 'react'

import Navigation from './Navigation'
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';

function Player() {
  let dispatch = useDispatch();
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);

  const { alert } = useSelector((state) => state.displayReducer.display)
useEffect(()=>{
  axios.get(`${process.env.REACT_APP_BACKEND}assignments`).then((res) => {
    if (res.data.success) {
    
    }else{
      dispatch(setalert({ status: true, msg: res.data.message, type: 'danger', cap: 'Error' }))
    }

  });


 
}, [])
  const lecture =useParams()

   
  return (
    <>
          <Navigation active={'lectures'} />
          <div className={navFall?'board fall':'board'}>
            <div className='container'>
<div className='card'>
  <div className='card-header'>
              <h5>[<strong>{lecture?.course}</strong>] {lecture?.topic}</h5>
  </div>
  <div className='card-body'>
              <video controls src={`${process.env.REACT_APP_BACKEND}lectures/watch/${lecture.id}`} autoPlay style={{width:'100%'}} disablePictureInPicture disableRemotePlayback >
             

              </video>
  </div>
<div className='card-footer'>
         <span>{lecture?.lecturer}</span>
</div>
  
</div>

            </div>

          <div>
          </div>
          
          </div>
    </>
  )
}

export default Player

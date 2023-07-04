import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navigation from './Navigation'
import axios from 'axios';
import {useParams} from 'react-router-dom';

function Player() {
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);

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
              <video controls  src={`http://localhost:5000/lectures/watch/${lecture.id}`} autoPlay style={{width:'100%'}} disablePictureInPicture disableRemotePlayback >
             

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

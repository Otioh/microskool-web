import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Navigation from './Navigation'
import axios from 'axios';
import {useParams} from 'react-router-dom';

function Player() {
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);
  const [lecture, setlecture] = useState()
  const {id} =useParams()

    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND}lectures/${id}`).then((res) => {
        if (res.data.success) {
          setlecture(res.data.data)
        }
      })

      localStorage.setItem('last_page', location.hash)
      
      }, [])
 
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
              <video  controls src={lecture?.video} autoPlay style={{width:'100%'}}>
             

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

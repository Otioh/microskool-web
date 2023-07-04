import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTelevision, faVideoCamera } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Lectures() {
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);
  const user = useSelector((state) => state.userReducer.user);
    let navigate=useNavigate();
  const [lectures, setlectures]= useState([])

    useEffect(()=>{
      localStorage.setItem('last_page', location.hash)
      axios.get(`${process.env.REACT_APP_BACKEND}lectures/${user.campus}`).then((res)=>{
       if( res.data.success){
        setlectures(res.data.data)
       }
      })
      
      }, [])
      useEffect(()=>{

        if(locked){
         navigate('/resume')}
       
       }, [locked])
  return (
    <>
          <Navigation active={'lectures'} />
          <div className={navFall?'board fall':'board'}>
            <div className='container'>
              <div className='card'>
<div className='card-header'>
              <h3 className='text-microskool'>Lectures</h3>
</div>
<div className='card-body'>
              <ul className='list-group responsive'>
                {
                  lectures.length>0?lectures.map((lecture)=>{
                    return <li className='list-group-item hover ' style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={() => {
                      navigate('/player/' + lecture.lid + '/' + lecture.course + '/' + lecture.lecturer + '/' + lecture.topic)
                    
                    }}>
                      <strong style={{fontSize:'xx-large'}}>  <FontAwesomeIcon icon={faTelevision} /> </strong>
                      <i>
                        {lecture.course}
                        <br />
                        <b className='text-success'>{lecture.lecturer}</b>
                      </i>
                     
  
                    </li>
                  }) :<h6>No Active Lecture</h6>
                }
                
</ul>
</div>
<div className='card-footer'>

</div>

              </div>
            </div>

          <div>
          </div>
          
          </div>
    </>
  )
}

export default Lectures

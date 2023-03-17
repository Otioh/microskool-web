import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation';
import {faBackward} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Viewer() {
    const assign=useSelector((state)=>state.generalReducer.general.assign);
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);
    useEffect(()=>{

      if(locked){
       navigate('/resume')}
     
     }, [locked])
     
    let navigate=useNavigate()
  return (
    <div>
        <Navigation active={'assignment'}/>
        <div className={navFall?'board fall':'board'}>
          <button className='btn btn-outline-primary' onClick={()=>{
navigate('/assignment')
          }}>
            <FontAwesomeIcon icon={faBackward}></FontAwesomeIcon> Back
          </button>
      <div className='container'><div className='card'> {assign.question} <i>Assignment By: {assign.lecturer}</i> </div><img src={assign.image}  alt={assign.course} /></div>

    </div>
    </div>
  )
}

export default Viewer

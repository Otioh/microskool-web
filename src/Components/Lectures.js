import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation'

function Lectures() {
    const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
    let navigate=useNavigate();
  return (
    <>
          <Navigation active={'lectures'} />
          <div className={navFall?'board fall':'board'}>
            <div className='container'>
Lectures Here
<button className='btn btn-primary' onClick={()=>{
navigate('/player')
}}>
Play
</button>
            </div>

          <div>
          </div>
          
          </div>
    </>
  )
}

export default Lectures

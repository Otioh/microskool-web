import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Navigation from './Navigation'

function Player() {
    const {navFall, locked}=useSelector((state)=>state.displayReducer.display);
    useEffect(()=>{
      localStorage.setItem('last_page', location.hash)
      
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
Player
<video controls autoPlay>
    <source src=''>
    </source>

</video>
            </div>

          <div>
          </div>
          
          </div>
    </>
  )
}

export default Player

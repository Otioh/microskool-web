import React from 'react'
import { useSelector } from 'react-redux';
import Navigation from './Navigation'

function Player() {
    const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
    
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

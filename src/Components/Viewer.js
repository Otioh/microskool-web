import React from 'react'
import { useSelector } from 'react-redux'
import Navigation from './Navigation';

function Viewer() {
    const assign=useSelector((state)=>state.generalReducer.general.assign);
    const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);
  return (
    <div>
        <Navigation active={'lectures'}/>
        <div className={navFall?'board fall':'board'}>
      <div className='container'><div className='card'> {assign.question} <i>Assignment By: {assign.lecturer}</i> </div><img src={assign.image}  alt={assign.course} /></div>

    </div>
    </div>
  )
}

export default Viewer

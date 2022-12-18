import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function Spinner() {
    const {spin}=useSelector((state)=>state.displayReducer.display);
    let dispatch=useDispatch();
    
  return (
    <div style={spin?{display:'block'}:{display:'none'}}>
      <span className='spinner-grow text-microskool' style={{position:'fixed', right:'1%'}}>

      </span>
    </div>
  )
}

export default Spinner

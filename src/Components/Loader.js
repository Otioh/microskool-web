import { faL } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setload } from '../Redux/Reducers/displayReducer';

function Loader({load}) {
  const {edit, logout}=useSelector((state)=>state.generalReducer.general);
  let dispatch=useDispatch();
    

  return (
    <div style={load===true?{height:'100vh',width:'100vw', position:'fixed', zIndex:'200', backgroundColor:'rgba(255,255,255,0.6)',display:'flex',alignItems:'center', justifyContent:'center' }:{display:'none'}}>
    <button className='btn-close' onClick={()=>{
dispatch(setload(false))
    }}>
      
    </button>
    <div className='spinner-border text-primary'>
      
    </div>
    </div>
  )
}

export default Loader

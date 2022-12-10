import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setalert } from '../Redux/Reducers/displayReducer'

function Alert({status, cap, msg, type}) {
  let dispatch=useDispatch()
  useEffect(()=>{
    return ()=>{
dispatch(setalert({status:false, type:'info'}))
    }
  }, [])
  return (
    <div style={status?{}:{display:"none"}}>
      <div className={`alert alert-${type} alert-dismissible show fade `} >
<strong>{cap}!</strong>  {msg}

</div>

    </div>
  )
}

export default Alert

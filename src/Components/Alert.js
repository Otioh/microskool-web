import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfo, faWarning, faWifi } from '@fortawesome/free-solid-svg-icons';


function Alert({status, cap, msg, type}) {
 let icon;
  let dispatch=useDispatch()

    if(type==='success'){icon= <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>

  }else if(type==='danger'){icon=<FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>

} else if(type==='warning'){icon=<FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>

}
else if(type==='bad_network'){
  icon=<FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>
  type='warning'

}
else if(type==='good_network'){
  icon=<FontAwesomeIcon icon={faWifi}></FontAwesomeIcon>
  type='success'
}
  else{
   icon= <FontAwesomeIcon icon={faInfo}></FontAwesomeIcon>
 
  }
 
  return (
    <div  className={`alert alert-${type} alert-dismissible show fade animate`} style={status?{fontSize:'small'}:{display:"none"}}>
   
<strong> 

{
icon
}  {cap} !</strong>  {msg}


<button className={`btn-close text-${type}}`} onClick={()=>{
  dispatch(setalert({status:false, type:'info'}))
}}> </button>
    </div>
  )
}

export default Alert

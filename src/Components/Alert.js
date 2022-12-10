import React from 'react'

function Alert({status, cap, msg, type}) {
  return (
    <div style={status?{}:{display:"none"}}>
      <div className={`alert alert-${type} alert-dismissible show fade `} >
<strong>{cap}!</strong>  {msg}

</div>

    </div>
  )
}

export default Alert

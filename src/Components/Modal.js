import React from 'react'

function Modal({config, header, body, footer}) {
  return (
    <div>
      <div className='modal' style={{ alignItems:config.align,justifyContent: config.justify}}>
  <div className='content'>
<div className='modal-header title'>
{header}
</div>
<div className='modal-body'>
{body}
</div>
<div className='modal-footer'>
{footer}
</div>
</div>
</div>
    </div>
  )
}

export default Modal

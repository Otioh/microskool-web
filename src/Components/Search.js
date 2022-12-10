import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Navigation from './Navigation';

function Search() {
  return (
    <div>
      <Navigation active={'search'} />
      <div className='board'>
        <div className='container'>
<div className='row'>
<div className='col-sm-6'>
<div className='card shadow '>
<input type='search' placeholder='Search Anything' className='form-control' />
<button type='search' className='btn'>
  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
</button>
</div>
</div>
<div className='col-sm-6'>

</div>

</div>
        </div>

      </div>
      Search
    </div>
  )
}

export default Search

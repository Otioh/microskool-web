import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import FourPoint from './FourPoint';
import FivePoint from './FivePoints';
import Navigation from './Navigation';
import { useSelector } from 'react-redux';


function Calculator() {
  const navFall=useSelector((state)=>state.displayReducer.display.navigationFall);

  const theme='dark';
  return (
    <>
        <Navigation active={'calculator'} />
    <div className={navFall?'board fall':'board'}>

 
    <div className='container'>
  
        <Tabs defaultActiveKey="four" id="uncontrolled-tab-example" className="mb-3">
      
      <Tab eventKey="four"  title={<> <label> 4.0 Scale</label></>} >
      <FourPoint theme={theme} />
      </Tab>
      <Tab eventKey="five" title={<> <label>  5.0 Scale</label></>}>
      <FivePoint theme={theme} />
      </Tab>
</Tabs>



      

    </div>
    </div>
    </>
  )
}
export default Calculator;
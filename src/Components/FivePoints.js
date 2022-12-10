import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAdd, faSave, faCalculator, faRefresh } from '@fortawesome/free-solid-svg-icons';
import Alert from './Alert';
import { useSelector, useDispatch} from 'react-redux';
import { setalert } from '../Redux/Reducers/displayReducer';


function 
FivePoint() {
  const alert=useSelector((state)=>state.displayReducer.display.alert)
  const dispatch= useDispatch()
  const [courseList, setcourseList] = useState([]);
  const [course, setcourse] = useState("");
  const [credit, setcredit] = useState(0);
  const [grade, setgrade] = useState("");
  const[GPA, setGPA]=useState(parseFloat(3.2).toFixed(2));
const addCourse=()=>{
if(course===""){
  dispatch(setalert({type:'danger', msg:'Course cannot be empty', cap:'Error', status:true}))

}else{
  let newObj={code:course, credit:credit, grade:grade.substring(0,1), gp:parseInt(grade.substring(2))*parseInt(credit)};
  courseList.push(newObj);
  setcourse("");
  dispatch(setalert({type:'success', msg:'Course Added', cap:'Success', status:true}))

}
}
const Calculate=()=>{
  if(courseList.length<1){
    dispatch(setalert({type:'danger', msg:'Course Array cannot be empty', cap:'Error', status:true}))
    return   ;
  }else{
  let units=0;
  let gp=0;
for(let i =0;i<courseList.length;i++){
  units+=parseInt(courseList[i].credit);
  gp+=parseInt(courseList[i].gp);

}
  setGPA((gp)/units);
  dispatch(setalert({type:'success', msg:'Calculated Successfully', cap:'Success', status:true}))


  }
}
  return (
    <>
    <div className='card padding'>
    <Alert status={alert.status} cap={alert.cap} msg={alert.msg} type={alert.type} />

      <div className='screen'><center>
Your CGPA currently
<h2>
{GPA}
</h2>
</center>
<i>Use control panel below</i>

      </div>
      <div className='add-course' >
      <input list='browser' className='form-control-sm' placeholder='Course Code' value={course} onChange={(e)=>{
  setcourse(e.target.value);
}} />
<datalist id="browser">
 
 
</datalist>
<select value={credit} className='form-select' onChange={(e)=>{
  setcredit(e.target.value);
}}>
<option>Credit Unit</option>
<option value="5">5</option>
<option value="4">4</option>
<option value="3">3</option>
<option value="2">2</option>
<option value="1">1</option>
</select>
<select value={grade} className='form-select' onChange={(e)=>{
  setgrade(e.target.value);
}}>
<option>Grade</option>
<option value="A.5">A</option>
<option value="B.4">B</option>
<option value="C.3">C</option>
<option value="D.2">D</option>
<option value="E.1">E</option>
<option value="F.0">F</option>
</select>
<button onClick={addCourse} className='btn btn-outline-secondary'><FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Add</button>
      </div>
<div className='courses'>
<div className="table-responsive" >
    <table className={`table table-light table-striped table-hover table-condensed `}>
<tbody>

{courseList.map(({code, credit, gp, grade}, key)=>{
  return   <tr key={key}>
  <td>
    {code}
  </td>
  <td>{credit}
  </td>
  <td>
{grade} 
  </td>
  <td>
{gp} GP
  </td>
</tr>

})}
</tbody>

</table>
</div>
</div>
<div className="btn-bar">
<button className={'btn btn-outline-primary'} onClick={Calculate}>
<FontAwesomeIcon icon={faCalculator}></FontAwesomeIcon> 

</button>
<button className={'btn btn-outline-secondary'} onClick={()=>{
    setcourseList([])
}}>
<FontAwesomeIcon icon={faRefresh}></FontAwesomeIcon> 

</button>
<button className={'btn btn-outline-success'} onClick={Calculate}>
<FontAwesomeIcon icon={faSave}></FontAwesomeIcon> 

</button>
</div>
    </div>


    </>
  )
}

export default FivePoint;
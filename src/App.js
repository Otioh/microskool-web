import './App.css';
import Login from './Components/Login';
import { Route, Routes, useNavigate} from 'react-router-dom';
import Signup from './Components/Signup';
import { useEffect, useState } from 'react';
import Dashboard from './Components/Dashboard';
import Loader from './Components/Loader';
import Calculator from './Components/Calculator';
import Search from './Components/Search';
import Reference from './Components/Reference';
import Profile from './Components/Profile';
import Schedule from './Components/Schedule';
import { useSelector } from 'react-redux';
import { setalert } from './Redux/Reducers/displayReducer';
import { setload } from './Redux/Reducers/displayReducer';
import Verify from './Components/Verify';
import Settings from './Components/Settings';
import ScheduleContribute from './Components/ScheduleContribute';
import Assignments from './Components/Assignments';
import Lectures from './Components/Lectures';
import Player from './Components/player';
import Viewer from './Components/Viewer';
import Synch from './Components/Synch';


function App() {
const dis=useSelector((state)=>state.displayReducer.display)
const email=useSelector((state)=>state.userReducer.user.email);
let navigate=useNavigate()
useEffect(()=>{
  if(email===""){
    navigate('/login')
  }
}, [email])

  return (
<>
<Loader load={dis.load} />
<Routes>
  <Route path='/' element={<Login  />} />
  <Route path='/login' element={<Login  />} />
  <Route path='/signup' element={<Signup />} />
  <Route path='/dashboard' element={<Dashboard />} />
  <Route path='/calculator' element={<Calculator />} />
  <Route path='/search' element={<Search />} />
  <Route path='/reference' element={<Reference />} />
  <Route path='/profile' element={<Profile />} />
  <Route path='/schedule' element={<Schedule />} />
  <Route path='/verifymail' element={<Verify email={email} /> } />
  <Route path='/settings' element={<Settings />}/>
  <Route path='/contribute' element={<ScheduleContribute/>}/>
  <Route path='/assignment' element={<Assignments/>}/>
  <Route path='/lectures' element={<Lectures/>}/>
  <Route path='/player' element={<Player/>}/>
  <Route path='/viewer' element={<Viewer/>}/>
  <Route path='/synch' element={<Synch/>}/>

</Routes>

</>  );
}

export default App;

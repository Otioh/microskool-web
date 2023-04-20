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
import { useSelector, useDispatch } from 'react-redux';
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
import Reset from './Components/Reset';
import Spinner from './Components/Spinner';
import Courses from './Components/Courses';
import Alert from './Components/Alert';
import axios from 'axios';
import { setNetwork } from './Redux/Reducers/generalReducer';
import { funSeque } from 'flame-tools';
import { ProcessManager } from './Process';
import Coins from './Components/Coins';
import Resume from './Components/Resume';
import UserProfile from './Components/UserProfile';
import MyEditor from "./Components/Editor";
import FileManager from './Components/FileManager';


function App() {
  const [landed, setlanded] = useState(false);
const dis=useSelector((state)=>state.displayReducer.display)
const email=useSelector((state)=>state.userReducer.user.email);
const {network}=useSelector((state)=>state.generalReducer.general);
const {alert, locked}=useSelector((state)=>state.displayReducer.display)
let navigate=useNavigate()
const [result, setresult] = useState(false);
let dispatch=useDispatch();

useEffect(()=>{
  setInterval(() => {
    checkNetwork()()
  }, 30000);
  setTimeout(() => {
    setlanded(true)
  }, 12000);
},[])




useEffect(()=>{

if(network){
  dispatch(setalert({ cap:'Network', status:true, type:'good_network', msg:'Connection Secured'}))
ProcessManager.process()

}else{
dispatch(setalert({ cap:'Network Error', status:true, type:'bad_network', msg:'No Internet Connection'}))
}
}, [network])
const checkNetwork=()=>{
  let status=false;
  axios.get('http://192.168.43.31:5000/').then((re)=>{
status=true;
  })
  return ()=>{
    setTimeout(() => {
      dispatch(setNetwork(status))
return status
    }, 2000);

  }
}


useEffect(()=>{
 
  if( localStorage.getItem('email')===null){
    navigate('/login')
  }
  
  if(email==="" && localStorage.getItem('email')!==null){
dispatch(setload(true))

  }
}, [email])

  return (
    <>
      <Alert
        msg={alert.msg}
        cap={alert.cap}
        status={alert.status}
        type={alert.type}
      />
      <Loader load={dis.load} />
      <Spinner />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/search" element={<Search />} />
        <Route path="/reference" element={<Reference />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/verifymail" element={<Verify email={email} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/contribute" element={<ScheduleContribute />} />
        <Route path="/assignment" element={<Assignments />} />
        <Route path="/lectures" element={<Lectures />} />
        <Route path="/player" element={<Player />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/synch" element={<Synch />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/resume" element={<Resume />} />

        <Route path="/editor" element={<MyEditor />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/user-profile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default App;

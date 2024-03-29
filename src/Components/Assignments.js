import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from './Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navigation from './Navigation';
import { setAssignments, setViewAssignment, setaddAssignment } from '../Redux/Reducers/generalReducer';
import AddAssignment from './AddAssignment';
import { faAdd, faBook, faBookOpen, faCoins, faDownLong, faDownload, faEye, faFileEdit, faRemove, faThumbsUp, faTimes, faWarning, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Navigate, useNavigate } from 'react-router-dom';
import DropMenu from './DropMenu';
import {Tabs, Tab} from 'react-bootstrap';
import { useStepContext } from '@mui/material';
import axios from 'axios';
import { setalert } from '../Redux/Reducers/displayReducer';


function Assignments() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  const courses = useSelector((state) => state.generalReducer.general.courses);
  const assignments = useSelector((state) => state.generalReducer.general.assignments);
  const [seachterm, setseachterm] = useState('')
  const [previewing, setpreview] = useState(false)

  const { alert } = useSelector((state) => state.displayReducer.display)
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND}assignments`).then((res) => {
      if (res.data.success) {
        res.data.data.forEach((ass) => {

        })
        dispatch(setAssignments(res.data.data));
      }

    });
  }, [])



  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElWarn, setAnchorElWarn] = useState(null);
  const open = Boolean(anchorEl);
  const openWarn = Boolean(anchorElWarn);
const [file, setfile] = useState("")

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    
  };
  const handleClickWarning = (event) => {
    setAnchorElWarn(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseWarn = () => {
    setAnchorElWarn(null);
  };

  const copy = () => {
    location.replace(`${process.env.REACT_APP_BACKEND}downloadFile/`+file)
    }

  






  const { navigationFall, locked, navFall } = useSelector(
    (state) => state.displayReducer.display
  );
  const [assign, setAssign] = useState({ question: '', image: '', course: '', deadline: '', lecturer: '' });
  const { viewAssignment, addAssignment } = useSelector((state) => state.generalReducer.general);
  const closePop = () => {
    dispatch(setViewAssignment(false))
  }
  const closePopAss = () => {
    dispatch(setaddAssignment(false))
  }
  useEffect(() => {

    if (locked) {
      navigate('/resume')
    }

  }, [locked])
  useEffect(() => {
    localStorage.setItem('last_page', location.hash)

  }, [])

  return (
    <>
      <Navigation active={"assignment"} />
      <div className={navFall ? "board fall" : "board"}>
        {addAssignment ? (
          <Modal
            config={{ align: "flex-end", justify: "right" }}
            body={<AddAssignment />}
            header={`Post New Resource`}
            footer={
              <button
                className="btn-close"
                onClick={() => {
                  closePopAss();
                }}
              ></button>
            }
          />
        ) : (
          <></>
        )}


    

        <br />
        <input
          className="form-control"
          style={{ width: "180px", float: "right" }}
          placeholder="Search Resource"
          type="search"
          onChange={(e) => {
            setseachterm(e.target.value);
          }}
        />
        <button
          className="btn microskool-button"
          onClick={() => {
            dispatch(setaddAssignment(true));
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New{" "}
        </button>
        <a target='_blank' href='https://mi-safe-book.netlify.app' className="btn microskool-border" style={{margin:'5px'}}>
          <FontAwesomeIcon icon={faFileEdit}></FontAwesomeIcon>
  Open MiSB
</a>

        <button
          className="btn microskool-border"
          onClick={() => {
            navigate("/courses");
          }}
        >
          {" "}
          <FontAwesomeIcon icon={faBook}></FontAwesomeIcon> Manage Courses{" "}
        </button>


        <Tabs defaultActiveKey={'all'} style={{margin:'20px'}}>
          <Tab eventKey={'all'} title='Recent' >
            {assignments
              .filter((eachAss) => {
                if (seachterm === "") {
                  return eachAss;
                } else {
                  if (
                    eachAss.course
                      .toLowerCase()
                      .includes(seachterm.toLowerCase()) ||
                    eachAss?.filestat
                      ?.toLowerCase()
                      .includes(seachterm.toLowerCase()) ||
                    eachAss.question.toLowerCase().includes(seachterm.toLowerCase())||
                    eachAss.title.toLowerCase().includes(seachterm.toLowerCase())
                  ) {
                    return eachAss;
                  } else {
                    return null;
                  }
                }
              })
              .map((ass) => {
                return (
                  <div
                    className="card shadow grid-item"
                    style={{ height: "auto", width: "200px" }}
                  >
                    <div className="card-header">
                      <h4 style={{margin:0, padding:0}}>
                        <FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon>{" "}
                        {ass.course}
                      </h4>
                      <div style={{width:'100%', textAlign:'center', textTransform:'uppercase'}}>
                        {ass.campus}
                      </div>
                      <span className="badge bg-microskool">{ass.filestat}</span>
                    </div>
                    <div className="card-body" style={{}}>
                      <span className="icon" style={{ fontSize: "20pt" }}>
                       
                      </span>
                      <p style={{ fontSize: "small" }}>{ass.question}</p>
                      <span className="badge bg-info" style={{textTransform:'uppercase'}}>{ass.title}</span>
                      <span className="badge bg-warning"> {ass.date.substring(0,16) }</span>{" "}
                   
                    </div>
                    <div className="card-footer" >
                     
                      <button className='btn' onClick={()=>{
                      
                        setfile(ass.file)
                        }}>

                  
                      <button
                        className="btn microskool-button"
                          onClick={handleClick}
                      >
                        <FontAwesomeIcon  icon={faDownload}></FontAwesomeIcon> 
                      </button>
                      </button>
                 

                      <button
                        className="btn text-danger"
                        onClick={handleClickWarning}
                      >
                        <FontAwesomeIcon icon={faWarning}></FontAwesomeIcon>
                      </button>
                    </div>
                  </div>
                );
              })}

</Tab>
          <Tab eventKey={'draft'} title='My Draft'>
           <div style={{margin:'10px'}}>
            <ul className='list-group'>
              {
                  assignments.filter((assign)=>{
                    if(assign.user===user.email){
                      return assign
                    }
                  }).map((ass) => {
                    return <li className='list-group-item' style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
  <strong>{ass.course}</strong> <span>{ass.question.substring(0,70)} ...</span> <button className='btn btn-outline-danger' onClick={()=>{
                        axios.delete(`${process.env.REACT_APP_BACKEND}assignments/${ass.id}`).then((resp)=>{
                          dispatch(setalert({...alert, status:true, msg:resp.data.message, type:'success'}))
                          axios.get(`${process.env.REACT_APP_BACKEND}assignments/${user.campus}`).then((res) => {
                            if (res.data.success) {
                              res.data.data.forEach((ass) => {

                              })
                              dispatch(setAssignments(res.data.data));
                            }

                          });
                        })
  }}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon> Delete</button>
</li>
                  })
              }
            </ul>

           </div>
          </Tab>

        </Tabs>
     
       
        <DropMenu
          items={[
            {
              handleNextAction:copy,
              icon: faDownload,
              title: "Download MiSB",
            },
            {
              handleNextAction: handleClose,
              icon: faTimes,
              title: "Cancel",
            },
          ]}
          open={open}
          anchorEl={anchorEl}
        />

        <DropMenu
          items={[
            {
              handleNextAction:()=>{},
              icon: faWarning,
              title: "Report this as misleading",
            },
            {
              handleNextAction: handleCloseWarn,
              icon: faTimes,
              title: "Cancel",
            },
          ]}
          open={openWarn}
          anchorEl={anchorElWarn}
        />
      </div>
    </>
  );
}

export default Assignments;
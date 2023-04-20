import React, { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faEdit} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import { setTimeTable } from '../Redux/Reducers/generalReducer';
import axios from 'axios';


const Schedule =()=>{
    const profile=useSelector((state)=>state.userReducer.user);
const timeTable=useSelector((state)=>state.generalReducer.general.timeTable);
const {navigationFall, locked}=useSelector((state)=>state.displayReducer.display);
  const user = useSelector((state) => state.userReducer.user);


let dispatch=useDispatch()
useEffect(()=>{
  localStorage.setItem("last_page", location.hash);
  // dispatch(setMyCourses(data.mycourses))
  axios
    .get(
      "http://192.168.43.31:5000/schedules/" +
        user.campus +
        "/" +
        user.department +
        "/" +
        user.level
    )
    .then((response) => {
      if (response.data.success) {
        dispatch(setTimeTable(response.data.data));
      }
    });
}, [])
    useEffect(()=>{

        if(locked){
         navigate('/resume')}
       
       }, [locked])
    
const [mondays]=useState([]);
const [tuesdays]=useState([]);
const [wednesdays]=useState([]);
const [thursdays]=useState([]);
const [fridays]=useState([]);
const [saturdays]=useState([]);
timeTable.forEach((time)=>{
    switch (time.day) {
        case 'Monday':
            mondays.push(time)
            break;
        case 'Tuesday':
            tuesdays.push(time)
            break;
        case 'Wednesday':
            wednesdays.push(time)
            break;
        case 'Thursday':
            thursdays.push(time)
            break;
        case 'Friday':
            fridays.push(time)
            break;
        case 'Saturday':
            saturdays.push(time)
            break;

        

            
        default:
            break;
    }
})

let navigate=useNavigate();


    return (
      <>
        <Navigation active={"schedule"} />
        <div className={navigationFall ? "board fall" : "board"}>
          <div className="container">
            <div className="card padding">
              <h3>Lecture Time-Table </h3>
              <h5>
                Department of {profile.department} {profile.level}Level
              </h5>
              <h6>{profile.institution}</h6>

              <div className="table-responsive">
                <button
                  className="btn microskool-button"
                  onClick={() => {
                    navigate("/contribute");
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} /> Contribute
                </button>

                <button
                  className="btn microskool-border"
                  onClick={() => {
                    navigate("/courses");
                  }}
                >
                  <FontAwesomeIcon icon={faBook} /> Courses
                </button>

                <table
                  className={`table table-light table-striped table-hover table-condensed `}
                >
                  <thead>
                    <th></th>
                    <th>COURSE</th>
                    <th>IN</th>

                    <th>OUT</th>
                    <th>VENUE</th>
                  </thead>
                  <tbody>
                    {mondays.length > 0 ? <h5>Monday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Monday") {
                        mondays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              {" "}
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>

                  <tbody>
                    {tuesdays.length > 0 ? <h5>Tuesday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Tuesday") {
                        tuesdays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>

                  <tbody>
                    {wednesdays.length > 0 ? <h5>Wednesday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Wednesday") {
                        wednesdays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>

                  <tbody>
                    {thursdays.length > 0 ? <h5>Thursday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Thursday") {
                        thursdays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>

                  <tbody>
                    {fridays.length > 0 ? <h5>Friday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Friday") {
                        fridays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>

                  <tbody>
                    {saturdays.length > 0 ? <h5>Saturday</h5> : <h></h>}
                    {timeTable.map((period, key) => {
                      if (period.day === "Saturday") {
                        saturdays.push(period.course);

                        return (
                          <tr key={key}>
                            <td>
                              <button
                                title="Inactive"
                                className="btn btn-danger"
                              >
                                {""}
                              </button>
                            </td>
                            <td>{period.course}</td>
                            <td>{period.time_in}</td>
                            <td>{period.time_out}</td>
                            <td>{period.venue}</td>
                          </tr>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}

export default Schedule;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  faDashboard,
  faBookOpen,
  faBookAtlas,
  faVideoCamera,
  faClock,
  faCalculator,
  faListAlt,
  faUser,
  faCoins,
  faSearch,
  faGear,
  faBook,
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import Alert from "./Alert";
import Navigation from "./Navigation";
import { useDispatch, useSelector } from "react-redux";
import { funSeque } from "flame-tools";
import { useNavigate } from "react-router-dom";
import { setEdit } from "../Redux/Reducers/generalReducer";
import { setalert } from "../Redux/Reducers/displayReducer";

function Dashboard() {
  const navFall = useSelector(
    (state) => state.displayReducer.display.navigationFall
  );
  const user = useSelector((state) => state.userReducer.user);
  const { alert, locked } = useSelector(
    (state) => state.displayReducer.display
  );
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    localStorage.setItem("last_page", location.hash);
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (locked) {
        navigate("/resume");
      }
    }, 1000);
  }, [locked]);
  if (user.institution === "" || user.department === "" || user.level === "") {
    funSeque(
      { delaySeconds: 1 },
      () => {},

      () => {
        navigate("/profile");
      },
      () => {
        dispatch(setEdit(true));
      }
    );
  }

  useEffect(() => {
    dispatch(
      setalert({ ...alert, msg: "to Microskool", cap: "Welcome", status: true })
    );
  }, []);

  return (
    <>
      <Navigation active={"dashboard"} />
      <div className={navFall ? "board fall" : "board"}>
        <div className="container">
          <br />
          <br />
          <br />

          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={()=>{
              navigate('/lectures')
            }}
          >
            <span className="icon">
              {" "}
              <span className="icon">
                {" "}
                <FontAwesomeIcon icon={faVideoCamera}></FontAwesomeIcon>
              </span>
            </span>
            Lectures
          </div>
          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/assignment')
            }}
          >
            <span className="icon">
              {" "}
              <span className="icon">
                {" "}
                <FontAwesomeIcon icon={faBookOpen}></FontAwesomeIcon>
              </span>
            </span>
            Assignments
          </div>
          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/courses')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faBook}></FontAwesomeIcon>
            </span>
            My Courses
          </div>
          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/schedule')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
            </span>
            Lecture Schedule
          </div>
          <a href="https://misb-microskool.netlify.app/" target="_blank" rel="noreferrer">          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
        
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
            </span>
            MiSB
          </div>
          </a>

          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/reference')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faListAlt}></FontAwesomeIcon>
            </span>
            Course Reference
          </div>

          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/profile')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
            </span>
            Profile
          </div>

          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/coins')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faCoins}></FontAwesomeIcon>
            </span>
            Earnings
          </div>

          <div
            className="card shadow grid-menu"
            style={{ height: "105px", width: "105px" }}
            onClick={() => {
              navigate('/settings')
            }}
          >
            <span className="icon">
              {" "}
              <FontAwesomeIcon icon={faGear}></FontAwesomeIcon>
            </span>
            Settings
          </div>

       
        </div>
      </div>
    </>
  );
}

export default Dashboard;

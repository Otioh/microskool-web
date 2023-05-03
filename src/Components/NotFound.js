import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MicroskoolIcon from "../Images/micro.png";
import {
  faLock,
  faKey,
  faUserLock,
  faEye,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

import { updateUser } from "../Redux/Reducers/userReducer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { funSeque } from "flame-tools";
import { useSelector, useDispatch } from "react-redux";
import { setalert, setload, setspin } from "../Redux/Reducers/displayReducer";
import { data, query } from "../App.Config";
import { DataGrid } from "@mui/x-data-grid";

function NotFound() {
  const dispatch = useDispatch();
  const user = useSelector((state) => {
    return state.userReducer.user;
  });
  const alert = useSelector((state) => state.displayReducer.display.alert);

  const [email, setEmail] = useState(user.email);
  const [password, setpassword] = useState(user.password);
  let navigate = useNavigate();

 

  useEffect(() => {
    return () => {
      dispatch(setalert({ status: false, type: "info" }));
    };
  }, [email, password]);

  return (
    <>
      <div className="mother centered">
        <div className="card shadow margin">
          <div className="card-header">
            <img alt="Logo" className="microskool-icon" src={MicroskoolIcon} />
            <b style={{ float: "right" }} className="microskool-title">
              404 Error
            </b>
          </div>
          <div className="card-body">
           <h3>
            Requested Resource Not Found
           </h3>
           <button className="btn microskool-border" onClick={()=>{
            navigate('/dashboard')
           }}>
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon> Go Back
           </button>
          </div>
          <div className="card-footer">
            
            <br />
           
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFound;

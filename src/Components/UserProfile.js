import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { faIdCard, faPhone, faPhoneSquare, faSchool, faSearch, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
function UserProfile() {
       const navFall = useSelector(
         (state) => state.displayReducer.display.navigationFall
       );
          const { secondUser } = useSelector(
            (state) => state.generalReducer.general
          );
      const [seUser, setSeUser]= useState({})
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND}users/`+secondUser).then((res)=>{
    setSeUser(res.data.data[0])
})
    }, [])

  return (
    <div>
      <Navigation active={"all"} />
      <div className={navFall ? "board fall" : "board"}>
        <div className="container">
          <div className="row">
            <div className="col-sm-5">
              <div className="card">
                <ul className="list-group" style={{ padding: "21px" }}>
                  <div>
                    <img
                      alt="Profile-Image"
                      style={{
                        width: "200px",
                        height: "200px",
                        borderRadius: "50%",
                        marginBottom: "15px",
                      }}
                      src={seUser.image}
                    />
                  </div>

                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>{" "}
                    <strong>
                      {" "}
                      {seUser.first_name} {seUser.surname}
                    </strong>
                  </li>
                  <li className="list-group-item">
                    <a target="__blank" style={{textDecoration:'none', color:'inherit'}} href={`http://whatsapp.com/chat/${seUser.phone}`} >
                      {" "}
                      <FontAwesomeIcon
                        icon={faPhoneSquare}
                      ></FontAwesomeIcon>{" "}
                     WhatsApp
                    </a>
                  </li>
                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faIdCard}></FontAwesomeIcon>{" "}
                    {seUser.matric}
                  </li>

                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faUserGroup}></FontAwesomeIcon>{" "}
                    {seUser.department}
                  </li>

                  <li className="list-group-item">
                    <FontAwesomeIcon icon={faSchool}></FontAwesomeIcon>{" "}
                    {seUser.institution}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;

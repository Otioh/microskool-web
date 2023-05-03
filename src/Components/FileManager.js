import React from "react";
import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFileEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function FileManager() {
  let navigate=useNavigate()
  return (
    <>
      <div className="row" style={{ position: "fixed", width: "100vw" }}>
        <div className="row">
          <div className="col-sm-12">
            <button
              style={{ float: "right" }}
              className="btn microskool-button"
              onClick={() => {
              }}
            >
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> Create New
            </button>
            <div className="menu-icon" style={{ marginTop: "19px" }}>
              <img alt="logo" src={MicroskoolIcon} />
            </div>
            <span style={{ fontSize: "large" }} className={"item-text title"}>
              Microskool Safe File Manager
            </span>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <div
              className="row"
              style={{
                width: "100%",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3>Select Document to Open</h3>

              <ul className="list-group">
                <li className="list-group-item">
                  <button className="btn microskool-button" style={{float:'right'}} onClick={()=>{
                    navigate('/editor')
                  }}>Open</button>
                  {" "}
                  <FontAwesomeIcon
                    className="text-microskool"
                    icon={faFileEdit}
                  ></FontAwesomeIcon>{" "}
                  Document-Title-Goes-here.<i className="text-secondary">misb</i>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-3"></div>
        </div>
      </div>
    </>
  );
}

export default FileManager;

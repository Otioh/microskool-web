import React, { useEffect, useState } from 'react';
import MicroskoolIcon from "../Images/micro.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faAdd, faDownload, faFile, faFileDownload, faPrint, faSave, faShareAlt} from '@fortawesome/free-solid-svg-icons';
import { EditorState, convertFromRaw, convertToRaw,  } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import axios from 'axios';






function MyEditor() {

const [editorState, setEditorState] = useState(EditorState.createEmpty());
const [filename, setfilename] = useState("document")
const onEditorStateChange = (editorState) => {
  setEditorState(editorState);
  
  axios
    .post("http://localhost:5000/writefile", {
      filename: "print.json",
      data: convertToRaw(editorState.getCurrentContent()),
    })
    .then((res) => {});

};

// useEffect(()=>{
// axios.get("http://localhost:5000/writefile").then((res)=>{
//   console.log(res.data)
//   setEditorState(convertFromRaw(res.data))
// });
// }, [])

const uploadFile=()=>{
}
const saveFile = () => {
axios
  .post("http://localhost:5000/writefile", {
    filename: "print.json",
    data: convertToRaw(editorState.getCurrentContent()),
  })
  .then((res) => {

  });


};
 


  return (
    <>
      <div className="row" style={{ position: "fixed", width: "100vw" }}>
        <div className="row">
          <div className="col-sm-12">
            <span 
              style={{ float: "right" }}
              className=" "
              onClick={() => {
                dispatch(setaddAssignment(true));
              }}
            ></span>
            <div className="menu-icon" style={{ marginTop: "19px" }}>
              <img alt="logo" src={MicroskoolIcon} />
            </div>
            <span style={{ fontSize: "large" }} className={"item-text title"}>
              Microskool Safe Book
            </span>
          </div>
        </div>
        <div className="row">
          <div
            className="col-sm-12"
            style={{ margin: "5px", backgroundColor: "white" }}
          >
            <button className="btn btn-light">
              <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>{" "}
              Document-Title-Goes-here.
              <i className="text-secondary">misb</i>
            </button>

            <button className="btn  margin  ">
              <FontAwesomeIcon icon={faAdd}></FontAwesomeIcon> New
            </button>

            <button className="btn  margin" onClick={saveFile}>
              <FontAwesomeIcon icon={faSave}></FontAwesomeIcon> Save
            </button>

            <button className="btn  margin  ">
              <FontAwesomeIcon icon={faPrint}></FontAwesomeIcon> Print
            </button>

            <button className="btn  margin  ">
              <FontAwesomeIcon icon={faShareAlt}></FontAwesomeIcon> Share
            </button>
            <button className="btn  margin  ">
              <FontAwesomeIcon icon={faDownload}></FontAwesomeIcon> Download
            </button>
          </div>
        </div>
        <div style={{ height: "500px", overflow: "auto" }}>
          <Editor
            editorState={editorState}
            placeholder="Type here"
            onEditorStateChange={(editorState) => {
              onEditorStateChange(editorState);
            }}
            editorStyle={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "5px",
              width: "8.5in",
              border: "solid 1px lightgray",
              marginLeft: "auto",
              marginRight: "auto",
              marginBottom: "50px",
            }}
            toolbar={{
              history: { inDropdown: true },
              image: {
                uploadCallback: uploadFile,
                alt: { present: true, mandatory: false },
                previewImage: true,
                inputAccept:
                  "image/gif,image/jpeg,image/jpg,image/png,image/svg",
              },
            }}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </div>
      </div>
    </>
  );
}



export default MyEditor
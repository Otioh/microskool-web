import { createSlice } from "@reduxjs/toolkit";

const generalReducer=createSlice({
    name:"general",
    initialState:{
        general:{
        courses:[],
        timeTable:[],
        myCourses:[],
        assignments:[{
            id:'hdhs',
            question:'What is a noun',
            date:'23/23',
            deadline:'23/23/',
            lecturer:'Mr Effiong',
            user:'bryonerim@gmail.com',
            image:'http://192.168.43.31:3000/static/media/twelve.87605878a6985f4c4e97.png',
            course:'GSS101'
        }],
        edit:false, 
        logout:false,
        addPeriod:false,
        viewAssignment:false,
        addAssignment:false,
        uploadPix:false,
        assign:{
            id:'hdhs',
            question:'What is a noun',
            date:'23/23',
            deadline:'23/23/',
            lecturer:'Mr Effiong',
            user:'bryonerim@gmail.com',
            image:'http://192.168.43.31:3000/static/media/twelve.87605878a6985f4c4e97.png',
            course:'GSS101'
        }
        }
    },
    reducers:{
        setEdit:(state, action)=>{
            state.general.edit= action.payload;
        },
        setCourse:(state, action)=>{
            state.general.courses= action.payload;
        },
        setUploadPix:(state, action)=>{
            state.general.uploadPix=action.payload;
        },
        updateTimeTable:(state, action)=>{
state.general.timeTable.push(action.payload)
        },
        updateAssign:(state, action)=>{
            state.general.assignments.push(action.payload)
                    },
        setAddPeriod:(state, action)=>{
            state.general.addPeriod= action.payload;
        },
        setaddAssignment:(state, action)=>{
            state.general.addAssignment= action.payload;
        },
        setViewAssignment:(state, action)=>{
            state.general.viewAssignment= action.payload;
        },
        setLogout:(state, action)=>{
            state.general.logout= action.payload;
        },
        wrongVote:(state, action)=>{
         

                    for(let i=0;i<state.general.timeTable.length;i++ ){
                        if(state.general.timeTable[i].id===action.payload && state.general.timeTable[i].voted!=='true'){
                            state.general.timeTable[i].wrong++;
                             state.general.timeTable[i].voted='true';
                             state.general.timeTable[i].votetype='wrong';
                          break;
                        }
                    }
                    
          },
          correctVote:(state, action)=>{
      
            for(let i=0;i<state.general.timeTable.length;i++ ){
              
                if(state.general.timeTable[i].id===action.payload && state.general.timeTable[i].voted!=='true'){
                    state.general.timeTable[i].voted='true';
                    state.general.timeTable[i].correct++;
                    state.general.timeTable[i].votetype='correct';
                    break;
                }
            }
            
  }

    }
})
export const {setCourse, setEdit,setUploadPix,  setLogout, wrongVote, correctVote, setAddPeriod, updateTimeTable, setViewAssignment, addAssignment, setaddAssignment, updateAssign}=generalReducer.actions;
export default generalReducer.reducer;

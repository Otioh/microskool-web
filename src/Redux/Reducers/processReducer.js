import { createSlice } from "@reduxjs/toolkit";

const processReducer=createSlice({
    name:"process",
    initialState:{
        process:{
        count:0,
        processes:[]
       
      }
      
  
        }
    ,
    reducers:{
        updateprocesses:(state, action)=>{
            state.process.processes.push(action.payload);
        },
        setProcesses:(state, action)=>{
            state.process.processes=action.payload
        }

}})
export const {updateprocesses, setProcesses}=processReducer.actions;
export default processReducer.reducer;
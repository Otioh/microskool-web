import { createSlice } from "@reduxjs/toolkit";

const displayReducer=createSlice({
    name:"display",
    initialState:{
        display:{
        navigationFall:true,
        theme:'light',
       load:false,
       spin:false,
       locked:true,
       alert:{
       msg:"Enter your details",
       cap:"Welcome",
       type:"info",
       status:false
      }
      
  
        }
    },
    reducers:{
        updateDisplay:(state, action)=>{
            state.display= action.payload;
        },
        toggleNavFall:(state)=>{
            state.display.navigationFall=!state.display.navigationFall;
        },
        setload:(state, action)=>{
            state.display.load=action.payload;

        },
        setalert:(state, {type, payload})=>{
          
            state.display.alert=
            {...state.display.alert, ...payload}
        },
        setspin:(state, {type, payload})=>{
          
            state.display.spin=payload
        },
        setLocked:(state, {type, payload})=>{
          
            state.display.locked=payload
        }
    }
})
export const {updateDisplay, toggleNavFall, setload, setalert, setspin, setLocked}=displayReducer.actions;
export default displayReducer.reducer;
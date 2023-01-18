import { createSlice } from "@reduxjs/toolkit";

const userReducer=createSlice({
    name:"user",
    initialState:{
        user:{
        email:'',
        password:''
        }
    },
    reducers:{
        updateUser:(state, action)=>{
            state.user= action.payload;
            
        }
    }
})
export const {updateUser}=userReducer.actions;
export default userReducer.reducer;
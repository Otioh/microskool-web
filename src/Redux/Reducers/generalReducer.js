import { createSlice } from "@reduxjs/toolkit";

const generalReducer = createSlice({
  name: "general",
  initialState: {
    general: {
      courses: [],
      timeTable: [],
      transactions: [],
      myCourses: [],
      assignments: [],
      edit: false,
      logout: false,
      addPeriod: false,
      viewAssignment: false,
      addAssignment: false,
      uploadPix: false,
      addCourse: false,
      fundCoins: false,
      transferCoins: false,
      withdrawCoins: false,
      secondUser: "",
      network: true,
      
    },
  },
  reducers: {
    setEdit: (state, action) => {
      state.general.edit = action.payload;
    },
    setFundCoins: (state, action) => {
      state.general.fundCoins = action.payload;
    },
    setTransferCoins: (state, action) => {
      state.general.transferCoins = action.payload;
    },
    setWithdrawCoins: (state, action) => {
      state.general.withdrawCoins = action.payload;
    },
    setMyCourses: (state, action) => {
      state.general.myCourses = action.payload;
    },
    setCourse: (state, action) => {
      state.general.courses = action.payload;
    },
    setUploadPix: (state, action) => {
      state.general.uploadPix = action.payload;
    },
    setNetwork: (state, action) => {
      state.general.network = action.payload;
    },
    setSecondUser: (state, action) => {
      state.general.secondUser = action.payload;
    },
    updateTimeTable: (state, action) => {
      state.general.timeTable.push(action.payload);
    },
    setTimeTable: (state, action) => {
      state.general.timeTable = action.payload;
    },

    updateAssign: (state, action) => {
      state.general.assignments.push(action.payload);
    },
       setAssignments: (state, action) => {
      state.general.assignments=action.payload;
    },
    setAddPeriod: (state, action) => {
      state.general.addPeriod = action.payload;
    },
    setaddCourse: (state, action) => {
      state.general.addCourse = action.payload;
    },
    setaddAssignment: (state, action) => {
      state.general.addAssignment = action.payload;
    },
    setViewAssignment: (state, action) => {
      state.general.viewAssignment = action.payload;
    },
    setLogout: (state, action) => {
      state.general.logout = action.payload;
    },
    setTransactions: (state, action) => {
      state.general.transactions = action.payload;
    },
    setWrongCount: (state, action) => {
 for (let i = 0; i < state.general.timeTable.length; i++) {
   if (
     state.general.timeTable[i].id === parseInt(action.payload.id)
   ) {
     state.general.timeTable[i].wrong=action.payload.count;
    
     break;
   }
 }
    },
    setCorrectCount: (state, action) => {
   for (let i = 0; i < state.general.timeTable.length; i++) {
     if (state.general.timeTable[i].id === parseInt(action.payload.id)) {
       state.general.timeTable[i].correct = action.payload.count;

       break;
     }
   }
    },
    wrongVote: (state, action) => {
      for (let i = 0; i < state.general.timeTable.length; i++) {
        if (
          state.general.timeTable[i].id === parseInt(action.payload) &&
          state.general.timeTable[i].voted !== "true"
        ) {
          state.general.timeTable[i].wrong++;
          state.general.timeTable[i].voted = "true";
          state.general.timeTable[i].votetype = "wrong";
          break;
        }
      }
    },
    correctVote: (state, action) => {
      for (let i = 0; i < state.general.timeTable.length; i++) {
        if (
          state.general.timeTable[i].id === parseInt(action.payload) &&
          state.general.timeTable[i].voted !== "true"
        ) {
          state.general.timeTable[i].voted = "true";
          state.general.timeTable[i].correct++;
          state.general.timeTable[i].votetype = "correct";
          break;
        }
      }
    },
  },
});
export const {
  setCourse,
  setEdit,
  setUploadPix,
  setLogout,
  wrongVote,
  correctVote,
  setAddPeriod,
  updateTimeTable,
  setViewAssignment,
  addAssignment,
  setaddAssignment,
  updateAssign,
  setMyCourses,
  addCourse,
  setaddCourse,
  setNetwork,
  setTransactions,
  setFundCoins,
  setTransferCoins,
  setWithdrawCoins,
  setTimeTable,
  setSecondUser,
  setWrongCount,
  setAssignments,
  setCorrectCount,
} = generalReducer.actions;
export default generalReducer.reducer;

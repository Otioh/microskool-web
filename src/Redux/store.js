import {configureStore} from '@reduxjs/toolkit';
import userReducer from './Reducers/userReducer';
import displayReducer from './Reducers/displayReducer';
import generalReducer from './Reducers/generalReducer';
import processReducer from './Reducers/processReducer';

const store =configureStore({

    reducer: {
    userReducer,
    displayReducer,
    generalReducer,
    processReducer
    }
})

export default store;
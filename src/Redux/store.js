import {configureStore} from '@reduxjs/toolkit';
import userReducer from './Reducers/userReducer';
import displayReducer from './Reducers/displayReducer';
import generalReducer from './Reducers/generalReducer';

const store =configureStore({

    reducer: {
    userReducer,
    displayReducer,
    generalReducer
    }
})

export default store;
import {combineReducers} from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import profileReducer from '../slices/profileSlice';
import pmReducer from '../slices/pmSlice';
import surrogateReducer from '../slices/surrogateSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    pm: pmReducer,
    surrogate: surrogateReducer,
})

export default rootReducer;
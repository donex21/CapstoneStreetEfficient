import courierReducer from './courierReducer';
import  dispatchRiderReducer  from './dispatchRiderReducer';
import officeEmployeeReducer from './officeEmployeeReducer'
import { combineReducers } from 'redux';
import { firestoreReducer }from 'redux-firestore';
import { firebaseReducer, } from 'react-redux-firebase'

const rootReducer = combineReducers({
    dispatchRider : dispatchRiderReducer,
    officeEmployees : officeEmployeeReducer,
    courier : courierReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
});     

export default rootReducer
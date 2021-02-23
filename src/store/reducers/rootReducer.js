import courierReducer from './courierReducer';
import  dispatchRiderReducer  from './dispatchRiderReducer';
import officeEmployeeReducer from './officeEmployeeReducer';
import itemReducer  from './itemReducer';
import { combineReducers } from 'redux';
import { firestoreReducer }from 'redux-firestore';
import { firebaseReducer, } from 'react-redux-firebase';

const rootReducer = combineReducers({
    items: itemReducer,
    dispatchRider : dispatchRiderReducer,
    officeEmployees : officeEmployeeReducer,
    courier : courierReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
});     

export default rootReducer
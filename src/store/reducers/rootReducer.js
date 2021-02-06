import courierReducer from './courierReducer';
import { combineReducers } from 'redux';
import { firestoreReducer }from 'redux-firestore';
import { firebaseReducer, } from 'react-redux-firebase'

const rootReducer = combineReducers({
    courier : courierReducer,
    firestore : firestoreReducer,
    firebase : firebaseReducer
}); 

export default rootReducer
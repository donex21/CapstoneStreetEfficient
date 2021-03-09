import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initstate = {
    add_DispatchRider_Error: null,
    barangays: null,
    selectedRidersEmp: null
}

toast.configure();
const dispatchRiderReducer = (state = initstate, action) => {
    switch(action.type){
        case 'ADD_DISPATCH_RIDER_SUCCESS':
            console.log('ADD_DISPATCH_RIDER_SUCCESS')
            toast.success('Dispatch Rider Sucessfully Saved')
            return{
                ...state,
                add_DispatchRider_Error: null
            } 

        case 'ADD_DISPATCH_RIDER_ERROR':
            console.log(action.err)
            toast.error('Invalid Email or Email Already Exist ')
            return{
                ...state,
                add_DispatchRider_Error: 'Error'
            } 
        case 'SELECTED_DESIGNATE_BARANGAY_SUCCESS':
                return{
                    ...state,
                    barangays: action.barangays
                } 

        case 'GET_SELECTED_RIDERS_EMP':
            return{
                ...state,
                selectedRidersEmp: action.riders
            }

        case 'UPDATE_RIDER_SUCCESS':
            toast.success('Dispatch Rider Successfully Updated ')
            return{
                ...state,
                selectedRidersEmp: action.rider
            }

        default:
            return state
    }

    
}

export default dispatchRiderReducer
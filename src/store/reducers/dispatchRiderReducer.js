import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initstate = {
    add_DispatchRider_Error: null
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

        default:
            return state
    }

    
}

export default dispatchRiderReducer
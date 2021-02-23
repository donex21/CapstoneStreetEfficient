import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const initstate = {
    addItem: null
}

const itemReducer = (state = initstate, action) => {
    switch(action.type){
        case 'ADD_ITEM_TO_PRINT':
            console.log(' ADD_ITEM_TO_PRINT');
            return {
                ...state,
                addItem: action.addItem
            }

        case 'ADD_ITEM_ERROR':
            console.log(' ADD_ITEM_ERROR');
            return state

        case 'ADD_ITEM_SUCCESS':
            toast.success('Package Item Sucessfully Saved')
            return {
                ...state,
                addItem: null
            }
        default:
            return state
    }
}

export default itemReducer
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const initstate = {
    addOffice_Emp_Error: null,
    selectedOfficeEmp: null,
}

toast.configure();
const officeEmployeeReducer = (state = initstate, action) => {
    switch(action.type){
        case 'ADD_OFFICE_EMPLOYEE_SUCCESS':
            console.log('ADD_OFFICE_EMPLOYEE_SUCCESS')
            toast.success('Office Employee Sucessfully Saved')
            return{
                ...state,
                addOffice_Emp_Error: null
            } 

        case 'ADD_OFFICE_EMPLOYEE_ERROR':
            console.log(action.err)
            toast.error('Invalid Email/Password or Email Already Exist ')
            return{
                ...state,
                addOffice_Emp_Error: 'Error'
            } 
        case 'GET_SELECTED_OFFICE_EMP':
            return{
                ...state,
                selectedOfficeEmp: action.emp
            } 
        case 'UPDATE_EMP_SUCCESS':
            console.log('SUCCESSFULLY UPDATED')
            toast.success('Office Employee Sucessfully Updated')
            return{
                ...state,
                selectedOfficeEmp: action.singleEmp
            } 

        default:
            return state
    }

    
}

export default officeEmployeeReducer
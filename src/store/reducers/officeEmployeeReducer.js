const initstate = {
    addOffice_Emp_Error: null
}

const officeEmployeeReducer = (state = initstate, action) => {
    switch(action.type){
        case 'ADD_OFFICE_EMPLOYEE_SUCCESS':
            console.log('ADD_OFFICE_EMPLOYEE_SUCCESS')
            return{
                ...state,
                addOffice_Emp_Error: null
            } 

        case 'ADD_OFFICE_EMPLOYEE_ERROR':
            console.log(action.err)
            return{
                ...state,
                addOffice_Emp_Error: 'Error'
            } 

        default:
            return state
    }

    
}

export default officeEmployeeReducer
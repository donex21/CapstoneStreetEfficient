const initstate = {
    courierId:null,
    courBranch: null,
    courierError:null,
    userError:null,
    newuser: false,
    newPassword: false
}

const courierReducer = (state = initstate, action) => {
    switch(action.type){
        case 'COURIER_ERROR':
            console.log('courier error');
            return {
                ...state,
                courierError: 'INVALID COURIER'
            }

        case 'COURIER_SUCCESS':
            console.log('COURIER_SUCCESS');
            return {
                ...state,
                courierId: action.cour,
                courierError: null
            }

        case 'LOGIN_ERROR':
            console.log('LOGIN_ERROR');
            return {
                ...state,
                userError: 'INVALID EMAIL/PASSWORD'
            }

        case 'LOGIN_SUCCESS':
            console.log('LOGIN_SUCCESS');
            return {
                ...state,
                userError: null,
            }

        case 'NEW_USER_LOGIN':
            console.log('NEW_USER_LOGIN');
            return {
                ...state,
                userError: null,
                newuser: true
            }

        case 'SIGNOUT_SUCCESS':
            console.log('signout success');
            return{
                ...state,
                newuser: false
            } 

        case 'UPDATE_NEWPASSWORD_SUCCESS':
            console.log('UPDATE_NEWPASSWORD_SUCCESS');
            return{
                ...state,
                newuser: false,
                newPassword: true
            } 

        case 'UPDATE_NEWPASSWORD_ERROR':
            console.log('UPDATE_NEWPASSWORD_ERROR');
            return{
                ...state,
                newuser: true
            }          

        case 'GET_COURIER_ID_SUCCESS':
            console.log('GET_COURIER_ID_SUCCESS');
            return{
                ...state,
                courierId: action.cour_id,
                courBranch: action.cour_branch
            } 

        default:
            return state
     }
}

export default courierReducer
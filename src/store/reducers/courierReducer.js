const initstate = {
    courierError:null,
    courierId:null,
    userEmail:null,
    userBranch:null,
    userError:null,
    userID:null,
    newuser: false
}

const courierReducer = (state = initstate, action) => {
    switch(action.type){
        case 'COURIER_ERROR':
            console.log('courier error');
            return {
                ...state,
                courierId:null,
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
        case 'LOGIN_ERROR_A':
            console.log('LOGIN_ERROR_A');
            return {
                ...state,
                userID: action.userid,
                userError: 'INVALID EMAIL/PASSWORD'
            }

        case 'LOGIN_SUCCESS':
            console.log('LOGIN_SUCCESS');
            return {
                ...state,
                userError: null,
                userEmail : action.useremail,
                userBranch : action.userbranch,
                userID: action.userid
            }

        case 'NEW_USER_LOGIN':
            console.log('NEW_USER_LOGIN');
            return {
                ...state,
                userError: null,
                userEmail : action.useremail,
                userBranch : null,
                userID: action.userid,
                newuser: true
            }

        default:
            return state
        }
}

export default courierReducer
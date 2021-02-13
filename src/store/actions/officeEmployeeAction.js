export const addOfficeEmployee = (officeEmployeeSignup) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        const password = 'admin123';

        const getFirebaseApp = (name, config) => {
          let foundApp = firebase.apps.find(app => app.name === name);
          return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
        }
      
      let authWorkerApp = getFirebaseApp('auth-worker');
  
        //let authWorkerApp = firebase.initializeApp(firebase.app().options, 'auth-employee');
        let authWorkerAuth = firebase.auth(authWorkerApp);
        authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);

        authWorkerAuth.createUserWithEmailAndPassword(
            officeEmployeeSignup.email,
            password
        ).then( resp => {
              return firestore.collection('Office_Employees').doc(resp.user.uid).set({
                  ...officeEmployeeSignup,
                  id : resp.user.uid,
                  password: password
              }).then(() => {
                    dispatch({type: 'ADD_OFFICE_EMPLOYEE_SUCCESS' });
                }).catch( (err) => {
                    dispatch( {type: 'ADD_OFFICE_EMPLOYEE_ERROR', err});
            });
            
         }).catch( (err) => {
            dispatch( {type: 'ADD_OFFICE_EMPLOYEE_ERROR', err});;
        })
  
    }
}
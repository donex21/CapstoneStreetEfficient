export const addDispatchRiderInFirebase = (addDispatchRider) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        const password = 'rider123';

        const getFirebaseApp = (name, config) => {
          let foundApp = firebase.apps.find(app => app.name === name);
          return foundApp ? foundApp : firebase.initializeApp(config || firebase.app().options, 'auth-worker');
        }
      
      let authWorkerApp = getFirebaseApp('auth-worker');
  
        let authWorkerAuth = firebase.auth(authWorkerApp);
        authWorkerAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);

        authWorkerAuth.createUserWithEmailAndPassword(
            addDispatchRider.email,
            password
        ).then( resp => {
              return firestore.collection('Dispatch Riders').doc(resp.user.uid).set({
                  ...addDispatchRider,
                  id : resp.user.uid,
                  password: password
              }).then(() => {
                    dispatch({type: 'ADD_DISPATCH_RIDER_SUCCESS' });
                }).catch( (err) => {
                    dispatch( {type: 'ADD_DISPATCH_RIDER_ERROR', err});
            });
            
         }).catch( (err) => {
            dispatch( {type: 'ADD_DISPATCH_RIDER_ERROR', err});;
        })
  
    }
}

export const SelectDesignateBarangay = (cityID) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        var barangays = [];
        firestore.collection("cities").doc(cityID).collection("barangay").get()
        .then(querySnapshot => {
            if(!querySnapshot.empty){
                    querySnapshot.forEach(doc => {
                        //console.log(doc.id, " => ", doc.data());
                        barangays.push(doc.data());   
                    });
                    dispatch({type: 'SELECTED_DESIGNATE_BARANGAY_SUCCESS', barangays});  
             }
        });
    }
}
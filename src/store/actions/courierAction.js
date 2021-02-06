 export const signInCourier = (validCourier) => {
    return (dispatch, getState, { getFirebase }) => {
      const firestore = getFirebase().firestore();
     
    firestore.collection("Couriers_Company")
    .where("Courier_Code", "==", validCourier.courierCode)
    .where("Courier_Status", "==", "active")
    .get()
    .then((querySnapshot) => {
        var courlist = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            courlist.push(doc.id);
        });
        let cour = courlist[0];

        if(cour != null)
        {
          dispatch({ type: 'COURIER_SUCCESS' , cour });
        }else{
          dispatch({ type: 'COURIER_ERROR' });
        }
        
    })
    .catch((err) => {
        dispatch({ type: 'COURIER_ERROR' });
    });
    }
  }

  export const signInAuth = (emailPwd) => {
      return (dispatch, getState, { getFirebase }) => {
          const firestore = getFirebase().firestore();
          const firebase = getFirebase();

          firestore.collection("Office_Employees")
          .where("email", "==", emailPwd.email)
          .where("password", "==", emailPwd.password)
          .where("courier_id", "==", getState().courier.courierId)
          .where("status", "==", "active")
          .get()
          .then((querySnapshot) => {
              var users_ID =[];
              var users_email = [];
              var users_password = [];
              var users_branch = [];
              querySnapshot.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  //console.log(doc.id, " => ", doc.data());
                  users_ID.push(doc.id);
                  users_email.push(doc.data['email']);
                  users_password.push(doc.data['password']);
                  users_branch.push(doc.data['branch']);
              });
              let userid = users_ID[0];
              let useremail = users_email[0];
              let userpassword = users_password[0];
              let userbranch = users_branch[0];
              if(useremail)
              {
                  firebase.auth().signInWithEmailAndPassword(
                      useremail, userpassword)
                  .then(() => {
                      dispatch({ type: 'LOGIN_SUCCESS',  useremail, userbranch, userid});
                  })
                  .catch(() => {                   
                      dispatch({ type: 'NEW_USER_LOGIN', userid, useremail});
                  });
              }else{
                dispatch({ type: 'LOGIN_ERROR_A', userid });
              }
              
          })
          .catch((err) => {
              dispatch({ type: 'LOGIN_ERROR' });
          });
      }
  } 
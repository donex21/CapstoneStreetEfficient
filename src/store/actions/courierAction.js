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
          dispatch({ type: 'COURIER_SUCCESS', cour});
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

            var users_email = [];
            var users_password = [];
            var users_jobtitle = [];
            var users_fname = [];
            var users_lname =[];
            var users_branch = [];

          firestore.collection("Office_Employees")
          .where("email", "==", emailPwd.email)
          .where("password", "==", emailPwd.password)
          .where("status", "==", "active")
          .where("courier_id", "==", emailPwd.courier_id)
          .get() 
          .then((querySnapshot) => {
              if(!querySnapshot.empty){
                    querySnapshot.forEach((doc) => {
                        users_email.push(doc.data().email);
                        users_password.push(doc.data().password);
                        users_jobtitle.push(doc.data().jobtitle);
                        users_fname.push(doc.data().fname);
                        users_lname.push(doc.data().lname);
                        users_branch.push(doc.data().branch)
                    });
   
                    let useremail = users_email[0];
                    let userpassword = users_password[0];
                    let userjobtitle = users_jobtitle[0];
                    let userfname = users_fname[0];
                    let userlname = users_lname[0];
                    let userbranch = users_branch[0];


                        firebase.auth().signInWithEmailAndPassword(useremail, userpassword)
                        .then(() => {
                            firebase.auth().currentUser.updateProfile({displayName: userjobtitle + '@'+ userfname + ' ' + userlname});
                            if(userpassword === 'admin123')
                            {
                                dispatch({ type: 'NEW_USER_LOGIN', userbranch});
                            }else{
                                dispatch({ type: 'LOGIN_SUCCESS', userbranch});
                            }
                        })
                        .catch(() => {                   
                            dispatch({ type: 'LOGIN_ERROR' });
                        });
                    
              }else{
                dispatch({ type: 'LOGIN_ERROR' });
              }             
          })
          .catch((err) => {
              dispatch({ type: 'LOGIN_ERROR' });
          });

            
      }
  } 

  export const signOut = () => {
    return (dispatch, getState, {getFirebase}) => {
      const firebase = getFirebase();
      firebase.auth().signOut().then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' })
      }).catch(() => {
        // An error happened.
    
    });    
    }
  }

export const updateNewPassword = (newPassword) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const firestore = getFirebase().firestore();
        const user = firebase.auth().currentUser;

        user.updatePassword(newPassword).then(() => {
            // Update successful.
            firestore.collection("Office_Employees").doc(user.uid).update({password : newPassword})
            .then(() => {
                dispatch({type: 'UPDATE_NEWPASSWORD_SUCCESS'})
            }).catch(() => {
                // An error happened.
                dispatch({type: 'UPDATE_NEWPASSWORD_ERROR'})
            });         
          }).catch(() => {
            // An error happened.
            dispatch({type: 'UPDATE_NEWPASSWORD_ERROR'})
          });
    }
}

export const getCourierID = (authID) => {
  return (dispatch, getState, {getFirebase}) => {
    const firestore = getFirebase().firestore();

    const docRef = firestore.collection("Office_Employees").doc(authID);
      docRef.get().then((doc) => {
          if (doc.exists) {
              //console.log("Document data:", doc.data());
              var cour_id = doc.data().courier_id;
              var cour_branch = doc.data().branch;
              dispatch({type: 'GET_COURIER_ID_SUCCESS', cour_id, cour_branch})
          }
      }).catch(() => {
          // An error happened.
      });  
  }
}


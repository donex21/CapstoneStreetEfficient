import firebase from '../config/fbConfig'


export const activeTextSwitch = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 15,
    color: "#fff",
    paddingLeft: 5
}

export const inactiveTextSwitch = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    fontSize: 15,
    color: "#fff",
    paddingRight: 20
}
export const customStyles = {
    control: (base, state) => ({
      ...base,
      height: 10,
      background: "rgba(57, 129, 229, 0.2)",
      borderRadius: state.isFocused ? "3px 3px 0 0" : 3,
      borderColor: state.isFocused ? "yellow" : "green",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: state.isFocused ? "red" : "blue"
      }
    }),
    menu: base => ({
      ...base,     
      borderRadius: 0,
      marginTop: 0,
    }),
    menuList: base => ({
      ...base,
      padding: 0
    })
  };
 
export const getRandomString = (length) => {
    var result = '';
         
        function collectors(callback){
          result = '';
          var randomChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';    
          for ( var i = 0; i < length; i++ ) {
              result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          } 
          var docRef = firebase.firestore().collection("Items").doc(result);
          docRef.get().then(function (doc) {
              if (!doc.exists) {
                  callback(result); 
              } else {
                  collectors(callback); 
              }
          }).catch(function (error) {
              callback(null); 
          });
        }
        
        collectors(function(store){ 
         result = store;
        });
    //console.log(result)
    return result;
    
}

export const calculate_age = (bdate) => {
  var today = new Date();
  var birthDate = new Date(bdate);
  var age_now = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
  {
      age_now--;
  }
  console.log(age_now);
  return age_now;
}


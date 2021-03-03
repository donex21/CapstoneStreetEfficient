export const addItemToPrint = (addItem) => {
    return (dispatch, getState) => {
        dispatch({type: 'ADD_ITEM_TO_PRINT', addItem });
    }
}

export const addItemDB = (addItem) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore.collection('Items').doc(addItem.item_id).set({
           ...addItem
        }).then(() => {
              dispatch({type: 'ADD_ITEM_SUCCESS' });
          }).catch( () => {
              dispatch( {type: 'ADD_ITEM_ERROR' });
      });
    }
} 

export const getSelectedUnassignedItem = (item) => {
    return (dispatch, getState) => {
        dispatch( {type: 'GET_SELECTED_UNASSIGNED_ITEM', item});
    }
}

export const getBranchBarangays = (courBranch) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore.collection("Branch").where("branch_name", "==", courBranch)
        .get()
        .then((querySnapshot) => {
            var cities = [];
            querySnapshot.forEach((doc) => {
                cities.push(doc.data().city_id);
            });
            let city = cities[0];
            //console.log(city);
            var barangays = [];
            firestore.collection("cities").doc(city).collection("barangay").get()
            .then(querySnapshot => {
                if(!querySnapshot.empty){
                        querySnapshot.forEach(doc => {
                            //console.log(doc.id, " => ", doc.data());
                            barangays.push(doc.data());   
                        });
                        dispatch({type: 'GET_BARANGAY_SUCCESS', barangays});  
                }
            });
        }).catch(() => {
            console.log("Error getting document:");
        });
        
    }
}

export const addItemDel = (itemDel) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        var newDocRef = firestore.collection('Delivery_Items').doc()
        newDocRef.set({
           ...itemDel, 
           del_item_id: newDocRef.id
        }).then(() => {
            firestore.collection("Items").doc(itemDel.item_id).update({
                "status": "assigned"});
              dispatch({type: 'ADD_ITEM_DEL_SUCCESS' });
          }).catch( () => {
              dispatch( {type: 'ADD_ITEM_DEL_ERROR' });
      });
    }
} 


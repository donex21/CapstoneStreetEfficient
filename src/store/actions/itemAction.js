import moment from 'moment'; 

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

///Delivery_header initialized in SelectAssignRider.js
export const addItemDel = (itemDel, courName) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        var newDocRef = firestore.collection('Delivery_Header').doc()
        newDocRef.set({
           ...itemDel, 
           del_date_sched_string:  moment(itemDel.del_date_sched).format('LL').toString(),
           del_item_id: newDocRef.id
        }).then(() => {
            firestore.collection("Items").doc(itemDel.item_id).update({
                "status": "assigned"});
                let recipientCN = itemDel.itemRecipientContactNumber + "";
                let recipient = recipientCN.slice(1, recipientCN.length);
                let textmessage = "Hi Good Day! This is "+ courName +". Your Item will be scheduled deliver on "+ moment(itemDel.del_date_sched).format('LL').toString();

                fetch(`http://127.0.0.1:4000/send-text?recipient=${recipient}&textmessage=${textmessage}`)
                .catch(err => console.error(err))

              dispatch({type: 'ADD_ITEM_DEL_SUCCESS' });
          }).catch( () => {
              dispatch( {type: 'ADD_ITEM_DEL_ERROR' });
      });
    }
} 

export const updateReturnItem = (item_id) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();

        firestore.collection("Items").doc(item_id).update({
            "status": "returned"});
        dispatch({type: 'RETURNED_ITEM_UPDATE_SUCCESS' });
    }
}

export const updateReschedItem = (itemDel) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore.collection("Delivery_Header").where("item_id", "==", itemDel.item_id).get()
        .then(querySnapshot => {
            var IDs = [];       
            querySnapshot.forEach(doc => {
                //console.log(doc.id, " => ", doc.data());
                IDs.push(doc.id)
            });
            let id = IDs[0];
            firestore.collection("Delivery_Header").doc(id).update(
                {"del_date_sched": itemDel.del_date_sched,
                "del_date_sched_string":  moment(itemDel.del_date_sched).format('LL').toString()
            });

            firestore.collection("Delivery_Attempt").doc(itemDel.item_id).update({
                "status": "reschedule"});

            dispatch({type: 'RESCHEDULE_ITEM_SUCCESS' });
        });
    }
}


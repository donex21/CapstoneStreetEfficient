export const addItemToPrint = (addItem) => {
    return (dispatch, getState) => {
        dispatch({type: 'ADD_ITEM_TO_PRINT', addItem });
    }
}

export const addItemDB = (addItem) => {
    return (dispatch, getState, {getFirebase}) => {
        const firestore = getFirebase().firestore();
        firestore.collection('Items').doc(addItem.itemTrackingNumber).set({
           addItem
        }).then(() => {
              dispatch({type: 'ADD_ITEM_SUCCESS' });
          }).catch( () => {
              dispatch( {type: 'ADD_ITEM_ERROR' });
      });
    }
}   
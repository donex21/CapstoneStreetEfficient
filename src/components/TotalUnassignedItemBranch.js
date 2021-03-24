import React, { useState, useEffect} from 'react'
import fire from '../config/fbConfig' 
import RingLoader from "react-spinners/RingLoader";

const TotalUnassignedItemBranch = (props) => {
    const { courierID, courBranch} = props;
    const [totalUnassignedItem, setTotalUnassignedItem] = useState('');
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID)
        .where("itemRecipientBranch", "==", courBranch)
        .where("status", "==", "unassigned");

    function getTotalUnassignedItem(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++;
            });
            setTotalUnassignedItem(count.toString());
            setLoading(false);
        })
    }
    
    useEffect(() => {
        getTotalUnassignedItem();
     
    }, []);

    if(loading){
        return <RingLoader size = {30} color = {'#1D927A'} loading = {loading}/>
    }
    return (
        <div className ="card cardcolor">
            <div className="card-body">
                <h3 className="card-title">Total Unassigned Items </h3>  
                <h2 className="card-title">{totalUnassignedItem} Items </h2>  
                <p className="card-text"> Items that need Assign Dispatch Rider inorder to deliver into the recipient</p>                            
            </div>
        </div>
    )
}

export default TotalUnassignedItemBranch

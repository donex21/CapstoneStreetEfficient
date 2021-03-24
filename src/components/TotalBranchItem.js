import React, { useEffect, useState } from 'react'
import fire from '../config/fbConfig' 
import RingLoader from "react-spinners/RingLoader";

const TotalBranchItem = (props) => {
    const { courierID, courBranch} = props;
    const [totalBranchItem, setTotalBranchItem] = useState('');
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID)
        .where("itemSenderBranch", "==", courBranch);

    function getBranchItem(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++;
            });
            setTotalBranchItem(count.toString());
            setLoading(false);
        })
    }

    useEffect(() => {
        getBranchItem()
    }, [])

    if(loading){
        return <RingLoader size = {30} color = {'#1D927A'} loading = {loading}/>
    }

    return (
        <div className ="card cardcolor">
            <div className="card-body">
                <h3 className="card-title">Branch Items</h3>
                <h2 className="card-title">{totalBranchItem} Items</h2>
                <p className="card-text">Items that the warehouse branch encoded to the system</p>                       
            </div>
        </div>
    )
}

export default TotalBranchItem

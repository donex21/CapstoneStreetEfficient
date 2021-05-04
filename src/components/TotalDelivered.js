import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 
import RingLoader from "react-spinners/RingLoader";

export const TotalDelivered = (props) => {

    const { courierID, courBranch} = props;
    const [totalDeliveredItems, setTotalDeliveredItems] = useState('');
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID)
        .where("itemRecipientBranch", "==", courBranch)
        .where("status", "==", "delivered");

    function getBranchItem(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++;
            });
            setTotalDeliveredItems(count.toString());
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
                <h3 className="card-title">Total Items Delivered</h3>
                <h2 className="card-title">{totalDeliveredItems} Items</h2>
                <p className="card-text">Total of Items Delivered Successfully</p>                       
            </div>
        </div>
    )
}

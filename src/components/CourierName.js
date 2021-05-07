import React, { useEffect, useState } from 'react'
import firebase from '../config/fbConfig'
import RingLoader from "react-spinners/RingLoader";

const CourierName =  (props) => {
    const {courierID, courBranch} = props;
    const [courName, setCourName] = useState('');
    const [loading, setLoading] = useState(false);

    var docRef = firebase.firestore().collection("Couriers_Company").doc(courierID);

    function getCourName(){
        setLoading(true);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setCourName(doc.data().Courier_Name);  
            }
            setLoading(false);
        });
    }
    useEffect(() => {
        getCourName();
    }, [])

    if(loading){
        return <RingLoader size = {30} color = {'#1D927A'} loading = {loading}/>
    }

    return (
        <div className = "d-flex justify-content-center headerCourName">
            <h2>{courName} {courBranch} Branch</h2>
        </div>
    )
}

export default CourierName

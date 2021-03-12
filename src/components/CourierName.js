import React, { useEffect, useState } from 'react'
import firebase from '../config/fbConfig'

const CourierName =  (props) => {
    const {courierID} = props;
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
        return <p>loading....</p>
    }

    return (
        <div className = "d-flex justify-content-center headerCourName">
            <h2>{courName}</h2>
        </div>
    )
}

export default CourierName

import React, { useState, useEffect} from 'react'
import { connect } from 'react-redux';
import {useHistory} from 'react-router'
import RingLoader from "react-spinners/RingLoader";
import { compose } from 'redux';
import {getCourierID} from '../store/actions/courierAction';
import {firestoreConnect} from 'react-redux-firebase'

const SplashScreen = (props) => {
    const { auth } = props;
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        props.getCourierID(auth)
    }, [])

    useEffect(() => {
       setLoading(true)
       setTimeout(() => {
            setLoading(false)
       }, 4000)
      
    },[]);

    return (
        <div className = "splash_container">
            {loading ? (
                <RingLoader size = {100} color = {'#1D927A'} loading = {loading}/>
            ) : history.push('/home') }
        </div>
    )
}

const mapStateToProps = (state) =>{
    console.log(state)
    return{
        auth: state.firebase.auth.uid,
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{    
       getCourierID: (authUid) => dispatch(getCourierID(authUid))
    }
}

export default compose(connect(mapStateToProps, mapDispatchToProps),
firestoreConnect((props) => [
    {
        collection: 'Office_Employees',
        where: [
            ['courier_id', '==', props.courierID],
            ['branch', '==', props.courBranch]
        ]
    },
    {
        collection: 'Branch',
        where: [
            ['Courier_id', '==', props.courierID],
            ['status', '==', 'active']
        ]
    },
    {
        collection: 'Items',
        where: [
            ['courier_id', '==', props.courierID],
            ['itemRecipientBranch', '==', props.courBranch]
        ]
    },
])

)(SplashScreen)

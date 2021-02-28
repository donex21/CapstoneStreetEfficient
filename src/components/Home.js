import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux' 
//import fire from '../config/fbConfig'

import {getCourierID} from '../store/actions/courierAction';

function Home(props) {
    // const logout= () =>{
    //     fire.auth().signOut();
    //     window.location.href = '/'
    // }

    const { auth } = props;
    const authid = auth.uid;
    useEffect(() => {
            props.getCourierID(authid);    
            // eslint-disable-next-line     
    }, [])
    
    return (
        <div>
            Home
            {/* <button onClick={logout}>Logout</button> */}
        </div>
    )
}
//export default Home
const mapStateToProps = (state) =>{
    //console.log(state)
    return{
        auth: state.firebase.auth,
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{    
       getCourierID: (authUid) => dispatch(getCourierID(authUid))
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps ),
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
        {
            collection: 'Dispatch Riders',
            where: [
                ['courier_id', '==', props.courierID],
                ['branch', '==', props.courBranch]
            ]
        },

    ])
) (Home)

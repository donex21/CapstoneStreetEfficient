import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux' 

import {getCourierID} from '../store/actions/courierAction';
import CourierName from './CourierName';
import TotalBranchDispatchRider from './TotalBranchDispatchRider';
import TotalBranchItem from './TotalBranchItem';
import TotalBranchOfficeEmployees from './TotalBranchOfficeEmployees';
import TotalUnassignedItemBranch from './TotalUnassignedItemBranch';

function Home(props) {
    const { courierID,courBranch } = props;
    // const authid = auth.uid;
    // useEffect(() => {        
    //     props.getCourierID(authid);    
    // }, [])

    
    return (
        <div className = "container main-cntr">
            <CourierName  courierID = {courierID}/>
            <div className = "row">
                <div className = "col-sm-10">
                    <div className = "row cardHomeMargin">
                        <div className = "col-sm-6">
                            <TotalUnassignedItemBranch courierID = {courierID} courBranch = {courBranch}  />
                        </div>
                        <div className = "col-sm-6">
                             <TotalBranchItem courierID = {courierID} courBranch = {courBranch}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-sm-6">
                            <TotalBranchDispatchRider courierID = {courierID} courBranch = {courBranch} />
                        </div>
                        <div className = "col-sm-6">
                            <TotalBranchOfficeEmployees courierID = {courierID} courBranch = {courBranch} />
                        </div>                        
                    </div>
                </div>
                <div className = "col-sm-2">
                    <h3>Attempt Container</h3>
                </div>
            </div>        
        </div>
    )
}
const mapStateToProps = (state) =>{
    console.log(state)
    return{
        // auth: state.firebase.auth,
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

// const mapDispatchToProps = (dispatch) =>{
//     return{    
//        getCourierID: (authUid) => dispatch(getCourierID(authUid))
//     }
// }

export default compose( connect(mapStateToProps),
// firestoreConnect((props) => [
//     {
//         collection: 'Office_Employees',
//         where: [
//             ['courier_id', '==', props.courierID],
//             ['branch', '==', props.courBranch]
//         ]
//     },
//     {
//         collection: 'Branch',
//         where: [
//             ['Courier_id', '==', props.courierID],
//             ['status', '==', 'active']
//         ]
//     },
//     {
//         collection: 'Items',
//         where: [
//             ['courier_id', '==', props.courierID],
//             ['itemRecipientBranch', '==', props.courBranch]
//         ]
//     },
// ])
)
(Home)

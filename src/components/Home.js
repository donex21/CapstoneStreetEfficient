import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import fire from '../config/fbConfig' 

import AttemptContainer from './AttemptContainer';
import CourierName from './CourierName';
import LowestPerformanceRiders from './LowestPerformanceRiders';
import TodaysDeliverySched from './TodaysDeliverySched';
import TotalBranchDispatchRider from './TotalBranchDispatchRider';
import TotalBranchItem from './TotalBranchItem';
import TotalBranchOfficeEmployees from './TotalBranchOfficeEmployees';
import { TotalDelivered } from './TotalDelivered';
import TotalUnassignedItemBranch from './TotalUnassignedItemBranch';

function Home(props) {
    const { courierID,courBranch } = props; 
    const [loading , setLoading] = useState(false);
    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID).where("itemRecipientBranch", "==", courBranch).where("status", "==", "assigned");
    var tempDate = new Date();
    var currentDate = new Date (tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());
    function reAssignItems(){
        setLoading(true);
        ref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item_id =  doc.data().item_id;
                const docref = fire.firestore().collection("Delivery_Header").where("item_id", "==", item_id).where("del_date_sched", "<", currentDate)
                docref.get().then((querySnapshot1) => {
                    querySnapshot1.forEach((doc1) => {
                        var del_item_id = doc1.data().del_item_id;
                        const docref2 = fire.firestore().collection("Delivery_Attempt").where("id", "==", item_id).where("status", "==", "back_to_warehouse");
                        docref2.get().then((querySnapshot2) => {
                            if(querySnapshot2.empty){
                                fire.firestore().collection("Delivery_Header").doc(del_item_id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });
                                fire.firestore().collection("Delivery_Attempt").doc(item_id).delete().then(() => {
                                    console.log("Document successfully deleted!");
                                }).catch((error) => {
                                    console.error("Error removing document: ", error);
                                });
                                fire.firestore().collection("Items").doc(item_id).update({
                                    "status": "unassigned"});
                            }else{
                                console.log("empty");
                            }
                        });
                    });
                });
            });
            setLoading(false);
        });
    }

  //console.log(currentDate)
    useEffect(() => {
        reAssignItems();
    }, [])
    if(loading){
        return <p>loading...</p>
    }
    return (
        <div className = "container main-cntr">
            <CourierName  courierID = {courierID} courBranch = {courBranch}/>
            <div className = "row">
                <div className = "col-sm-9">
                    <div className = "row cardHomeMargin">
                        <div className = "col-sm-6">
                            <TotalUnassignedItemBranch courierID = {courierID} courBranch = {courBranch}  />
                        </div>
                        <div className = "col-sm-6">
                             <TotalBranchItem courierID = {courierID} courBranch = {courBranch}/>
                        </div>
                    </div>
                    <div className = "row cardHomeMargin ">
                        <div className = "col-sm-6">
                            <TotalBranchDispatchRider courierID = {courierID} courBranch = {courBranch} />
                        </div>
                        <div className = "col-sm-6">
                            <TotalBranchOfficeEmployees courierID = {courierID} courBranch = {courBranch} />
                        </div>                        
                    </div>
                    <div className = "row">
                        <div className = "col-sm-6">
                            <TotalDelivered courierID = {courierID} courBranch = {courBranch} />
                        </div>
                        <div className = "col-sm-6">
                            <LowestPerformanceRiders courierID = {courierID} courBranch = {courBranch} />
                        </div>                        
                    </div>
                </div>
                <div className = "col-sm-3">
                    <AttemptContainer />
                </div>
            </div>    
            <hr></hr>   
            <TodaysDeliverySched /> 
        </div>
    )
}
const mapStateToProps = (state) =>{
    console.log(state)
    return{
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}


export default connect(mapStateToProps)(Home)

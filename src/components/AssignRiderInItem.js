import React, {useMemo, useEffect, useState} from 'react'
import { connect } from 'react-redux';
import fire from '../config/fbConfig' 
import { useHistory} from 'react-router-dom';
import moment from 'moment';
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { AssignRiderColumns } from './TableColumns';
import { getSelectedUnassignedItem, getBranchBarangays } from '../store/actions/itemAction';

const AssignRiderInItem = (props) => {
    const {courierID, courBranch} = props;
    const history = useHistory();
    const [item , setItem] = useState([]);
    const [loading , setLoading] = useState(false);
    
    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID)
        .where("itemRecipientBranch", "==", courBranch)
        .where("status", "==", "unassigned");

    function getItem(){
        setLoading(true);
        ref.onSnapshot((querySnapshot) => {     
            var itemsdata= [];
                querySnapshot.forEach((doc) => {  
                    var itemObj = {
                        item_id: doc.data().item_id,
                        itemSendername: doc.data().itemSendername,
                        itemSenderContactNumber: doc.data().itemSenderContactNumber,
                        itemSenderAddressStreet: doc.data().itemSenderAddressStreet,
                        itemSenderAddressBarangay: doc.data().itemSenderAddressBarangay,
                        itemSenderAddressCity: doc.data().itemSenderAddressCity,
                        itemSenderAddressProvince: doc.data().itemSenderAddressProvince,
                        itemRecipientname: doc.data().itemRecipientname,
                        itemRecipientContactNumber: doc.data().itemRecipientContactNumber,
                        itemRecipientAddressStreet: doc.data().itemRecipientAddressStreet,
                        itemRecipientAddressBarangay: doc.data().itemRecipientAddressBarangay,
                        itemRecipientAddressCity: doc.data().itemRecipientAddressCity,
                        itemRecipientAddressProvince: doc.data().itemRecipientAddressProvince, 
                        itemRecipientBranch: doc.data().itemRecipientBranch,
                        itemSenderBranch: doc.data().itemSenderBranch,
                        itemqty: doc.data().itemqty,
                        itemweight: doc.data().itemweight,
                        itemCOD: doc.data().itemCOD,
                        courier_id: doc.data().courier_id, 
                        status: doc.data().status,
                        encodedBy: doc.data().encodedBy,
                        date_encoded: moment(doc.data().date_encoded.toDate()).format('LL').toString(),
                    }                
                    itemsdata.push(itemObj)
                });
               setItem(itemsdata);
               setLoading(false);
        });    
    }
    
        
    useEffect(() => {
        getItem();
    }, [])
    
    const columns = useMemo(() => AssignRiderColumns, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           // console.log(row);
            props.getSelectedUnassignedItem(row)
            props.getBranchBarangays(courBranch)
            history.push('/selectAssignRider');
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
      };
      

      if(loading){
          return <p>loading.....</p>
      }

    return (
        <div className = "container-fluid">
            <div className = "row justify-content-md-center">
                <h1>Assign Dispatch Rider</h1>   
            </div>           
            <div className = "ARtable">
                <BootstrapTable
                striped 
                keyField = "item_id"
                data = {item}
                columns = {columns}
                pagination = {paginationFactory()}
                rowEvents = {rowEvents}
                selectRow = {selectRow}
                sort={ { dataField: 'date_encoded', order: 'asc' } }
                />
            </div> 
            <div>
                <button className = "btn-primary" onClick = {() => {history.push('/items')}}>Back</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    //console.log(state)
    return{
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getSelectedUnassignedItem: (item) => dispatch(getSelectedUnassignedItem(item)),
        getBranchBarangays: (courBranch) => dispatch(getBranchBarangays(courBranch)),
    }
}
export default compose(
    connect(mapStateToProps, mapDispatchToProps ),
    firestoreConnect((props) => [
        {
        collection: 'Dispatch Riders',
        where: [
            ['courier_id', '==', props.courierID],
            ['branch', '==', props.courBranch]
        ]
    },
])
) (AssignRiderInItem)


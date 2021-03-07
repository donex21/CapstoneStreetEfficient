import React, { useMemo, useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import fire from '../config/fbConfig';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { DispatchRidersAssign } from './TableColumns';
import { addItemDel } from '../store/actions/itemAction';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const SelectAssignRider = (props) => {
    const history = useHistory();
    const {item, auth, dispatchRiders, barangays} = props;   
    const [showRiderList, setShowRiderList] =useState(false);
    let displayName = auth.displayName;
    let assignedBY = displayName.split("@");
    const [dRName, setDRName] = useState("");

    const [itemDel, setItemDel] = useState({
        item_id: item.item_id,
        rider_id: null,
        assignedby: assignedBY[1],
        date_assigned: new Date(),
        del_date_sched: null,
        item_weight: item.itemweight,
        itemRecipientContactNumber: item.itemRecipientContactNumber,
    });

    const columns = useMemo(() => DispatchRidersAssign, []);
    const rowEvents = {
        onClick: (e, row) => {
            //console.log(row.id);   
            setItemDel({...itemDel, rider_id: row.id})
            setDRName(row.fname + " " + row.mname + " " + row.lname)
        }
    }

    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
      };

    const onClickshowRider = (e) =>{
        e.preventDefault();
        itemDel.del_date_sched ? setShowRiderList(true): setShowRiderList(false) 
        setDRName('')
        setItemDel({...itemDel, rider_id: ''})
    }

    const [selectedbrgy, setSelectedBrgy] = useState(item.itemRecipientAddressBarangay);
    const [newBrgy, setNewBrgy] = useState([]);
    const [bry, setbry] = useState([]);

    function firstFilterBrgy () {
        let riderslist = [] 
        dispatchRiders && dispatchRiders.map((rider, index) =>{           
            let counter = 0;
            let weightSum = 0;
            fire.firestore().collection("Delivery_Header")
            .where("rider_id", "==", rider.id)
            .where("del_date_sched", "==", itemDel.del_date_sched)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    weightSum = weightSum + parseInt(doc.data().item_weight);
                    counter ++;
                });
                var riders = {
                    id: rider.id,
                    fname: rider.fname,
                    mname: rider.mname,
                    lname: rider.lname,
                    designateBarangay: rider.designateBarangay,
                    vehicle_type: rider.vehicle_type,
                    contactNumber: rider.contactNumber,
                    itemdaytotal: counter.toString(),
                    itemtotalweight: weightSum.toString()
                };
                riderslist.push(riders)
            })     
        });
        setbry(riderslist);
        console.log(bry)       
        let newArray = bry.filter((rider) => {
            let searchValue = rider.designateBarangay;
            return searchValue.indexOf(item.itemRecipientAddressBarangay) !==-1;
        });
        setNewBrgy(newArray);   
       
    }

    useEffect(() => {
        firstFilterBrgy();
    },[itemDel.del_date_sched])


   // console.log(dispatchRiders)

    const onSelectChange = (e) => {
        setSelectedBrgy(e.target.value);
        let newArray = bry.filter((rider) => {
            let searchValue = rider.designateBarangay;
            return searchValue.indexOf(e.target.value) !==-1;
        });
        setNewBrgy(newArray);
    }

    const onHandleSubmit = (e) =>{
        e.preventDefault();
        if(itemDel.rider_id && itemDel.del_date_sched){
           props.addItemDel(itemDel)
           history.push('/assignRiderInItem')
        }else {
            toast.error('Pls.. Select Delivery Date Schedule / Dispatch Rider')
        }
    }

    //console.log(item.item_id)
    return (
        <div className = "container main-cntr" >
            <div className = "row justify-content-md-center">
                <h1>Assign Dispatch Rider</h1>   
            </div>  
            <div className = "row justify-content-md-center sar-tn">
                <div className = "row"><h6>Item ID</h6> </div>  
                <div className="w-100"></div>
                <div className = "row" ><h1>{item.item_id}</h1> </div>  
            </div>
            <div className = "row justify-content-md-center">
                <div className="card crd-sender">
                    <h5 className="card-title">Sender</h5>
                    <p className="card-text"> Name: {item.itemSendername}</p>
                    <p className="card-text"> Contact Number: {item.itemSenderContactNumber}</p>
                    <p className="card-text"> Address: {item.itemSenderAddressStreet}</p>
                    <p className="card-text"> Barangay: {item.itemSenderAddressBarangay}</p>
                    <p className="card-text"> City: {item.itemSenderAddressCity}</p>
                    <p className="card-text"> Province: {item.itemSenderAddressProvince}</p>
                </div>
                <div className="card crd-recipient">
                    <h5 className="card-title">Recipient</h5>
                    <p className="card-text"> Name: {item.itemRecipientname}</p>
                    <p className="card-text"> Contact Number: {item.itemRecipientContactNumber}</p>
                    <p className="card-text"> Address: {item.itemRecipientAddressStreet}</p>
                    <p className="card-text"> Barangay: {item.itemRecipientAddressBarangay}</p>
                    <p className="card-text"> City: {item.itemRecipientAddressCity}</p>
                    <p className="card-text"> Province: {item.itemRecipientAddressProvince}</p>
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div className="row justify-content-md-center item-desc">
                    <div className="col-sm">
                        Item Weight: {item.itemweight}
                    </div>
                    <div className="col-sm">
                        Item Quantity: {item.itemqty}
                    </div>
                    <div className="col-sm">
                        COD: {item.itemCOD}
                    </div>
                </div>      
            </div>
            <hr/>
            <div className="row justify-content-md-center">
                <h5>Delivery Date Schedule</h5>
                <div className="w-100"></div>
                <div className="d-flex justify-content-center">
                    <DatePicker
                        className = "datepicker-aritem"
                        selected = {itemDel.del_date_sched}
                        onChange = {e =>  setItemDel({...itemDel, del_date_sched: e})}
                        dateFormat = 'MM/dd/yyyy'
                        placeholderText = "Choose Delivery Date Schedule"
                        isClearable
                        minDate = {new Date()}
                    />  
                </div>
            </div>
            <div className="row justify-content-md-center">
                <div><button type="button" className="btn btn-primary" onClick = {onClickshowRider}>Show Rider List</button></div>
                <div className="w-100"></div>
                <div className= "riderlist">
                    { showRiderList ?
                    <div className = "riderTable">
                        <div className = "d-flex justify-content-center">
                            <h6 className = "brgyselectqoute">Select Brgy: </h6>
                            <select className = "brgySelect" name= "barangay" value = {selectedbrgy} onChange = {onSelectChange}>
                                {barangays.map(barangay =>
                                <option key={barangay.brgyname} value={barangay.brgyname}> {barangay.brgyname} </option>
                                )};
                            </select>
                         </div>
                            <BootstrapTable
                                striped
                                keyField = "id"
                                data = {newBrgy}
                                columns = {columns}
                                pagination = {paginationFactory()}
                                rowEvents = {rowEvents}
                                selectRow = {selectRow}
                                sort={ { dataField: 'date_encoded', order: 'asc' } }
                            />
                        
                            <h5 className = "riderlist">Dispatch Rider: {dRName}</h5>
                    </div>
                    : 
                    <p>Choose Delivery Date Schedule First</p>}
                </div>          
            </div>
            <hr/>
            <div className="row justify-content-md-center btn-cntr">
                <div className = "col col-sm-4">
                    <button className = "btn-primary" onClick = {() => {history.push('/assignRiderInItem')}}>&lt;&lt;Back</button>
                </div>
                <div className = "col col-sm-2">
                    <button className = "drsubmit" onClick = {onHandleSubmit}>Submit</button>
                </div>
                
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    //console.log(state)
    return{
       item: state.items.selectedUnAssignedItems,
       auth: state.firebase.auth,
       dispatchRiders: state.firestore.ordered["Dispatch Riders"],
       barangays: state.items.getbarangays
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        addItemDel: (itemDel) => dispatch(addItemDel(itemDel)),
    }
}
 export default connect(mapStateToProps, mapDispatchToProps) (SelectAssignRider)


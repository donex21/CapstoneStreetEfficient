import React, {useState, useMemo, useEffect} from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import fire from '../config/fbConfig' 
import moment from 'moment';
import { TodayItemsColumns } from './TableColumns';

function TodaysDeliverySched(props) {
    const {courierID, courBranch} = props
    const [item , setItem] = useState([]);
    const [loading , setLoading] = useState(false);
    const [category, setCategory] = useState('Choose Category');
    const [filterItems, setFilterItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID).where("itemRecipientBranch", "==", courBranch).where("status", "==", "assigned");
    var tempDate = new Date();
    var currentDate = new Date (tempDate.getUTCFullYear(), tempDate.getUTCMonth(), tempDate.getUTCDate());

    function getItemTodaySchedule(){
        setLoading(true);
        ref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item_id =  doc.data().item_id;
                var itemSendername= doc.data().itemSendername;
                var itemSenderContactNumber= doc.data().itemSenderContactNumber;
                var itemSenderAddressStreet= doc.data().itemSenderAddressStreet;
                var itemSenderAddressBarangay= doc.data().itemSenderAddressBarangay;
                var itemSenderAddressCity= doc.data().itemSenderAddressCity;
                var itemSenderAddressProvince= doc.data().itemSenderAddressProvince;
                var itemRecipientname= doc.data().itemRecipientname;
                var itemRecipientContactNumber= doc.data().itemRecipientContactNumber;
                var itemRecipientAddressStreet= doc.data().itemRecipientAddressStreet;
                var itemRecipientAddressBarangay= doc.data().itemRecipientAddressBarangay;
                var itemRecipientAddressCity= doc.data().itemRecipientAddressCity;
                var itemRecipientAddressProvince= doc.data().itemRecipientAddressProvince; 
                var itemRecipientBranch= doc.data().itemRecipientBranch;
                var itemSenderBranch= doc.data().itemSenderBranch;
                var itemqty= doc.data().itemqty;
                var itemweight= doc.data().itemweight;
                var itemCOD= doc.data().itemCOD;
                var courier_id= doc.data().courier_id; 
                var status= doc.data().status;
                var encodedBy= doc.data().encodedBy;
                var date_encoded= moment(doc.data().date_encoded.toDate()).format('LL').toString();    
            
                const docref = fire.firestore().collection("Delivery_Header").where("item_id", "==", item_id).where("del_date_sched", "==", currentDate);
                docref.get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {                      
                        var itemObj = {
                            item_id : item_id,   
                            itemSendername : itemSendername,
                            itemSenderContactNumber: itemSenderContactNumber,
                            itemSenderAddressStreet: itemSenderAddressStreet,
                            itemSenderAddressBarangay: itemSenderAddressBarangay,
                            itemSenderAddressCity: itemSenderAddressCity,
                            itemSenderAddressProvince: itemSenderAddressProvince,
                            itemRecipientname: itemRecipientname, 
                            itemRecipientContactNumber: itemRecipientContactNumber,
                            itemRecipientAddressStreet: itemRecipientAddressStreet,
                            itemRecipientAddressBarangay: itemRecipientAddressBarangay,
                            itemRecipientAddressCity: itemRecipientAddressCity,
                            itemRecipientAddressProvince: itemRecipientAddressProvince,
                            itemRecipientBranch: itemRecipientBranch,
                            itemSenderBranch: itemSenderBranch,
                            itemqty: itemqty,
                            itemweight: itemweight,
                            itemCOD: itemCOD,
                            courier_id: courier_id,
                            status: status,
                            encodedBy: encodedBy,
                            date_encoded: date_encoded,
                            assignedby: doc.data().assignedby, // check if no assigned rider it should be returned into NA
                            rider_name: doc.data().rider_name,
                            date_assigned: moment(doc.data().date_assigned.toDate()).format('LL').toString(),
                            //del_date_sched: moment(doc.data().del_date_sched.toDate()).format('LL').toString(),
                            //del_date_sched: deldate[0],
                        }
                        setItem((item) => [...item, itemObj])                                
                    });
                });

            });
            setLoading(false);
        });
    }

    useEffect(() => {
        getItemTodaySchedule();
    }, []);

    const columns = useMemo(() => TodayItemsColumns, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           console.log(row);    
        //    setModalInfo(row);
        //    toggleTrueFalse();
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
    };

    const onhandleChange = (e) => {
        setSearchInput(e.target.value)
        let newArray = item.filter((sinlgeItem) => {
            if(category === "Item ID"){
                let searchValue = sinlgeItem.item_id.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            } else if(category === "Recipient Name"){
                let searchValue = sinlgeItem.itemRecipientname.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }     
            else if(category === "Sender Name"){
                let searchValue = sinlgeItem.itemSendername.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }
            else if(category === "Rider"){
                let searchValue = sinlgeItem.rider_name.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }
            return sinlgeItem;   
        });
        setFilterItems(newArray);
    }



    if(loading){
        return <p>loading.....</p>
    }
    return (
        <div className = "container-fluid">
            <div className = "row justify-content-md-center">
                <h2>Today's Delivery Schedule</h2>   
            </div>  
            <div className = "ARtable">
                <div className = "d-flex justify-content-center searchEntryItems">
                    <input value = {searchInput} onChange = {onhandleChange} type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>                                  
                    
                    <select value = {category}  onChange = {(e) => setCategory(e.target.value)}> 
                        <option value="">Choose Category...</option>
                        <option value = "Item ID">Item ID</option>
                        <option value = "Recipient Name">Recipient Name</option>
                        <option value = "Sender Name">Sender Name</option>
                        <option value = "Rider">Rider</option>
                    </select>
                </div>  
                <BootstrapTable
                    striped 
                    keyField = "item_id"
                    data = {!searchInput? item : filterItems}
                    columns = {columns}
                    pagination = {paginationFactory()}
                    rowEvents = {rowEvents}
                    selectRow = {selectRow}
                />
                {/* {show ? <ModalContent/> : null}  */}
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

export default connect(mapStateToProps) (TodaysDeliverySched)

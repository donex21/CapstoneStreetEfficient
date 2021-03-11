import React, { useMemo ,useEffect, useState } from 'react'
import fire from '../config/fbConfig' 
import { RiderItemsColumns } from './TableColumns';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { Modal, Button } from 'react-bootstrap';
import moment from 'moment';

const RiderDeliveryHistory = (props) => {
    const {riderID} = props;
    const [item , setItem] = useState([]);
    const [loading , setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [filterItems, setFilterItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const ref = fire.firestore().collection("Delivery_Header").where("rider_id", "==", riderID);

    function getRiderItem(){
        setLoading(true);
        setItem([]);
        ref.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item_id = doc.data().item_id;   
                var del_date_sched = moment(doc.data().del_date_sched.toDate()).format('LL').toString();
                var docRef = fire.firestore().collection("Items").where("item_id", "==", item_id).where("status", "==", "delivered");
                docRef.get()
                .then((querySnapshot) => {
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
                            del_date_sched : del_date_sched 
                        }
                        setItem((item) => [...item, itemObj])                            
                    });
                }); 
            });
            setLoading(false);
        });
    }

    useEffect(() => {
        getRiderItem();
    }, [])

    const columns = useMemo(() => RiderItemsColumns, []);
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
            else if(category === "ByDaTe"){
                let searchValue = sinlgeItem.del_date_sched.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }
            return sinlgeItem;   
        });
        setFilterItems(newArray);
    }


    if(loading){
        return <p>loading.....</p>
    }
    console.log(item)
    return (
        <div className = "container">
            <div className = "ARtable">
                <div className = "d-flex justify-content-center searchEntryItems">
                    <input value = {searchInput} onChange = {onhandleChange} type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>
                    
                    <select value = {category}  onChange = {(e) => setCategory(e.target.value)}> 
                    
                        <option value="" disabled selected hidden>Choose Category...</option>
                        <option value = "Item ID">Item ID</option>
                        <option value = "Recipient Name">Recipient Name</option>
                        <option value = "Sender Name">Sender Name</option>
                        <option value = "ByDaTe">Date</option>
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
            </div>
        </div>
    )
}

export default RiderDeliveryHistory

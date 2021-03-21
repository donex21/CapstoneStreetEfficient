import React, {useState, useMemo, useEffect} from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import fire from '../config/fbConfig' 
import moment from 'moment';
import { AssignRiderColumns } from './TableColumns';

const AllItems = (props) => {
    const {courierID} = props
    const [item , setItem] = useState([]);
    const [loading , setLoading] = useState(false);
    const [category, setCategory] = useState('Choose Category');
    const [filterItems, setFilterItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const firstRef = fire.firestore().collection("Items").where("courier_id", "==", courierID).where("status", "==", "unassigned");
    const secondRef = fire.firestore().collection("Items").where("courier_id", "==", courierID);

    function getAllItems(){
        setLoading(true);
        firstRef.get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {                    
                var itemObj = {
                     item_id :  doc.data().item_id,
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
                     assignedby: "NA", // check if no assigned rider it should be returned into NA
                     rider_name: "NA",
                     date_assigned: "NA",
                     del_date_sched: "NA",
                }                               
                setItem((item) => [...item, itemObj])    
            });
        });

        secondRef.get().then((querySnapshot) => {
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
            
                var docRef = fire.firestore().collection("Delivery_Header").where("item_id", "==", item_id);
                docRef.get()
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
                            del_date_sched: moment(doc.data().del_date_sched.toDate()).format('LL').toString(),
                        }                               
                        setItem((item) => [...item, itemObj])    
                    });
                });
            });
            setLoading(false);
        });
    }

    useEffect(() => {
        getAllItems();  
    }, [])

    const columns = useMemo(() => AssignRiderColumns, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           console.log(row);    
           setModalInfo(row);
           toggleTrueFalse();
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
    };

    const toggleTrueFalse = () => {
        setShowModal(handleShow);
    };

    const ModalContent = () =>{
        return (
            <Modal show = {show} onHide ={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalInfo.item_id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5>Sender Information</h5>
                    <ul>
                        <ol>Name: {modalInfo.itemSendername}</ol>
                        <ol>Contact Number: {modalInfo.itemSenderContactNumber}</ol>
                        <ol>Address: {modalInfo.itemSenderAddressStreet},
                             {modalInfo.itemSenderAddressBarangay}, 
                             {modalInfo.itemSenderAddressCity}, {modalInfo.itemSenderAddressProvince}
                         </ol>
                    </ul>
                    <h5>Recipient Information</h5>
                    <ul>
                        <ol>Name: {modalInfo.itemRecipientname}</ol>
                        <ol>Contact Number: {modalInfo.itemRecipientContactNumber}</ol>
                        <ol>Address: {modalInfo.itemRecipientAddressStreet},
                             {modalInfo.itemRecipientAddressBarangay}, 
                             {modalInfo.itemRecipientAddressCity}, {modalInfo.itemRecipientAddressProvince}
                         </ol>
                    </ul>
                    <h5>Item Desc.</h5>
                    <ul>
                        <ol>QTY: {modalInfo.itemqty}</ol>
                        <ol>Weight: {modalInfo.itemweight} KGS.</ol>
                        <ol>COD: PHP {modalInfo.itemCOD}</ol>
                        <ol>Encoded By: {modalInfo.encodedBy}</ol>
                        <ol>Encoded Date: {modalInfo.date_encoded}</ol>
                        <ol>Assigned By: {modalInfo.assignedby}</ol>
                        <ol>Assigned Date: {modalInfo.date_assigned}</ol>
                        <ol>Deliver Schedule: {modalInfo.del_date_sched}</ol>
                        <ol>Assigned Dispatch Rider: {modalInfo.rider_name}</ol>
                        <ol>Item Status: {modalInfo.status}</ol>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
       )
    }

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
                let searchValue = sinlgeItem.date_encoded.toLowerCase();
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
                <h2>All Items</h2>   
            </div>  
            <div className = "ARtable">
                <div className = "d-flex justify-content-center searchEntryItems">
                    <input  value = {searchInput} onChange = {onhandleChange} type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>                                  
                    <select value = {category}  onChange = {(e) => setCategory(e.target.value)}> 
                        <option value="">Choose Category...</option>
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
                {show ? <ModalContent/> : null}
            </div> 
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        courierID: state.courier.courierId,
    }
}

export default connect(mapStateToProps) (AllItems)

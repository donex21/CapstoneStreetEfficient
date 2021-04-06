import React, {useState, useMemo, useEffect} from 'react'

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux';
import fire from '../config/fbConfig' 
import moment from 'moment';
import RingLoader from "react-spinners/RingLoader";
import { DeliveryAttempColumns } from './TableColumns';
import { updateReturnItem, updateReschedItem } from '../store/actions/itemAction';

const AttemptContainer = (props) => {
    const {courierID, courBranch} = props
    const [item , setItem] = useState([]);
    const [loading , setLoading] = useState(false);
    const [modalInfo, setModalInfo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const[itemDel, setItemDel] = useState({
        del_date_sched: null,
        item_id: null,
    });
    const [resched, setResched] = useState(false);
    const [returnItemID , setReturnItemID] = useState();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const ref = fire.firestore().collection("Items").where("courier_id", "==", courierID).where("itemRecipientBranch", "==", courBranch).where("status", "==", "assigned");
    function getItemAttempt(){
        setLoading(true);
        ref.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var item_id =  doc.data().item_id;
                const docref = fire.firestore().collection("Delivery_Attempt").where("id", "==", item_id).where("status", "==", "back_to_warehouse")
                docref.get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        var itemObject = doc.data();
                        setItem((item) => [...item, itemObject])  
                    });
                });
            });
            setLoading(false);
        });
    }

    useEffect(() => {
        getItemAttempt();
    }, [])

    const columns = useMemo(() => DeliveryAttempColumns, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           console.log(row);    
           setReturnItemID(row.id)
           setItemDel({...itemDel, item_id: row.id});
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

    const handleSubmitReturnedItems = (e) =>{
        e.preventDefault();
        props.updateReturnItem(returnItemID);

        for( var i = 0; i < item.length; i++){ 
    
            if ( item[i].id === returnItemID) { 
        
                item.splice(i, 1); 
            }
        
        }
        handleClose();

    }

    const handleSubmitReschedItems = (e) =>{
        e.preventDefault();
        if(itemDel.del_date_sched != null){
            for( var i = 0; i < item.length; i++){ 
    
                if ( item[i].id === itemDel.item_id) { 
            
                    item.splice(i, 1); 
                }
            }
            handleClose();
            setResched(!resched);
            props.updateReschedItem(itemDel);
            setItemDel({
                del_date_sched: null,
                item_id: null,
            });
        }
    }

    const handleCancel = (e) => {
        e.preventDefault();
        setResched(!resched);
        setItemDel({
            del_date_sched: null,
            item_id: null,
        });
    }


    const ModalContent = () =>{
        return (
            <Modal show = {show} onHide ={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                       Item ID: {modalInfo.id}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <h5>What would you Like?</h5>
                        <Row>
                            <Col>
                                <Button variant = "primary " onClick = {() => setResched(!resched)}>
                                    Reschedule
                                </Button>
                            </Col>
                            <Col>
                                <Button variant = "primary " onClick = {handleSubmitReturnedItems}> 
                                    Return To Sender
                                </Button>
                            </Col>
                        </Row>    
                        {resched ?               
                        (<Row className="mt-3">
                            <Col xs={12}>
                                <h6>Choose New Delivery Date Schedule</h6>
                            </Col>
                            <Col xs={12}>
                                <DatePicker 
                                    selected = {itemDel.del_date_sched}
                                    onChange = {e =>  setItemDel({...itemDel, del_date_sched: e})}
                                    dateFormat = 'MM/dd/yyyy'
                                    placeholderText = "Delivery Date Schedule"
                                    isClearable
                                    minDate = {new Date()}
                                />  
                            </Col>          
                            <Col xs={12} className="mt-2">
                                <Button variant = "primary " onClick = {handleSubmitReschedItems}>
                                    Submit
                                </Button>
                                <Button variant = "secondary "  className="ml-5" onClick = {handleCancel} >
                                    Cancel
                                </Button>
                            </Col>
                        </Row>) : null}                         
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
       )
    }


    if(loading){
        return <RingLoader size = {30} color = {'#1D927A'} loading = {loading}/>
    }
    return (
        <div className = "row">
            <div className = "col-sm">
                <h3>Delivery Attempt</h3>
            </div>
            <div className="w-100"></div>
            <div className = "col-sm ARtable">
                <BootstrapTable
                    striped 
                    keyField = "id"
                    data = {item}
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
        courBranch: state.courier.courBranch,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateReturnItem: (returnItemID) => dispatch(updateReturnItem(returnItemID)),
        updateReschedItem: (itemDel) => dispatch(updateReschedItem(itemDel)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AttemptContainer)

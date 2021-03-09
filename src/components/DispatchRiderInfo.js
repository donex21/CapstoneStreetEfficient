import React, { useState }from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import {calculate_age} from './CustomsStyles'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap';

function DispatchRiderInfo(props) {
    const {ridersEmp}  = props;
    const history = useHistory();

    const [modalInfo, setModalInfo] = useState();
    const [showModal, setShowModal] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var birthdateString = moment(ridersEmp.birthdate).format('LL').toString();

    const toggleTrueFalse = () => {
        setShowModal(handleShow);
    };

    const ModalContent = () =>{
        return (
            <Modal show = {show} onHide ={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {modalInfo.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className = "d-flex justify-content-center searchEntryItems">
                    <img width ="300" height ="300" src= {modalInfo.pic} alt = {modalInfo.title}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant = "secondary" onClick = {handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
       )
    }

    return (
        <div className =  "container empCntr">
            <div className = "row justify-content-md-center OEI-header">         
                <h2>Dispatch Rider Information</h2>   
            </div>
            <div className = "row justify-content-md-center OEI-header">
                    <div className = "col">
                        <div className = "row">
                            <div className = "col-md">
                                <h6>Email: {ridersEmp.email}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>First Name: {ridersEmp.fname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Middle Name: {ridersEmp.mname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Last Name: {ridersEmp.lname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Age: {calculate_age(ridersEmp.birthdate)}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                               <h6>Address: {ridersEmp.address}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Contact Number: {ridersEmp.contactNumber}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Emergency Contact Number: {ridersEmp.emerg_number}</h6>
                            </div>
                        </div>
                    </div>  
                    <div className="col">
                        <div className = "row">
                            <div className = "col-md">
                                <h6>Birth Date: {birthdateString}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Gender: {ridersEmp.gender}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Barangay Designated: Brgy. {ridersEmp.designateBarangay}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Vehicle Type: {ridersEmp.vehicle_type}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Status: {ridersEmp.status}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Branch: {ridersEmp.branch}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Encoded By: {ridersEmp.encodedBY}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            <div className="row">
                <h2 >Credentials</h2> 
            </div>
            <div className="row">
                 <div className = "col">
                    <button className = "btn btn-primary"
                        onClick = {() =>{setModalInfo({
                                title: 'Actual Assessment',
                                pic: ridersEmp.actualAssessment
                            });
                            toggleTrueFalse();
                        }}
                    >
                        Actual Assessment</button>
                 </div>
                 <div className = "col">
                    <button className = "btn btn-primary"
                        onClick = {() =>{setModalInfo({
                                title: 'Written Exam Result',
                                pic: ridersEmp.writtenExam
                            });
                            toggleTrueFalse();
                         }}
                    >
                        Written Exam Result</button>
                 </div>
                 <div className = "col">
                    <button className = "btn btn-primary"
                        onClick = {() =>{setModalInfo({
                                title: 'Vehicle Official Receipt',
                                pic: ridersEmp.oR
                            });
                            toggleTrueFalse();
                        }}
                    >
                        Vehicle Official Receipt</button>
                 </div>
                 <div className = "col">
                    <button className = "btn btn-primary"
                        onClick = {() =>{setModalInfo({
                                title: 'Certificate Registration',
                                pic: ridersEmp.cR
                            });
                            toggleTrueFalse();
                         }}
                    >
                        Certificate Registration</button>
                 </div>
                 <div className = "col">
                    <button className = "btn btn-primary"
                        onClick = {() =>{setModalInfo({
                                title: 'License',
                                pic: ridersEmp.license
                            });
                            toggleTrueFalse();
                        }}
                    >
                        License</button>
                 </div>
            </div>
            {show ? <ModalContent/> : null}
            <hr/>
            <div className="row btn-cntr">
                <h5 className = "editstyle" onClick = {() => {history.push('/UpdateRiderInfo')}} >Edit</h5> 
            </div>
            <hr/>
            <div className="row">
                <h2 >Performance</h2> 
            </div>
            <hr/>
            <div className="row">
                <h2 >Delivery History</h2> 
            </div>
            <hr/>
            <div className="row btn-cntr">
                <div className = "col col-sm-4">
                    <button className = "btn-primary" onClick = {() => {history.push('/dispatchRiders')}}>&lt;&lt;Back</button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        ridersEmp: state.dispatchRider.selectedRidersEmp
    }
}

export default connect(mapStateToProps) (DispatchRiderInfo)

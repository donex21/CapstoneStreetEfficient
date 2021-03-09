import React, { useState , useEffect, useMemo } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import fire from '../config/fbConfig' 
import { OfficeEmployeeColumn } from './TableColumns';
import { getSelectedRiderEmp } from '../store/actions/dispatchRiderAction'

const DispatchRiders = (props) => {
    const{courierID} = props;
    const history  = useHistory();
    const [riderEmp, setRiderEmp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [filterItems, setFilterItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    
    const ref = fire.firestore().collection("Dispatch Riders").where("courier_id", "==", courierID);

    function getRiderEmp(){
        setLoading(true);
        ref.get().then((querySnapshot) => {
            var ridersdata = [];
            querySnapshot.forEach((doc) => {
                var riderObj = {
                    id: doc.data().id,
                    email: doc.data().email,
                    fname: doc.data().fname,
                    mname: doc.data().mname,
                    lname: doc.data().lname,
                    gender: doc.data().gender,
                    address: doc.data().address,
                    branch: doc.data().branch,
                    contactNumber: doc.data().contactNumber,
                    emerg_number: doc.data().emerg_number,
                    birthdate: doc.data().birthdate.toDate(),
                    encodedBY: doc.data().encodedBY,
                    status: doc.data().status,
                    vehicle_type: doc.data().vehicle_type,
                    designateBarangay: doc.data().designateBarangay,
                    actualAssessment: doc.data().actualAssessment,
                    license: doc.data().license,
                    oR: doc.data().oR,
                    cR: doc.data().cR,
                    writtenExam: doc.data().writtenExam
                }
                ridersdata.push(riderObj);
            });
            setRiderEmp(ridersdata)
            setLoading(false)
        });
    }

    useEffect(() => {
        getRiderEmp();
    }, [])

    const columns = useMemo(() => OfficeEmployeeColumn, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           //console.log(row);   
           props.getSelectedRiderEmp(row);
           history.push('/dispatchRiderInfo');
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
      };

    const onhandleChange = (e) => {
        setSearchInput(e.target.value)
        let newArray = riderEmp.filter((singleEmp) => {
            if(category === "Branch"){
                let searchValue = singleEmp.branch.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            } else if(category === "Email"){
                let searchValue = singleEmp.email.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }     
            else if(category === "Last Name"){
                let searchValue = singleEmp.lname.toLowerCase();
                return searchValue.indexOf(e.target.value) !==-1;
            }
            return singleEmp;   
        });
        setFilterItems(newArray);
    }

    if(loading){
        return <p>loading.....</p>
    }

    return (
        <div className = "container-fluid empCntr">
            <div className = "empfirstrow">
                <button className="btn-openModal btn-primary" onClick = {() => history.push('/addDispatchRiders')}>Add Dispatch Rider</button>
                
                <div className = "d-flex justify-content-center searchOfEmp">
                    <input  value = {searchInput} onChange = {onhandleChange} type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>
                   
                    <select value = {category}  onChange = {(e) => setCategory(e.target.value)} >    
                        <option value="" disabled selected hidden>Choose Category...</option>
                        <option value = "Branch">Branch</option>
                        <option value = "Email">Email</option>
                        <option value = "Last Name">Last Name</option>
                    </select>
                </div>  
            </div>
            <div className = "ARtable">
                <BootstrapTable
                    striped 
                    keyField = "email"
                    data = {!searchInput? riderEmp : filterItems}
                    columns = {columns}
                    pagination = {paginationFactory()}
                    rowEvents = {rowEvents}
                    selectRow = {selectRow}
                />  
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
     console.log(state)
    return{
        courierID: state.courier.courierId,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getSelectedRiderEmp: (riderEmp) => dispatch(getSelectedRiderEmp(riderEmp)),
    }
}

export default connect( mapStateToProps, mapDispatchToProps) (DispatchRiders) 

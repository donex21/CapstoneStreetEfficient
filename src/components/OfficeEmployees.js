import React, {useState, useEffect, useMemo} from 'react'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import fire from '../config/fbConfig' 
import { OfficeEmployeeColumn } from './TableColumns';
import AddOfficeEmployee from './AddOfficeEmployee'
import { getSelectedOfficeEmp } from '../store/actions/officeEmployeeAction'


function OfficeEmployees(props) {
    const {courierID} = props;
    const history = useHistory()
    const [show, setShow] = useState(false);
    const closeModalHandler = () => setShow(false);
    const [officeEmp, setOfficeEMp] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('');
    const [filterItems, setFilterItems] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const ref = fire.firestore().collection("Office_Employees").where("courier_id", "==", courierID);

    function getOfficeEmp(){
        setLoading(true);
        ref.get().then((querySnapshot) => {
            var Empsdata = [];
            querySnapshot.forEach((doc) => {
                var empsObj = {
                    id: doc.data().id,
                    email: doc.data().email,
                    fname: doc.data().fname,
                    mname: doc.data().mname,
                    lname: doc.data().lname,
                    gender: doc.data().gender,
                    address: doc.data().address,
                    branch: doc.data().branch,
                    contactNumber: doc.data().contactNumber,
                    jobtitle: doc.data().jobtitle,
                    birthdate: doc.data().birthdate.toDate(),
                    encodedBY: doc.data().encodedBY,
                    status: doc.data().status
                }
                Empsdata.push(empsObj);
            });
            setOfficeEMp(Empsdata)
            setLoading(false)
        });
    }

    useEffect(() => {
        getOfficeEmp();
    }, [])

    const columns = useMemo(() => OfficeEmployeeColumn, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           //console.log(row);   
           props.getSelectedOfficeEmp(row);
            history.push('/officeEmpInfo');
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
      };

      const onhandleChange = (e) => {
        setSearchInput(e.target.value)
        let newArray = officeEmp.filter((singleEmp) => {
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
                { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
                <button onClick={() => setShow(true)} className="btn-openModal btn-primary">Add Employee</button>
                <AddOfficeEmployee show={show} close={closeModalHandler} />
                
                <div className = "d-flex justify-content-center searchOfEmp">
                    <input value = {searchInput} onChange = {onhandleChange} type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>
                    
                   
                    <select  value = {category}  onChange = {(e) => setCategory(e.target.value)}> 
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
                    data = {!searchInput? officeEmp : filterItems}
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
    // console.log(state)
    return{
        courierID: state.courier.courierId,
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        getSelectedOfficeEmp: (officeEmp) => dispatch(getSelectedOfficeEmp(officeEmp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (OfficeEmployees)

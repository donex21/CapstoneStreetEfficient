import React, { useState, useEffect } from 'react'
import {addOfficeEmployee} from '../store/actions/officeEmployeeAction'
import { activeTextSwitch, inactiveTextSwitch } from './CustomsStyles';

import '../styles/AddOfficeEmployee.scss'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import Switch from 'react-switch'
import { connect } from 'react-redux'


const AddOfficeEmployee = (props) => {
    const {show, close, branches, courierID, addOffice_Emp_Error, auth} = props
    const [checked, setChecked] = useState(false)//for status
    let displayName = auth.displayName;
    let encodedBY = displayName.split("@");


    const [officeEmployeeSignup, setOfficeEmployeeSignup] = useState({
        email : '',
        fname : '',
        mname :'',
        lname :'',
        address: '',
        contactNumber: '',
        birthdate: null,
        gender: 'Male',
        branch: '',
        jobtitle: 'Office Clerk',
        status: 'inactive',
        courier_id: courierID,
        encodedBY: encodedBY[1],
    });  

    useEffect(() => {
        checked ? setOfficeEmployeeSignup({...officeEmployeeSignup, status: 'active'}) : setOfficeEmployeeSignup({...officeEmployeeSignup, status: 'inactive'});
        // eslint-disable-next-line
    }, [checked]);

    useEffect(() => {
        if (!addOffice_Emp_Error){
            setOfficeEmployeeSignup({
                email : '',
                fname : '',
                mname :'',
                lname :'',
                address: '',
                contactNumber: '',
                birthdate: null,
                gender: 'Male',
                branch: '',
                jobtitle: 'Office Clerk',
                status: 'inactive',
                courier_id: courierID,
                encodedBY: encodedBY[1],
            });
            setChecked(false);
        } // eslint-disable-next-line
    }, [addOffice_Emp_Error])

    const handleOnChange = (e) =>{
        setOfficeEmployeeSignup({...officeEmployeeSignup, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(officeEmployeeSignup);
        props.addOfficeEmployee(officeEmployeeSignup)          
    }
   
    const options = branches && Object.keys(branches).map(function (i) {
        return {
            value: branches[i].branch_name,
            label: branches[i].branch_name
        }
      });
     
    return (
        <div className="modal-wrapper"
            style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-150vh)',
                opacity: show ? '1' : '0'
            }}
        >
            <div className="modal-header">
                <h2>Add Office Employee</h2>
                <span onClick={close} className="close-modal-btn"> x </span>
            </div>

            <div className = "modal-content">
                <form className = "add-employee-form" onSubmit ={handleSubmit}>
                    <div className = "employee-email-container">
                        <label>Email</label>
                        <input type="email"
                            placeholder="Enter Email" 
                            name="email"
                            value = {officeEmployeeSignup.email}
                            required
                            onChange = {handleOnChange} 
                        />
                        
                        <label>First Name</label>
                        <input type="text"
                            placeholder="Enter First Name" 
                            name="fname"
                            value = {officeEmployeeSignup.fname}
                            required
                            onChange = {handleOnChange} 
                        />

                        <label>Middle Name</label>
                        <input type="text"
                            placeholder="Enter Middle Name" 
                            name="mname"
                            value = {officeEmployeeSignup.mname}
                            required
                            onChange = {handleOnChange} 
                        />

                        <label>Last Name</label>
                        <input type="text"
                            placeholder="Enter Last Name" 
                            name="lname"
                            value = {officeEmployeeSignup.lname}
                            required
                            onChange = {handleOnChange} 
                        />

                        <label>Address</label>
                        <input type="text"
                            placeholder="Enter Address" 
                            name="address"
                            value = {officeEmployeeSignup.address}
                            required
                            onChange = {handleOnChange} 
                        />

                        
                    </div>
                    <div className = "employee-contactNumber-container">
                        <label>Contact Number</label>
                        <input type="text"
                            placeholder="Enter Contact Number" 
                            name="contactNumber"
                            value = {officeEmployeeSignup.contactNumber}
                            required
                            onChange = {handleOnChange} 
                        />

                        <label>Gender</label>  
                        <select name="gender" value = {officeEmployeeSignup.gender} onChange = {handleOnChange}>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <label>Job Title</label>
                        <select name="jobtitle" value = {officeEmployeeSignup.jobtitle} onChange = {handleOnChange}>
                            <option value="Office Clerk">Office Clerk</option>
                            <option value="Manager">Manager</option>
                        </select>

                        <label >Bith Date</label>
                        <DatePicker
                           // className = "datepicker-birthdate"
                            selected = {officeEmployeeSignup.birthdate}
                            onChange = {e =>  setOfficeEmployeeSignup({...officeEmployeeSignup, birthdate: e})}
                            dateFormat = 'MM/dd/yyyy'
                            placeholderText = "Birthdate"
                            isClearable
                            showYearDropdown
                            scrollableYearDropdown
                            maxDate = {new Date()}
                        />

                        <label> Company Branch</label>
                        <Select 
                            classNamePrefix="mySelect" 
                            options={options}
                            placeholder = "Choose company branch" 
                            value =  {options && options.find(obj => obj.value === officeEmployeeSignup.branch)}
                            onChange =  {e => setOfficeEmployeeSignup({...officeEmployeeSignup, branch: e.value})}
                            isSearchable
                            autoFocus
                            maxMenuHeight = {250}
                         />

                        <div className = "status-swtich-container">
                            <label className = "employeestatus-switch">Status:</label>
                            <Switch 
                                className= "react-swtich"
                                onChange = {checked => setChecked(checked)}
                                checked = {checked}
                                onHandleColor = "#3981e5"
                                checkedIcon = {<div style = {activeTextSwitch}> active </div>}
                                uncheckedIcon = {<div style = {inactiveTextSwitch}> inactive </div>}
                                width = {90}
                                height = {25}
                            />

                        </div>
                       
                    </div>
                    <div className = "modal-submit-container">
                        <button> Submit </button>
                    </div>
                </form>

            </div>
            
        </div>
    )
}


const mapStateToProps = (state) =>{
    console.log(state);
    return{
        branches: state.firestore.data.Branch,
        courierID: state.courier.courierId,
        addOffice_Emp_Error: state.officeEmployees.addOffice_Emp_Error, 
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addOfficeEmployee: (officeEmployeeSignup) => dispatch(addOfficeEmployee(officeEmployeeSignup)),
    }
} 


 export default connect(mapStateToProps, mapDispatchToProps)(AddOfficeEmployee)

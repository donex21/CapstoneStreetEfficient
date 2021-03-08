import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment'; 
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import {UpdateSelectedOfficeEmp} from '../store/actions/officeEmployeeAction'

function OfficeEmpInfo(props) {
    const {singleEmp, auth}  = props;
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    let displayName = auth.displayName;
    let encodedBY = displayName.split("@");
    const [officeEmp, setOfficeEmp] = useState({
        id: singleEmp.id,
        email: singleEmp.email,
        fname: singleEmp.fname,
        mname: singleEmp.mname,
        lname: singleEmp.lname,
        gender: singleEmp.gender,
        address: singleEmp.address,
        branch: singleEmp.branch,
        contactNumber: singleEmp.contactNumber,
        jobtitle: singleEmp.jobtitle,
        birthdate: singleEmp.birthdate,
        encodedBY: encodedBY[1],
        status: singleEmp.status
    });
    var birthdateString = moment(singleEmp.birthdate).format('LL').toString();

    const editChange = () => {
        setEdit(true);
    }

    const handleOnChange = (e) =>{
        setOfficeEmp({...officeEmp, [e.target.name]: e.target.value})
    }

    const handleUpdate = (e) =>{
        e.preventDefault();
        props.UpdateSelectedOfficeEmp(officeEmp)
    }

    const calculate_age = (bdate) => {
        var today = new Date();
        var birthDate = new Date(bdate);  // create a date object directly from `dob1` argument
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age_now--;
        }
        console.log(age_now);
        return age_now;
    }
    return (
        <div className = "container empCntr">
            <div className = "row justify-content-md-center OEI-header">         
                <h2>Office Employee Information</h2>   
            </div>
            {edit ?
            
            (<form><div className = "row justify-content-md-center OEI-header">
                <div className = "col">
                    <div className = "row">
                        <div className = "col-md">
                            <label>First Name:</label>
                            <input className = "OEI-detail"
                                required
                                type = "text"
                                name = "fname"
                                value = {officeEmp.fname}
                                onChange = {handleOnChange}
                             />
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Middle Name:</label>
                            <input className = "OEI-detail" 
                                required 
                                type = "text"
                                name = "mname" 
                                value ={officeEmp.mname}
                                onChange = {handleOnChange}
                             />
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Last Name:</label>
                            <input className = "OEI-detail" 
                                required 
                                type = "text" 
                                name = "lname" 
                                value = {officeEmp.lname}
                                onChange = {handleOnChange}
                            />
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Address:</label>
                            <input className = "OEI-detail" 
                                required 
                                type = "text"
                                name ="address"
                                value = {officeEmp.address}
                                onChange = {handleOnChange}
                              />
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Contact Number:</label>
                            <input className = "OEI-detail" 
                                required type = "text"
                                name= "contactNumber" 
                                value = {officeEmp.contactNumber}
                                onChange = {handleOnChange}
                             />
                        </div>
                    </div>
                </div>  
                <div className="col">
                    <div className = "row">
                        <div className = "col-md">
                            <label>Birth Date:</label>
                            <DatePicker
                                className = "OEI-detail"
                                selected = {officeEmp.birthdate}
                                onChange = {e =>  setOfficeEmp({...officeEmp, birthdate: e})}
                                dateFormat = 'MM/dd/yyyy'
                                //placeholderText = "Birthdate"
                                isClearable
                                showYearDropdown
                                scrollableYearDropdown
                                maxDate = {new Date()}
                            />
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Gender:</label>
                            <select className = "OEI-detail" name = "gender" value = {officeEmp.gender} onChange = {handleOnChange}>
                                <option value = "Male">Male</option>
                                <option value = "Female">Female</option>
                            </select>
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Job Title:</label>
                            <select className = "OEI-detail" name = "jobtitle" value = {officeEmp.jobtitle} onChange = {handleOnChange}>
                                <option value = "Manager">Manager</option>
                                <option value = "Office Clerk">Office Clerk</option>
                            </select>
                        </div>
                        <div className="w-100"></div>
                        <div className = "col-md">
                            <label>Status:</label>
                            <select className = "OEI-detail" name = "status" value = {officeEmp.status} onChange = {handleOnChange}>
                                <option value = "active">active</option>
                                <option value = "inactive">inactive</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div></form>)
            : (
                <div className = "row justify-content-md-center OEI-header">
                    <div className = "col">
                        <div className = "row">
                            <div className = "col-md">
                                <h6>Email: {singleEmp.email}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>First Name: {singleEmp.fname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Middle Name: {singleEmp.mname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Last Name: {singleEmp.lname}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Age: {calculate_age(singleEmp.birthdate)}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                               <h6>Address: {singleEmp.address}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Contact Number: {singleEmp.contactNumber}</h6>
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
                                <h6>Gender: {singleEmp.gender}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Job Title: {singleEmp.jobtitle}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Status: {singleEmp.status}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Branch: {singleEmp.branch}</h6>
                            </div>
                            <div className="w-100"></div>
                            <div className = "col-md">
                                <h6>Encoded By: {singleEmp.encodedBY}</h6>
                            </div>
                        </div>
                    </div>
                </div> )}
            <hr/>
            <div className="row btn-cntr">
                <h5 className = "editstyle" onClick = {editChange}>Edit</h5> 
            </div>
            <hr/>
            <div className="row btn-cntr">
                <div className = "col col-sm-4">
                    <button className = "btn-primary" onClick = {edit ? () =>{setEdit(false)} :() => {history.push('/officeEmployees')}}>&lt;&lt;Back</button>
                </div>
                <div className = "col col-sm-2">
                    <button className = {edit? `drsubmit` : `no-drsubmit` } onClick ={handleUpdate} >Update</button>
                </div>
                
            </div>
            
        </div>
    )
}
const mapStateToProps = (state) => {
    console.log(state)
    return{
        singleEmp: state.officeEmployees.selectedOfficeEmp,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
         UpdateSelectedOfficeEmp: (officeEmp) => dispatch(UpdateSelectedOfficeEmp(officeEmp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (OfficeEmpInfo)

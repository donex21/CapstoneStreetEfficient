import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { connect } from 'react-redux'
import firebase from '../config/fbConfig'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'

import { customStyles } from './CustomsStyles';
import { SelectDesignateBarangay, UpdateSelectedDispatchRider } from '../store/actions/dispatchRiderAction';


const  UpdateRiderInfo = (props) => {
    const { branches,barangays,ridersEmp, auth }  = props;
    let displayName = auth.displayName;
    let encodedBY = displayName.split("@");
    const history = useHistory()
    const [changeArea, setChangeArea] = useState(false);
    const [changeCreds, setChangeCreds] = useState(false);

    const [updateRider, setUpdateRider] = useState({
        id: ridersEmp.id,
        email: ridersEmp.email,
        fname : ridersEmp.fname,
        mname :ridersEmp.lname,
        lname : ridersEmp.mname,
        address: ridersEmp.address,
        contactNumber: ridersEmp.contactNumber,
        emerg_number: ridersEmp.emerg_number,
        birthdate: ridersEmp.birthdate,
        gender: ridersEmp.gender,
        branch: ridersEmp.branch,
        status: ridersEmp.status,
        designateBarangay: ridersEmp.designateBarangay,
        encodedBY: encodedBY[1],
        vehicle_type: ridersEmp.vehicle_type,
        actualAssessment: ridersEmp.actualAssessment,
        license: ridersEmp.license,
        oR: ridersEmp.oR,
        cR: ridersEmp.cR,
        writtenExam: ridersEmp.writtenExam
    }); 
    
    const handleOnChange = (e) =>{
        setUpdateRider({...updateRider, [e.target.name]: e.target.value})
    }

    const handleInfoSubmit = (e) =>{
        e.preventDefault();
        props.UpdateSelectedDispatchRider(updateRider);
        history.push('/dispatchRiderInfo');
    }

    const handleDesignateAreaSubmit = (e) =>{
        e.preventDefault();
        props.UpdateSelectedDispatchRider(updateRider);
        setChangeArea(!changeArea);
    }

    const handleCredsOnChange = async (e) =>{   
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);    
        setUpdateRider({...updateRider, [e.target.name]: await fileRef.getDownloadURL()});
    }

    const handleCredsSubmit = (e) =>{
        e.preventDefault();
        props.UpdateSelectedDispatchRider(updateRider);
        setChangeCreds(!changeCreds);
    }

    const options = branches && Object.keys(branches).map(function (i) {
        return {
            value: branches[i].branch_name,
            label: branches[i].branch_name,
            cityID: branches[i].city_id
        }
      });

    const onSelectChange  = (e) =>{
        setUpdateRider({...updateRider, branch: e.value});
        props.SelectDesignateBarangay(e.cityID)
    }
    var nobarangay = true;
    var optionBarangay;

    if(barangays){
        optionBarangay = barangays && Object.keys(barangays).map(function (i) {
            return {
                value: barangays[i].brgyname,
                label: barangays[i].brgyname
            }
        });
        nobarangay  = false;
    }

    return (
        <div className = "main-container">
        <div className = "addDR-container">
           <div className = "addDR-header">
                <h1>Update Dispatch Rider</h1>
           </div>
           <div className = "addDR-form">
               <form onSubmit = {handleInfoSubmit}>
                   <div>
                       <h2>Information</h2>
                   </div>
                   <div className = "addDR-inputs-info">
                        <div className = "addDR-inputs-name">
                            <div>
                                <label>First Name</label>
                                <input type="text"
                                    placeholder="Enter First Name" 
                                    name="fname"                             
                                    required   
                                    value = {updateRider.fname}
                                    onChange = {handleOnChange}   
                                />
                            </div>
                            <div>
                                <label>Middle Name</label>
                                <input type="text"
                                    placeholder="Enter Middle Name" 
                                    name="mname"                        
                                    required  
                                    value = {updateRider.mname}
                                    onChange = {handleOnChange}                             
                                />

                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text"
                                    placeholder="Enter Last Name" 
                                    name="lname"                        
                                    required   
                                    value = {updateRider.lname}
                                    onChange = {handleOnChange}                               
                                />
                            </div>                          
                        </div>
                        <div className = "addDR-input-address">
                            <label>Address</label>
                            <input type="text"
                                placeholder="Enter Address" 
                                name="address"
                                required
                                value = {updateRider.address}
                                onChange = {handleOnChange}   
                            />
                        </div>
                        <div className = "addDR-inputs-contact">
                            <div>
                                <label>Contact Number</label>
                                <input type="text"
                                    placeholder="Enter Contact Number" 
                                    name="contactNumber"                             
                                    required      
                                    value = {updateRider.contactNumber}
                                    onChange = {handleOnChange}   
                                />
                            </div>
                            <div>
                                <label>Emergency Contact Number</label>
                                <input type="text"
                                    placeholder="Enter Emergency Number" 
                                    name="emerg_number"                        
                                    required       
                                    value = {updateRider.emerg_number}
                                    onChange = {handleOnChange}                        
                                />
                            </div>                          
                        </div>
                        <div className = "addDR-inputs-gender">
                            <div>
                                <label>Gender</label>  
                                <select name="gender"  value = {updateRider.gender} onChange = {handleOnChange}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>   
                            </div>
                            <div>
                                <label className ="label-date" >Bith Date</label>
                                <DatePicker
                                    className = "datepicker-birthdate"     
                                    selected = {updateRider.birthdate}    
                                    onChange = {e =>  setUpdateRider({...updateRider, birthdate: e})}       
                                    dateFormat = 'MM/dd/yyyy'
                                    placeholderText = "Birthdate"
                                    isClearable
                                    showYearDropdown
                                    scrollableYearDropdown   
                                    maxDate = {new Date()}                            
                                />
                            </div>                                          
                        </div>
                        <div className = "row addDR-inputs-creds">                       
                                <div className = "col">
                                    <label> Vehicle Type: </label>  
                                    <select name="vehicle_type" value = {updateRider.vehicle_type} onChange ={handleOnChange}>
                                        <option value="Motorcycle">Motorcycle</option>
                                        <option value="Truck">Truck</option>
                                    </select>  
                                </div> 
                                <div className = "col">
                                <label>Status:</label>
                                <select name="status"  value = {updateRider.status} onChange = {handleOnChange}>
                                    <option value="active">active</option>
                                    <option value="inactive">inactive</option>
                                </select>   
                            </div>                                                                                                                                    
                        </div> 
                        <hr />
                        <div className = "btn-submit">
                            <button className = "btn-primary">Update Information</button>
                        </div>
                   </div>      
               </form>
           </div>
           <div>
               <label className = "label-area" onClick = {() => setChangeArea(!changeArea)}>Change Designate Area</label>
           </div>
            {changeArea ?(
            <div className = "row branch_select">     
                <div className = "col mySelect">
                    <label> Company Branch</label>
                    <Select 
                        styles={customStyles}
                        options={options}
                        classNamePrefix="mySelect"                                     
                        placeholder = "Choose company branch"    
                        value =  {options && options.find(obj => obj.value === updateRider.branch)}
                        onChange = {onSelectChange}                  
                        isSearchable
                        autoFocus
                        maxMenuHeight = {250}
                    />
                </div>              
                <div className = "col mySelect">
                    <label> Designate Barangay</label>
                    <Select 
                        styles={customStyles}
                        options={optionBarangay}
                        classNamePrefix="mySelect"                                     
                        placeholder = "Designate Barangay"    
                        value =  {optionBarangay && optionBarangay.find(obj => obj.value === updateRider.designateBarangay)}
                        onChange = {e => setUpdateRider({...updateRider, designateBarangay: e.value})}                   
                        isSearchable
                        autoFocus
                        maxMenuHeight = {250}
                    />
                    <div className = "Errormessage">
                        { nobarangay ? <span> Select Warehouse Branch First! </span> : <span> </span> }
                    </div>                
                </div>
                <div className="w-100"></div>
                <div className = "col update_area">
                    <button className = "btn btn-primary" onClick = {handleDesignateAreaSubmit}>Update</button>
                </div>
            </div>): null}

            <div>
               <label className = "label-area" onClick = {() => setChangeCreds(!changeCreds)}>Change Credentials</label>
           </div>
           {changeCreds ? (
               <div className = "row">
                   <div className = "col">
                        <h6> Actual Assessment: </h6>  
                        <input type="file" 
                            name="actualAssessment"                        
                            required 
                            onChange = {handleCredsOnChange}                                                      
                        />
                        <button className = "btn btn-primary" onClick = {handleCredsSubmit}>Update</button>
                   </div>
                   <div className="w-100"></div>
                   <div className = "col">
                        <h6> Written Exam Result: </h6>  
                        <input type="file" 
                            name="writtenExam"                        
                            required   
                            onChange = {handleCredsOnChange}                                               
                        /> 
                        <button className = "btn btn-primary" onClick = {handleCredsSubmit}>Update</button>
                    </div>
                    <div className="w-100"></div>
                    <div className = "col">
                        <h6> License: </h6>  
                            <input type="file" 
                            name="license"                        
                            required   
                            onChange = {handleCredsOnChange}           
                        />
                        <button className = "btn btn-primary" onClick = {handleCredsSubmit}>Update</button>
                    </div>
                    <div className="w-100"></div>
                    <div className = "col">
                        <h6> Official Receipt: </h6>  
                        <input type="file" 
                            name="oR"                        
                            required     
                            onChange ={handleCredsOnChange}                                                          
                        /> 
                        <button className = "btn btn-primary" onClick = {handleCredsSubmit}>Update</button>
                    </div>
                    <div className="w-100"></div>
                    <div className = "col">
                        <h6> Certificate of Registration: </h6>  
                        <input type="file" 
                            name="cR"                        
                            required    
                            onChange = {handleCredsOnChange}                                                         
                        />
                        <button className = "btn btn-primary" onClick = {handleCredsSubmit}>Update</button>
                    </div>
                </div>
           ): null}

           <div className = "row update_area">
                <button className = "btn-primary" onClick = {() => history.push('/dispatchRiderInfo')}>&lt;&lt;Back</button>
           </div>
        </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return{
        branches: state.firestore.data.Branch,
        ridersEmp: state.dispatchRider.selectedRidersEmp,
        auth: state.firebase.auth,
        barangays: state.dispatchRider.barangays
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
        SelectDesignateBarangay: (cityID) => dispatch(SelectDesignateBarangay(cityID)),
        UpdateSelectedDispatchRider: (updateRider) => dispatch(UpdateSelectedDispatchRider(updateRider)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UpdateRiderInfo)


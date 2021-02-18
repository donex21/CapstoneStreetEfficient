import React, {useState, useEffect} from 'react'
import firebase from '../config/fbConfig'
import { activeTextSwitch, inactiveTextSwitch, customStyles } from './CustomsStyles';
import { addDispatchRiderInFirebase } from '../store/actions/dispatchRiderAction';

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Select from 'react-select'
import Switch from 'react-switch'
import { connect } from 'react-redux'

const AddDispatchRider = (props) => {
    const {branches, courierID, auth, add_dispatchrider_Error} = props
    const [checked, setChecked] = useState(false)//for status
    let displayName = auth.displayName;
    let encodedBY = displayName.split("@");
    const [addDispatchRider, setAddDispatchRider] = useState({
        fname : '',
        mname :'',
        lname :'',
        email : '',
        address: '',
        contactNumber: '',
        emerg_number: '',
        birthdate: null,
        gender: 'Male',
        branch: '',
        status: 'inactive',
        courier_id: courierID,
        encodedBY: encodedBY[1],
        vehicle_type: 'Motorcycle',
        cR : null,
        oR: null,
        license: null,
        writtenExam: null,
        actualAssessment: null
    });  

    useEffect(() => {
        checked ? setAddDispatchRider({...addDispatchRider, status: 'active'}) : setAddDispatchRider({...addDispatchRider, status: 'inactive'});
        // eslint-disable-next-line
    }, [checked]);

    useEffect(() => {
        if (!add_dispatchrider_Error){
            setAddDispatchRider({
                fname : '',
                mname :'',
                lname :'',
                email : '',
                address: '',
                contactNumber: '',
                emerg_number: '',
                birthdate: null,
                gender: 'Male',
                branch: '',
                status: 'inactive',
                courier_id: courierID,
                encodedBY: encodedBY[1],
                vehicle_type: 'Motorcycle',
                cR : null,
                oR: null,
                license: null,
                writtenExam: null,
                actualAssessment: null
            });
            setChecked(false);
        } // eslint-disable-next-line
    }, [add_dispatchrider_Error])

    const handleOnChange = (e) =>{
        setAddDispatchRider({...addDispatchRider, [e.target.name]: e.target.value})
    }

    const handleCredsOnChange = async (e) =>{   
        const file = e.target.files[0];
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(file.name);
        await fileRef.put(file);    
        setAddDispatchRider({...addDispatchRider, [e.target.name]: await fileRef.getDownloadURL()});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addDispatchRider);
        props.addDispatchRiderInFirebase(addDispatchRider);
    }

    const options = branches && Object.keys(branches).map(function (i) {
        return {
            value: branches[i].branch_name,
            label: branches[i].branch_name
        }
      });


    
    return (
        <div className = "addDR-container">
           <div className = "addDR-header">
                <h1>Dispatch Rider Registration</h1>
           </div>
           <div className = "addDR-form">
               <form onSubmit = {handleSubmit}>
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
                                    value = {addDispatchRider.fname}
                                    onChange = {handleOnChange}   
                                />
                            </div>
                            <div>
                                <label>Middle Name</label>
                                <input type="text"
                                    placeholder="Enter Middle Name" 
                                    name="mname"                        
                                    required  
                                    value = {addDispatchRider.mname}
                                    onChange = {handleOnChange}                             
                                />

                            </div>
                            <div>
                                <label>Last Name</label>
                                <input type="text"
                                    placeholder="Enter Last Name" 
                                    name="lname"                        
                                    required   
                                    value = {addDispatchRider.lname}
                                    onChange = {handleOnChange}                               
                                />
                            </div>                          
                        </div>
                        <div className = "addDR-input-email">
                            <label>Email</label>
                            <input type="email"
                                placeholder="Enter Email" 
                                name="email"
                                required
                                value = {addDispatchRider.email}
                                onChange = {handleOnChange}   
                            />
                        </div>
                        <div className = "addDR-input-address">
                            <label>Address</label>
                            <input type="text"
                                placeholder="Enter Address" 
                                name="address"
                                required
                                value = {addDispatchRider.address}
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
                                    value = {addDispatchRider.contactNumber}
                                    onChange = {handleOnChange}   
                                />
                            </div>
                            <div>
                                <label>Emergency Contact Number</label>
                                <input type="text"
                                    placeholder="Enter Emergency Number" 
                                    name="emerg_number"                        
                                    required       
                                    value = {addDispatchRider.emerg_number}
                                    onChange = {handleOnChange}                        
                                />
                            </div>                          
                        </div>
                        <div className = "addDR-inputs-gender">
                            <div>
                                <label>Gender</label>  
                                <select name="gender"  value = {addDispatchRider.gender} onChange = {handleOnChange}    >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>   
                            </div>
                            <div>
                                <label className ="label-date" >Bith Date</label>
                                <DatePicker
                                    className = "datepicker-birthdate"     
                                    selected = {addDispatchRider.birthdate}    
                                    onChange = {e =>  setAddDispatchRider({...addDispatchRider, birthdate: e})}       
                                    dateFormat = 'MM/dd/yyyy'
                                    placeholderText = "Birthdate"
                                    isClearable
                                    showYearDropdown
                                    scrollableYearDropdown   
                                    maxDate = {new Date()}                            
                                />
                            </div>                                            
                        </div>
                        <div className = "addDR-input-branch">
                            <div className = "mySelect">
                                <label> Company Branch</label>
                                <Select 
                                    styles={customStyles}
                                    options={options}
                                    classNamePrefix="mySelect"                                     
                                    placeholder = "Choose company branch"    
                                    value =  {options && options.find(obj => obj.value === addDispatchRider.branch)}
                                    onChange =  {e => setAddDispatchRider({...addDispatchRider, branch: e.value})}                     
                                    isSearchable
                                    autoFocus
                                    maxMenuHeight = {250}
                                />
                            </div>
                            <div className = "addDR-switch">
                                <label>Status:</label>
                                <Switch 
                                    className= "react-swtich"
                                    onHandleColor = "#3981e5"  
                                    onChange = {checked => setChecked(checked)}
                                    checked = {checked}             
                                    checkedIcon = {<div style = {activeTextSwitch}> active </div>}
                                    uncheckedIcon = {<div style = {inactiveTextSwitch}> inactive </div>}          
                                    width = {90}
                                    height = {25}
                                />
                            </div>
                        </div>
                   </div>
                   <hr />
                    <div>
                        <h2>Credential</h2>
                    </div>
                    <div className = "addDR-inputs-creds">
                        
                            <div>
                                <label> Vehicle Type: </label>  
                                <select name="vehicle_type" value = {addDispatchRider.vehicle_type} onChange ={handleOnChange}>
                                    <option value="Motorcycle">Motorcycle</option>
                                    <option value="Truck">Truck</option>
                                </select>  
                            </div>
                             <div>
                                <label> Actual Assessment: </label>  
                                <input type="file" 
                                    name="actualAssessment"                        
                                    required    
                                    onChange ={handleCredsOnChange}                        
                                />
                             </div>
                      
                       
                            <div>
                                <label> Written Exam Result: </label>  
                                <input type="file" 
                                    name="writtenExam"                        
                                    required       
                                    onChange = {handleCredsOnChange}                     
                                /> 
                            </div>
                             <div>
                                <label> License: </label>  
                                <input type="file" 
                                    name="license"                        
                                    required   
                                    onChange = {handleCredsOnChange}                             
                                />
                             </div>
                        
                            <div>
                                <label> Official Receipt: </label>  
                                <input type="file" 
                                    name="oR"                        
                                    required 
                                    onChange = {handleCredsOnChange}                               
                                /> 
                            </div>
                             <div>
                                <label> Certificate of Registration: </label>  
                                <input type="file" 
                                    name="cR"                        
                                    required   
                                    onChange = {handleCredsOnChange}                             
                                />
                             </div>
                        
                    </div>
                    <hr />
                    <div className = "btn-submit">
                        <button className = "btn-primary">Submit</button>
                    </div>
               </form>
           </div>
           <div className = "addDR-back">
                <button className = "btn-primary">Back</button>
           </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    console.log(state);
    return{
        branches: state.firestore.data.Branch,
        courierID: state.courier.courierId,
        auth: state.firebase.auth,
        add_dispatchrider_Error: state.dispatchRider.add_DispatchRider_Error
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        addDispatchRiderInFirebase: (addDispatchRider) => dispatch(addDispatchRiderInFirebase(addDispatchRider)),
    }
} 


 export default connect(mapStateToProps, mapDispatchToProps)(AddDispatchRider)




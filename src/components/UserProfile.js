import moment from 'moment'
import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import firebase from '../config/fbConfig'
import {calculate_age} from './CustomsStyles'
import {updateNewEmail} from '../store/actions/officeEmployeeAction'

const UserProfile = (props) => {
    const {id} = props;
    const [loading, setLoading] = useState(false);
    const [userprofile, setUserProfile] = useState({});
    const [changeEmail, setChangeEmail] = useState(false);
    const [updateEmail, setUpdateEmail] = useState('');

    var docRef = firebase.firestore().collection("Office_Employees").doc(id);

    function getUserProfile(){
        setLoading(true);
        docRef.get().then((doc) => {
            if (doc.exists) {
                setUserProfile({
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
                });
                setLoading(false);
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        }); 
    }

    useEffect(() => {
        getUserProfile();
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        props.updateNewEmail(updateEmail);
        setChangeEmail(!changeEmail);
        setUpdateEmail('');
    }

    var birthdateString = moment(userprofile.birthdate).format('LL').toString();

    if(loading){
        return <p>Loading....</p>
    }


    return (
        <div className = "container empCntr">
            <div className = "d-flex justify-content-center addDR-header">
                <h2>Profile Information</h2>
            </div>
            <div className = "row">
                <div className = "col">
                    <div className = "row">
                        <div className = "col">
                            <h5>Email: </h5>
                            <h6>{userprofile.email}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Name: </h5>
                            <h6>{userprofile.fname} {userprofile.mname} {userprofile.lname}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Age: </h5>
                            <h6>{calculate_age(userprofile.birthdate)} yrs. old</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Address: </h5>
                            <h6>{userprofile.address}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Contact Number: </h5>
                            <h6>{userprofile.contactNumber}</h6>
                        </div>
                    </div>
                </div>   
                <div className = "col">
                <div className = "row">
                        <div className = "col">
                            <h5>Gender: </h5>
                            <h6>{userprofile.gender}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Birth Date: </h5>
                            <h6>{birthdateString}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Job Title: </h5>
                            <h6>{userprofile.jobtitle}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Branch: </h5>
                            <h6>{userprofile.branch}</h6>
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <h5>Status: </h5>
                            <h6>{userprofile.status}</h6>
                        </div>
                    </div>
                </div>              
            </div>
            <div><label className = "label-area" onClick = {()=> setChangeEmail(!changeEmail)}>Change Email</label></div>
            {changeEmail ? (
                <div className = "addDR-inputs-name">
                    <div className = "row">
                        <div className = "col">
                            <input 
                                placeholder="Enter Email" 
                                name="newEmail"                             
                                required 
                                value = {updateEmail}
                                onChange = {(e)=>setUpdateEmail(e.target.value)}  
                            />
                        </div>
                        <div class="w-100"></div>
                        <div className = "col">
                            <button type="button" className = "btn btn-primary btn-sm" onClick = {handleSubmit}>Update Email</button>
                        </div>
                    </div>
                </div>): null}
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log(state); 
    return {
        id: state.firebase.auth.uid
    };
}

const mapDispatchToProps = (dispatch) =>{
    return {
        updateNewEmail: (updateEmail) => dispatch(updateNewEmail(updateEmail)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (UserProfile)

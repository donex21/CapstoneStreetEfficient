import React, {useState} from 'react'
import { connect } from 'react-redux'
import {updateNewPassword} from '../store/actions/courierAction'

function InputNewPwd(props) {
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateNewPassword(newPassword);
    }
    const {passwordSuccess} = props;
    if(passwordSuccess){
        return window.location.href = '/';
    }
    return (
        <div className = "login-main">
             <div className = "login-section">
                <img src="/images/streeteffecientlogo.png" alt= "logo" height = "100px" width = "500px"/>
                <form className = "loginForm" onSubmit = {handleSubmit}>
                    <input type="text" 
                        placeholder="Enter New Password" 
                        required
                        name="newPassword"      
                        value = {newPassword}
                        onChange = {(e) => setNewPassword(e.target.value)}         
                    />      
                    <button type="submit">Confirm</button>
                   
                </form>
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        passwordSuccess: state.courier.newPassword
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        updateNewPassword: (newPassword) => dispatch(updateNewPassword(newPassword)) 
    }
};
export default connect(mapStateToProps, mapDispatchToProps) (InputNewPwd)

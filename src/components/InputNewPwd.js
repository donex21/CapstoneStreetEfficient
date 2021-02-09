import React, {useState} from 'react'
import fbConfig from '../config/fbConfig'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import {updateNewPassword} from '../store/actions/courierAction'

function InputNewPwd(props) {
    const logout= () =>{
        fbConfig.auth().signOut();
        window.location.href = '/'
    }
    const [newPassword, setNewPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        props.updateNewPassword(newPassword);
    }
    const {passwordSucess} = props;
    if(passwordSucess){
        return <Redirect to='/'/>
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
             <button onClick={logout}>Logout</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        passwordSucess: state.courier.newPassword
    }
};

const mapDispatchToProps = (dispatch) => {
    return{
        updateNewPassword: (newPassword) => dispatch(updateNewPassword(newPassword)) 
    }
};
export default connect(mapStateToProps, mapDispatchToProps) (InputNewPwd)

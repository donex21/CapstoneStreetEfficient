import React, { useState } from 'react';
import { connect } from 'react-redux';
import {signInAuth} from '../store/actions/courierAction';
// import { useHistory } from 'react-router-dom';

function UserLogin(props) {

    // const history = useHistory();
    const [emailPwd, setEmailPwd] = useState(
        {
            email: '',
            password: ''
        }
    );

    const handleOnchange = (e) =>{
        setEmailPwd({...emailPwd, [e.target.name]: e.target.value })
    }   

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signInAuth(emailPwd);
    }

    return (
        <div className = "login-main">
             <div className = "login-section">
                <img src="/images/streeteffecientlogo.png" alt= "logo" height = "100px" width = "500px"/>
                <form className = "loginForm" onSubmit = {handleSubmit}>
                    <input type="text" 
                        placeholder="Email" 
                        required
                        name="email"
                        value = {emailPwd.email}
                        onChange = {handleOnchange}
                    />      
    
                    <input type="password" 
                        placeholder="Password" 
                        required
                        name="password" 
                        value = {emailPwd.password}
                        onChange = {handleOnchange}
                    />     
                    
                    <button type="submit">LOGIN</button>
                    {/* <h3 className = "back-to-courier" onClick = { () => history.push('/')}> &lt; Back </h3> */}
                </form>
                
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state); 
    return {
    };
  };

const mapDispatchToProps = (dispatch) =>{
    return{
        signInAuth: (emailPwd) => dispatch(signInAuth(emailPwd))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)

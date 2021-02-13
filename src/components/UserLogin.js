import React, { useState } from 'react';
import { connect } from 'react-redux';
import {signInAuth} from '../store/actions/courierAction';
import { Redirect } from 'react-router-dom'

function UserLogin(props) {

    const{newUser, auth, userError, courier_id} = props

    const [emailPwd, setEmailPwd] = useState(
        {
            email: '',
            password: '',
            courier_id: courier_id
        }
    );

    const handleOnchange = (e) =>{
        setEmailPwd({...emailPwd, [e.target.name]: e.target.value })
    }   

    const handleSubmit = (e) => {
        e.preventDefault();
        props.signInAuth(emailPwd);
    }

    if(auth.uid && newUser){
        return <Redirect to='/inputNewPassword'/>
    }else if (auth.uid){
        return <Redirect to='/'/>
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
                    <div className = "Errormessage">
                       { userError ? <span> {userError} </span> : <span> </span> }
                    </div>  
                    
                    <button type="submit">LOGIN</button>
                    {/* <h3 className = "back-to-courier" onClick = { () => history.push('/')}> &lt; Back </h3> */}
                </form>
                
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log(state); 
    return {
        newUser: state.courier.newuser,
        userError: state.courier.userError,
        courier_id: state.courier.courierId,
        auth: state.firebase.auth
    };
  };

const mapDispatchToProps = (dispatch) =>{
    return{
        signInAuth: (emailPwd) => dispatch(signInAuth(emailPwd))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)

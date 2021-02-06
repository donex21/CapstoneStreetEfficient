import React from 'react'

function InputNewPwd() {
    return (
        <div className = "login-main">
             <div className = "login-section">
                <img src="/images/streeteffecientlogo.png" alt= "logo" height = "100px" width = "500px"/>
                <form className = "loginForm">
                    <input type="text" 
                        placeholder="Input New Password" 
                        required
                        name="newPassword"               
                    />      
                    <button type="submit">Confirm</button>
                </form>
             </div>
        </div>
    )
}

export default InputNewPwd

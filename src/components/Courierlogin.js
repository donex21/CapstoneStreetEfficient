import React, {useState} from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { signInCourier } from '../store/actions/courierAction';

function CourierLogin(props) {
    
    const [validCourier, setvalidCourier] = useState(
        {courierCode: ''}
    );

    const handleOnChange = (e) =>{
        setvalidCourier({...validCourier, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e)=> {
        e.preventDefault();
        props.signInCourier(validCourier);
    }

    const {courier, courierError } = props;
    if (courier) return <Redirect to='/userlogin' /> 
    return (
        <div className = "login-main">
             <div className = "login-section">
                <img src="/images/streeteffecientlogo.png" alt= "logo" height = "100px" width = "500px"/>
                <form className = "loginForm" onSubmit = {handleSubmit}>
                    <input type="text" 
                        placeholder="Courier Code" 
                        required
                        name="courierCode"       
                        value = {validCourier.courierCode}
                        onChange = {handleOnChange}        
                    />    
                    <div className = "Errormessage">
                       { courierError ? <span> {courierError} </span> : <span> </span> }
                    </div>  
                    <button type="submit">Next &gt;&gt;&gt; </button>
                </form>
             </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    //console.log(state);
    const courier = state.courier.courierId;
    return {
        courier,
        courierError : state.courier.courierError
    };
  };

  const mapDispatchToProps = (dispatch) =>{
    return {
        signInCourier: (validCourier) => dispatch(signInCourier(validCourier)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CourierLogin);

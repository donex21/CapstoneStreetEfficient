import React, {useState} from 'react'
import { NavLink } from 'react-router-dom';
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
//import { signOut }  from '../store/actions/courierAction'
import { connect } from 'react-redux';
import fire from '../config/fbConfig'

function NavigatioHeader(props) {

    const { auth } = props;
   
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    
    let emailAdd = auth.email;
    let username = emailAdd.split("@");
    let displayName = auth.displayName;
    let jobtitle = displayName.split("@");

    // const logout = (e) =>{
    //     e.preventDefault();
    //     props.signOut();
    //     setAnchorEl(null);
    //     window.location.href = '/';
    // }

    const logout= () =>{
        fire.auth().signOut();
        window.location.href = '/'
    }

      

    return (
        <nav className = "navBarItems">
        <div className = "headerLogo">
            <img src="/images/navlogo.png" alt= "logo" height = "50px" width = "300px"/>
        </div>
        <div className = "headerMenu">
            <ul className = "headerMenuUl">
                <li><NavLink className = "headerLink"  activeStyle={{ color: 'black' }} to= "/home"> Home </NavLink> </li>
                <li className = "headerLink"> Employees
                    <div className = {jobtitle[0] === "Manager" ? `submenu-employees` : `no-submenu-employees`}>
                        <ul>
                            <li><NavLink className = "headerLink"  activeStyle={{ color: 'black' }} to= "/officeEmployees"> Office Employees </NavLink></li>
                            <li><NavLink className = "headerLink"  activeStyle={{ color: 'black' }} to= "/dispatchRiders"> Dispatch Riders </NavLink></li>
                        </ul>
                    </div>
                </li>
                <li><NavLink className = "headerLink"  activeStyle={{ color: 'black' }} to= "/items"> Items </NavLink> </li>
                <li><NavLink className = "headerLink"  activeStyle={{ color: 'black' }} to= "/ridersMap"> Map </NavLink> </li>        
                <li>
                    <button className = "navUser" onClick={handleClick} > Hi! {username[0]}</button> 

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem component={NavLink} to={'/userProfile'}  onClick={handleClose}>  Profile </MenuItem>
                        <MenuItem onClick={logout}>Logout</MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
    </nav>
    )
}

const mapStateToProps = (state) =>{
    //console.log(state)
    return{
        auth: state.firebase.auth
    }
  }

const mapDispatchToProps = (dispatch) =>{
    return{
        //signOut: () => dispatch(signOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavigatioHeader)

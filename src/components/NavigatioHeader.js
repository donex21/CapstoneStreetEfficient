import React, {useState, } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

function NavigatioHeader() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

      

    return (
        <nav className = "navBarItems">
        <div className = "headerLogo">
            <img src="/images/navlogo.png" alt= "logo" height = "50px" width = "300px"/>
        </div>
        <div className = "headerMenu">
            <ul className = "headerMenuUl">
                <li> Home </li>
                <li> Employees
                    <div className = "submenu-employees">
                        <ul>
                            <li>Office Employees</li>
                            <li>Dispatch Riders</li>
                        </ul>
                    </div>
                </li>
                <li> Items </li>
                <li>Map </li>        
                <li>
                    <button className = "navUser" onClick={handleClick} > Hi!</button> 

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                </li>
            </ul>
        </div>
    </nav>
    )
}

export default NavigatioHeader

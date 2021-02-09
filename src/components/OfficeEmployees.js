import React, {useState} from 'react'
import AddOfficeEmployee from './AddOfficeEmployee'

function OfficeEmployees() {
    const [show, setShow] = useState(false);
    const closeModalHandler = () => setShow(false);
    return (
        <>
            { show ? <div onClick={closeModalHandler} className="back-drop"></div> : null }
            <button onClick={() => setShow(true)} className="btn-openModal btn-primary">Add Employee</button>
            <AddOfficeEmployee show={show} close={closeModalHandler} />
            
            <div>
                <h1> Office Employees </h1>
            </div>
        </>
    )
}

export default OfficeEmployees

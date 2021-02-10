import React from 'react'
import '../styles/AddOfficeEmployee.scss'

export const AddOfficeEmployee = (props) => {
    const {show, close} = props
    return (
        <div className="modal-wrapper"
            style={{
                transform: show ? 'translateY(0vh)' : 'translateY(-100vh)',
                opacity: show ? '1' : '0'
            }}
        >
            <div className="modal-header">
                            <h2>Add Office Employee</h2>
                            <span onClick={close} className="close-modal-btn"> x </span>
            </div>
            
        </div>
    )
}
export default AddOfficeEmployee

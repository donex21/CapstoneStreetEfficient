import React from 'react'
import { useHistory } from "react-router-dom";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const DispatchRiders = () => {
    const history  = useHistory();
    

    return (
        <div className = "container-fluid empCntr">
            <div className = "empfirstrow">
                <button className="btn-openModal btn-primary" onClick = {() => history.push('/addDispatchRiders')}>Add Dispatch Rider</button>
                
                <div className = "d-flex justify-content-center searchOfEmp">
                    <input type = "text" placeholder ="Seacrh for...." className= "searchOfAssignRiderItem"></input>
                    {/* value = {searchInput} onChange = {onhandleChange} */}
                    <select > 
                    {/* value = {category}  onChange = {(e) => setCategory(e.target.value)} */}
                        <option value="" disabled selected hidden>Choose Category...</option>
                        <option value = "Branch">Branch</option>
                        <option value = "Email">Email</option>
                        <option value = "Last Name">Last Name</option>
                    </select>
                </div>  
            </div>
            <div className = "ARtable">
                {/* <BootstrapTable
                    striped 
                    // keyField = "email"
                    // data = {!searchInput? officeEmp : filterItems}
                    // columns = {columns}
                    pagination = {paginationFactory()}
                    // rowEvents = {rowEvents}
                    // selectRow = {selectRow}
                />   */}
            </div>
        </div>
    )
}

export default DispatchRiders 

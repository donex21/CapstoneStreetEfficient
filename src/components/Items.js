import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AllItems from './AllItems';
import DeliveredItems from './DeliveredItems';
import EntryItems from './EntryItems';
import ReturnedItems from './ReturnedItems';

function Items() {
    const history = useHistory();
    const [changesidebar, setChangesidebar] = useState();
    console.log(changesidebar)
    var sidebar;
    if(changesidebar === 'DeliveredItems')
        sidebar = <DeliveredItems/>
    else if(changesidebar === 'ReturnedItems')
        sidebar = <ReturnedItems/>
    else if(changesidebar === 'AllItems')
        sidebar = <AllItems/>
    else
        sidebar = <EntryItems/>
    return (
        <div className = "container-fluid">
            <div className = "row">
                <div className = "col-sm-2 items-sidebar">
                    <div className="row">
                        <div className="col-md">
                            <button className="btn-sidebar" onClick = {() => history.push('/addItem')}>Add Item</button>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-md">
                            <button className="btn-sidebar" onClick = {() => history.push('/assignRiderInItem')}>Assign Rider In Item</button>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-md">
                           <button className="btn-sidebar" onClick = {() => setChangesidebar('DeliveredItems')} >Delivered Items</button> 
                        </div>
                        <div className="w-100"></div>
                        <div className="col-md">
                            <button className="btn-sidebar" onClick = {() => setChangesidebar('ReturnedItems')} >Returned Items</button>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-md">
                            <button className="btn-sidebar" onClick = {() => setChangesidebar('AllItems')} >All Items</button>
                        </div>
                    </div>   
                </div>
            
                <div className = "col-sm-10 items-page">
                    {sidebar}
                </div>          
            </div>       
             
        </div>
    )   
}

export default Items

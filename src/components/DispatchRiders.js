import React from 'react'
import { useHistory } from "react-router-dom";

const DispatchRiders = () => {
    const history  = useHistory();
    

    return (
        <div>
             Dispatch Riders  
            <button className="btn-primary" onClick = {() => history.push('/addDispatchRiders')}>Add Dispatch Rider</button>
        </div>
    )
}

export default DispatchRiders

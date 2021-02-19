import React from 'react'
import { useHistory } from 'react-router-dom';

function Items() {
    const history = useHistory();
    return (
        <div>
            Items
            <button className="btn-primary" onClick = {() => history.push('/addItem')}>Add Item</button>
        </div>
    )
}

export default Items

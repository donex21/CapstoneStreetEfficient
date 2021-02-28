import React from 'react'
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

const SelectAssignRider = (props) => {
    const history = useHistory();
    const {item} = props;
    
    return (
        <div className = "container">
            <div className = "row justify-content-md-center sar-tn">
                <div className = "row"><h6>Tracking Number</h6> </div>  
                <div className="w-100"></div>
                <div className = "row" ><h1>{item.item_id}</h1> </div>  
            </div>
            <div>
                <button className = "btn-primary" onClick = {() => {history.push('/assignRiderInItem')}}>Back</button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    console.log(state)
    return{
       item: state.items.selectedUnAssignedItems
    }
}

const mapDispatchToProps = (dispatch) =>{
    return {
    }
}
 export default connect(mapStateToProps, mapDispatchToProps) (SelectAssignRider)


import React from 'react'
import {connect} from 'react-redux'

import AttemptContainer from './AttemptContainer';
import CourierName from './CourierName';
import TotalBranchDispatchRider from './TotalBranchDispatchRider';
import TotalBranchItem from './TotalBranchItem';
import TotalBranchOfficeEmployees from './TotalBranchOfficeEmployees';
import TotalUnassignedItemBranch from './TotalUnassignedItemBranch';

function Home(props) {
    const { courierID,courBranch } = props;  
    return (
        <div className = "container main-cntr">
            <CourierName  courierID = {courierID}/>
            <div className = "row">
                <div className = "col-sm-9">
                    <div className = "row cardHomeMargin">
                        <div className = "col-sm-6">
                            <TotalUnassignedItemBranch courierID = {courierID} courBranch = {courBranch}  />
                        </div>
                        <div className = "col-sm-6">
                             <TotalBranchItem courierID = {courierID} courBranch = {courBranch}/>
                        </div>
                    </div>
                    <div className = "row">
                        <div className = "col-sm-6">
                            <TotalBranchDispatchRider courierID = {courierID} courBranch = {courBranch} />
                        </div>
                        <div className = "col-sm-6">
                            <TotalBranchOfficeEmployees courierID = {courierID} courBranch = {courBranch} />
                        </div>                        
                    </div>
                </div>
                <div className = "col-sm-3">
                    <AttemptContainer />
                </div>
            </div>        
        </div>
    )
}
const mapStateToProps = (state) =>{
    console.log(state)
    return{
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}


export default connect(mapStateToProps)(Home)

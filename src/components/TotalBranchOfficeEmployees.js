import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 

const TotalBranchOfficeEmployees = (props) => {
    const { courierID, courBranch} = props;
    const [totalBranchOfficeEmployees, setTotalBranchOfficeEmployees] = useState('');
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Office_Employees").where("courier_id", "==", courierID)
        .where("branch", "==", courBranch);

    function getBranchItem(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++;
            });
            setTotalBranchOfficeEmployees(count.toString());
            setLoading(false);
        })
    }

    useEffect(() => {
        getBranchItem()
    }, [])

    if(loading){
        return <p>Loading...</p>
    }
    return (
        <div className ="card cardcolor">
            <div className="card-body">
                <h3 className="card-title">Total Office Employees</h3>
                <h2 className="card-title">{totalBranchOfficeEmployees} Office Employees</h2>
                <p className="card-text">Total of Office Employees that employed in this branch</p>                       
            </div>
        </div>
    )
}

export default TotalBranchOfficeEmployees

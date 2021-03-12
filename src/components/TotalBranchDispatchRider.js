import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 

const TotalBranchDispatchRider = (props) => {
    const { courierID, courBranch} = props;
    const [totalBranchDispatchRider, setTotalBranchDispatchRider] = useState('');
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Dispatch Riders").where("courier_id", "==", courierID)
        .where("branch", "==", courBranch);

    function getBranchItem(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var count = 0;
            querySnapshot.forEach((doc) => {
                count++;
            });
            setTotalBranchDispatchRider(count.toString());
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
                <h3 className="card-title">Total Dispatch Riders</h3>
                <h2 className="card-title">{totalBranchDispatchRider} Dispatch Riders</h2>
                <p className="card-text">Total of Dispatch Riders that employed in this branch</p>                       
            </div>
        </div>
    )
}

export default TotalBranchDispatchRider

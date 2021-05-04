import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 
import RingLoader from "react-spinners/RingLoader";

function LowestPerformanceRiders(props) {
    const { courierID, courBranch} = props;
    const [riderScore, setRiderScore] = useState([]);
    const [loading, setLoading] = useState(false)

    const ref = fire.firestore().collection("Performance").orderBy("average_score");

    function getRiderScore(){
        setLoading(true);
        ref.get()
        .then((querySnapshot) => {
            var id = 1;
            querySnapshot.forEach((doc) => {
                var ave_score = parseFloat(doc.data().average_score).toFixed(2);
                var rider_id = doc.data().rider_id;
                const docRef = fire.firestore().collection("Dispatch Riders").where("id", "==", rider_id)
                    .where("courier_id", "==", courierID)
                    .where("branch", "==", courBranch);
                docRef.get()
                .then((querySnapshotA) => {
                    if(!querySnapshotA.empty && id <= 5 ){
                        querySnapshotA.forEach((docA) => {
                            var ridersObj = {
                                id: id,
                                riderName : docA.data().fname + " " + docA.data().mname + " " + docA.data().lname,
                                score: ave_score,
                            }
                            setRiderScore((riderScore) => [...riderScore, ridersObj]);
                        });

                    id++;
                    }
                });                
            });
            setLoading(false);
        })
    }

    useEffect(() => {
        getRiderScore();    
    }, []);


    if(loading){
        return <RingLoader size = {30} color = {'#1D927A'} loading = {loading}/>
    }
    const Lowest_riders = riderScore && riderScore.map((rider) => {
        return(
            <div key={rider.riderName}>  
                <p className="card-text">{rider.id}. {rider.riderName}------{rider.score}</p>
            </div>  
        )
    })

    console.log(riderScore);
    return (
        <div className ="card cardcolor">
        <div className="card-body">
            <h3 className="card-title">Lowest Rider's Performance</h3>
            {Lowest_riders}       
        </div>
    </div>
    )
}

export default LowestPerformanceRiders

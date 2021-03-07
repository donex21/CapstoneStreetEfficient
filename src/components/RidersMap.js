import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet';

export const icon = new Icon({
    iconUrl: '/images/sfhelmet.png',
    iconSize: [80, 50]
  });


function RidersMap() {
    const [riders , setRiders] = useState([]);
    const [loading , setLoading] = useState(false);
    //const [ridersdata, setRidersdata] = useState();
    
    const ref = fire.firestore().collection("DispatchRiders_Position")
    function getRiderLocation(){
       setLoading(true); 
        ref.onSnapshot((querySnapshot) => {  
                var riderdata= [];   
                     
                querySnapshot.forEach((doc) => {  
                    riderdata.push(doc.data());
                    // var rider_id = doc.data().rider_id;
                    // var latitude = doc.data().latitude;
                    // var longitude = doc.data().longitude;
                    // var riderObj = [];
                    // var docRef = fire.firestore().collection("Dispatch Riders").doc(rider_id);
                    // docRef.get().then((doc) => {
                    //     if (doc.exists) {
                    //         riderObj.push({
                    //             fname: doc.data().fname,
                    //             lname: doc.data().lname,
                    //             mname: doc.data().mname,
                    //             contactNumber: doc.data().contactNumber,
                    //             vehicle_type: doc.data().vehicle_type,
                    //         });
                            
                            // riderdata.push(riderObj);           
                            // setRiderdata(riderdata =>[...riderdata, {
                            //     rider_id,
                            //     latitude ,
                            //     longitude,
                            //     fname: doc.data().fname,
                            //     lname: doc.data().lname,
                            //     mname: doc.data().mname,
                            //     contactNumber: doc.data().contactNumber,
                            //     vehicle_type: doc.data().vehicle_type,
                            // }]);                          
                    //     } 
                    // });  
                    // riderdata.push({rider_id, latitude, longitude)                                                
                });
               
                setRiders(riderdata);
                setLoading(false);
            });                 
    }

    useEffect(() => {
        getRiderLocation();
    }, [])

    if(loading){
        return <p>loading.....</p>
    }
    
    console.log(riders);

    return (
        <MapContainer center={[10.3321, 123.9357]} zoom={12}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />  
            {riders.map(rider => (
                <Marker
                    key={rider.rider_id}
                    position={[
                        rider.latitude,
                        rider.longitude
                    ]}
                    icon={icon}
                >
                    <Popup position={[ rider.latitude, rider.longitude]} >
                        <div>
                            <p>Name: {rider.rider_name }
                                <br/>
                                Phone: {rider.rider_contactNumber}
                                <br/>
                                Vehicle Type: {rider.vehicle_type}
                            </p>
                        </div>
                    </Popup>
                    
                 </Marker>
            ))}

        </MapContainer>
    )
}

export default RidersMap


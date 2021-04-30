import React, {useState, useEffect} from 'react'
import fire from '../config/fbConfig' 
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import { Icon } from 'leaflet';
import { connect } from 'react-redux';

export const icon = new Icon({
    iconUrl: '/images/sfhelmet.png',
    iconSize: [80, 50]
  });


function RidersMap(props) {
    const {courierID, courBranch} = props
    const [riders , setRiders] = useState([]);
    const [loading , setLoading] = useState(false);
    //const [ridersdata, setRidersdata] = useState();
    
    const ref = fire.firestore().collection("DispatchRiders_Position").where("courier_id", "==", courierID).where("branch", "==", courBranch).where("status", "==", true);
    function getRiderLocation(){
       setLoading(true); 
        ref.onSnapshot((querySnapshot) => {  
                var riderdata= [];   
                     
                querySnapshot.forEach((doc) => {  
                    riderdata.push(doc.data());                                              
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
                                <br/>
                                Destination: {rider.destination}
                            </p>
                        </div>
                    </Popup>
                    
                 </Marker>
            ))}

        </MapContainer>
    )
}

const mapStateToProps = (state) => {
    return{
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
    }
}

export default connect(mapStateToProps)(RidersMap)


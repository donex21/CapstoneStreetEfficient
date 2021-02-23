import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { getRandomString } from './CustomsStyles';
import { addItemToPrint } from '../store/actions/itemAction';
import { customStyles } from './CustomsStyles';
import Select from 'react-select'


const AddItem = (props) => {
    const {branches, courierID, courBranch, auth} = props;
    const history = useHistory();
    let displayName = auth.displayName;
    let encodedBY = displayName.split("@");
    const [addItem, setAddItem] = useState({
        itemTrackingNumber: '',
        itemSendername: '',
        itemSenderContactNumber: '',
        itemSenderAddressStreet: '',
        itemSenderAddressBarangay: '',
        itemSenderAddressCity: '',
        itemSenderAddressProvince: '',
        itemRecipientname: '',
        itemRecipientContactNumber: '',
        itemRecipientAddressStreet: '',
        itemRecipientAddressBarangay: '',
        itemRecipientAddressCity: '',
        itemRecipientAddressProvince: '', 
        itemRecipientBranch: '',
        itemSenderBranch: courBranch,
        itemqty: '',
        itemweight: '',
        itemCOD: '',
        courier_id: courierID, 
        status: 'unassigned',
        encodedBy: encodedBY[1],
        date_encoded: new Date(),
    });

    const handleOnChange = (e) =>{
        setAddItem({...addItem, [e.target.name]: e.target.value})
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(addItem);
        props.addItemToPrint(addItem);

        setAddItem({
            itemTrackingNumber: '',
            itemSendername: '',
            itemSenderContactNumber: '',
            itemSenderAddressStreet: '',
            itemSenderAddressBarangay: '',
            itemSenderAddressCity: '',
            itemSenderAddressProvince: '',
            itemRecipientname: '',
            itemRecipientContactNumber: '',
            itemRecipientAddressStreet: '',
            itemRecipientAddressBarangay: '',
            itemRecipientAddressCity: '',
            itemRecipientAddressProvince: '', 
            itemRecipientBranch: '',
            itemSenderBranch: courBranch,
            itemqty: '',
            itemweight: '',
            itemCOD: '',
            courier_id: courierID, 
            status: 'unassigned',
            encodedBy: encodedBY[1],
            date_encoded: new Date(),
        });
        history.push('/itemPrint');
    }

    const options = branches && Object.keys(branches).map(function (i) {
        return {
            value: branches[i].branch_name,
            label: branches[i].branch_name
        }
      });

    
    return (
        <div className = "addDR-container">
            <div className = "addDR-header">
                <h1>ADD ITEM</h1>
           </div>   
            <div className = "addDr-form">
                <form className = "addItem-form" onSubmit ={handleSubmit}>
                    <div className = "addItem-trackingnumber">
                        <h2>Tracking Number</h2>
                        <input type="text"
                            className = "trackingNumber-input"
                            name="itemTrackingNumber"                             
                            required   
                            readOnly 
                            onFocus = {(e) => setAddItem({...addItem, [e.target.name]: getRandomString(12)})}
                            value = {addItem.itemTrackingNumber}
                        />
                    </div>
                    <hr />
                    <div className = "sender-info-ctnr">
                        <h2>Sender Information</h2>
                        <div className = "sender-name">
                            <label>Sender Name</label>
                            <input type="text"
                                className = "senderName-input"
                                placeholder="Sender Name" 
                                name="itemSendername"                             
                                required   
                                value = {addItem.itemSendername}
                                onChange = {handleOnChange}
                               
                            />
                        </div>
                        <div className = "sender-contact">
                            <label>Sender Contact Number</label>
                            <input type="text"
                                className = "senderContact-input"
                                placeholder="Sender Contact Number" 
                                name="itemSenderContactNumber"                             
                                required   
                                value = {addItem.itemSenderContactNumber}
                                onChange = {handleOnChange}
                               
                            />
                        </div>
                        <div className = "sender-address">
                            <label>Sender Address</label>
                            <input type="text"
                                className = "senderStreet-input"
                                placeholder="Lot / Block / Phase / Subdivision / Street" 
                                name="itemSenderAddressStreet"                             
                                required  
                                value = {addItem.itemSenderAddressStreet}
                                onChange = {handleOnChange} 
                               
                            />
                            <input type="text"
                                placeholder="Barangay" 
                                name="itemSenderAddressBarangay"                              
                                required   
                                value = {addItem.itemSenderAddressBarangay}
                                onChange = {handleOnChange}
                            />
                            <input type="text"
                                placeholder="City/Municipal" 
                                name="itemSenderAddressCity"                             
                                required   
                                value = {addItem.itemSenderAddressCity}
                                onChange = {handleOnChange}
                            />
                            <input type="text"
                                placeholder="Province" 
                                name="itemSenderAddressProvince"                             
                                required   
                                value = {addItem.itemSenderAddressProvince}
                                onChange = {handleOnChange}
                               
                            />
                        </div>

                    </div>
                    <hr />
                    <div className = "recipient-info-ctnr">
                        <h2>Recipient Information</h2>
                        <div className = "recipient-name">
                            <label>Recipient Name</label>
                            <input type="text"
                                className = "recipientName-input"
                                placeholder="Recipient Name" 
                                name="itemRecipientname"                             
                                required  
                                value = {addItem.itemRecipientname}
                                onChange = {handleOnChange} 
                               
                            />
                        </div>
                        <div className = "recipient-contact">
                            <label>Recipient Contact Number</label>
                            <input type="text"
                                className = "recipientContact-input"
                                placeholder="Recipient Contact Number" 
                                name="itemRecipientContactNumber"                             
                                required 
                                value = {addItem.itemRecipientContactNumber}
                                onChange = {handleOnChange} 
                            />
                        </div>
                        <div className = "recipient-address">
                            <label>Recipient Address</label>
                            <input type="text"
                                className = "recipientStreet-input"
                                placeholder="Lot / Block / Phase / Subdivision / Street" 
                                name="itemRecipientAddressStreet"                             
                                required   
                                value = {addItem.itemRecipientAddressStreet}
                                onChange = {handleOnChange}                  
                            />
                            <input type="text"
                                placeholder="Barangay" 
                                name="itemRecipientAddressBarangay"                             
                                required   
                                value = {addItem.itemRecipientAddressBarangay}
                                onChange = {handleOnChange} 
                            />
                            <input type="text"
                                placeholder="City/Municipal" 
                                name="itemRecipientAddressCity"                             
                                required   
                                value = {addItem.itemRecipientAddressCity}
                                onChange = {handleOnChange} 
                            />
                            <input type="text"
                                placeholder="Province" 
                                name="itemRecipientAddressProvince"                             
                                required   
                                value = {addItem.itemRecipientAddressProvince}
                                onChange = {handleOnChange} 
                            />
                        </div>

                    </div>
                    <hr />
                    <div className = "item-info-ctnr">
                        <h2>Item Information</h2>
                        <div className = "item-qty">
                            <label>Quantity</label>
                            <input type="text"
                                className = "itemqty-input"
                                placeholder="Pieces" 
                                name="itemqty"                             
                                required   
                                value = {addItem.itemqty}
                                onChange = {handleOnChange} 
                            />
                        </div>
                        <div className = "item-weight">
                            <label>Weight</label>
                            <input type="text"
                                className = "itemWeight-input" 
                                placeholder="kgs." 
                                name="itemweight"                             
                                required   
                                value = {addItem.itemweight}
                                onChange = {handleOnChange} 
                            />
                        </div>
                        <div className = "itemCOD">
                            <label>COD</label>
                            <input type="text"
                                className = "itemCOD-input"
                                placeholder="Php." 
                                name="itemCOD"                             
                                required   
                                value = {addItem.itemCOD}
                                onChange = {handleOnChange} 
                            />
                        </div>
                    </div>
                    <hr />
                    <div className = "deliverTo">
                        <h2>Deliver To: </h2>
                        <div>
                            <label>Branch Warehouse</label>
                            <Select 
                            styles={customStyles}
                            required
                            classNamePrefix="mySelect" 
                            options={options}
                            placeholder = "Choose Recipient warehouse branch" 
                            value =  {options && options.find(obj => obj.value === addItem.itemRecipientBranch)}
                            onChange =  {e => setAddItem({...addItem, itemRecipientBranch: e.value})}
                            isSearchable
                            autoFocus
                            maxMenuHeight = {250}
                         />
                        </div>
                           
                    </div>
                    <hr />
                    <div className = "btn-submit">
                        <button className = "btn-primary">Submit</button>
                    </div>

                </form>

            </div>
            <div className = "addDR-back">
                <button className = "btn-primary" onClick = {() => {history.push('/items')}}>Back</button>
           </div>
        </div>
    )
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{
        branches: state.firestore.data.Branch,
        courierID: state.courier.courierId,
        courBranch: state.courier.courBranch,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
       addItemToPrint: (addItem) => dispatch(addItemToPrint(addItem)) 
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (AddItem)

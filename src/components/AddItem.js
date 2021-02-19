import React from 'react'
import { useHistory } from 'react-router-dom';

const AddItem = () => {
    const history = useHistory();
    return (
        <div className = "addDR-container">
            <div className = "addDR-header">
                <h1>ADD ITEM</h1>
           </div>   
            <div className = "addDr-form">
                <form className = "addItem-form">
                    <div className = "addItem-trackingnumber">
                        <h2>Tracking Number</h2>
                        <input type="text"
                            className = "trackingNumber-input"
                            name="itemTrackingNumber"                             
                            required   
                            readOnly 
                            value = "1234567" 
                        />
                    </div>
                    <hr />
                    <div className = "sender-info-ctnr">
                        <h2>Sender Information</h2>
                        <div className = "sender-name">
                            <label>Sender Name</label>
                            <input type="text"
                                placeholder="Sender Name" 
                                name="itemSendername"                             
                                required   
                               
                            />
                        </div>
                        <div className = "sender-contact">
                            <label>Sender Contact Number</label>
                            <input type="text"
                                placeholder="Sender Contact Number" 
                                name="itemSenderContactNumber"                             
                                required   
                               
                            />
                        </div>
                        <div className = "sender-address">
                            <label>Sender Address</label>
                            <input type="text"
                                placeholder="Lot / Block / Phase / Subdivision / Street" 
                                name="itemSenderAddressStreet"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="Barangay" 
                                name="itemSenderAddressBarangay"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="City/Municipal" 
                                name="itemSenderAddressCity"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="Province" 
                                name="itemSenderAddressProvince"                             
                                required   
                               
                            />
                        </div>

                    </div>
                    <hr />
                    <div className = "recipient-info-ctnr">
                        <h2>Recipient Information</h2>
                        <div className = "recipient-name">
                            <label>Recipient Name</label>
                            <input type="text"
                                placeholder="Recipient Name" 
                                name="itemRecipientname"                             
                                required   
                               
                            />
                        </div>
                        <div className = "recipient-contact">
                            <label>Recipient Contact Number</label>
                            <input type="text"
                                placeholder="Recipient Contact Number" 
                                name="itemRecipientContactNumber"                             
                                required 
                               
                            />
                        </div>
                        <div className = "recipient-address">
                            <label>Recipient Address</label>
                            <input type="text"
                                placeholder="Lot / Block / Phase / Subdivision / Street" 
                                name="itemRecipientAddressStreet"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="Barangay" 
                                name="itemRecipientAddressBarangay"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="City/Municipal" 
                                name="itemRecipientAddressCity"                             
                                required   
                               
                            />
                            <input type="text"
                                placeholder="Province" 
                                name="itemRecipientAddressProvince"                             
                                required   
                               
                            />
                        </div>

                    </div>
                    <hr />
                    <div className = "item-info-ctnr">
                        <h2>Item Information</h2>
                        <div className = "item-qty">
                            <label>Quantity</label>
                            <input type="text"
                                placeholder="Pieces" 
                                name="itemqty"                             
                                required   
                               
                            />
                        </div>
                        <div className = "item-weight">
                            <label>Weight</label>
                            <input type="text"
                                placeholder="Weight" 
                                name="itemweight"                             
                                required   
                               
                            />
                        </div>
                        <div className = "itemCOD">
                            <label>COD</label>
                            <input type="text"
                                placeholder="Php" 
                                name="itemCOD"                             
                                required   
                               
                            />
                        </div>
                    </div>
                    <hr />
                    <div className = "deliverTo">
                        <h2>Deliver To: </h2>
                        <div>
                            <label>Branch Warehouse</label>
                            <input type="text"
                                placeholder="Php" 
                                name="itemCOD"                             
                                required   
                               
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

export default AddItem

import React from 'react'
import Barcode from 'react-barcode'

export class AddItemToPrint extends React.PureComponent { 
    render() {
        const itemToPrint = this.props.itemToPrint
        var barcodeNumber = itemToPrint.item_id.toString();
        return (
            <>
                <div className = "addtoprint-cntr">
                    <div className = "headerprint">
                        <div className = "logoToPrint">
                            <img src="/images/streetfinalLogo.png" alt= "logo" height = "50px" width = "100%"/>
                        </div>
                        <div className ="headerbarcode">
                            <Barcode value= {barcodeNumber} />
                        </div>
                    </div>
                    <div className = "shipToPrint">
                        <div className = "shipTo">
                            <p>Ship To: </p>
                        </div>
                        <div className = "shipToDetail">
                            <div className = "shipToName"> Name: {itemToPrint.itemRecipientname}</div>
                            <div className = "shipToAddress"> Address: {itemToPrint.itemRecipientAddressStreet}, {itemToPrint.itemRecipientAddressBarangay}, {itemToPrint.itemRecipientAddressCity}</div>
                            <div className = "shipToBarangay"> Barangay: {itemToPrint.itemRecipientAddressBarangay}</div>    
                            <div className = "shipToCity"> City: {itemToPrint.itemRecipientAddressCity}</div>  
                            <div className = "shipToProvince"> Province: {itemToPrint.itemRecipientAddressProvince}</div> 
                            <div className = "shipToContactNumber"> Phone Number: {itemToPrint.itemRecipientContactNumber}</div>   
                        </div>
                    </div>
                    <div className = "printSender">
                        <div className = "printFrom">
                            <p>From: </p>
                            <p>Sender </p>
                        </div>
                        <div className = "printsenderDeatil">
                            <div className = "printsenderName"> Name: {itemToPrint.itemSendername}</div>
                            <div className = "printsenderAddress"> Address: {itemToPrint.itemSenderAddressStreet}, {itemToPrint.itemSenderAddressBarangay}, {itemToPrint.itemSenderAddressCity}</div>
                            <div className = "printsenderBarangay"> Barangay: {itemToPrint.itemSenderAddressBarangay}</div>    
                            <div className = "printsenderCity"> City: {itemToPrint.itemSenderAddressCity}</div>  
                            <div className = "printsenderProvince"> Province: {itemToPrint.itemSenderAddressProvince}</div> 
                            <div className = "printsenderContactNumber"> Phone Number: {itemToPrint.itemSenderContactNumber}</div>   
                        </div>
                    </div>   
                    <div className = "bottomBarcode">  
                        <div>           
                            <Barcode value= {barcodeNumber} />
                        </div>                       
                    </div>     
                </div>          
            </>
        );      
    }
}
export default AddItemToPrint










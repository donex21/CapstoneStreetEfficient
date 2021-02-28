import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import AddItemToPrint from './AddItemToPrint';
import { addItemDB } from '../store/actions/itemAction';
import { useHistory } from 'react-router-dom';


const ItemPrint = (props) => {
    const history = useHistory();
    const {itemToPrint} = props;
    const pageStyle = `
        @page {
            margin:20mm
        }
        `;
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        pageStyle: pageStyle,
    });
    const handleSave = (e) => {
        e.preventDefault();
        props.addItemDB(itemToPrint);
        history.push('/addItem')
    }

  return (
    <div className = "main-container">
    <div className =  "addtoprint-mcntr">
        <AddItemToPrint ref={componentRef} itemToPrint = {itemToPrint}/>
        <div className ="printButtons">
            <div className ="backbtn">
                    <button className = "btn-primary" onClick = {() => {history.push('/addItem')}}>Cancel</button>
            </div>
            <div className ="printButton">
                <button className = "btn-primary " onClick={handlePrint}> Print Receipt</button>
            </div>
            <div className ="saveItemButton">
                <button className = "btn-primary " onClick = {handleSave}> Save</button>
            </div>
            
        </div>
        
      
    </div>
    </div>
  )
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{
       itemToPrint: state.items.addItem
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
       addItemDB: (itemToPrint) => dispatch(addItemDB(itemToPrint)) 
    }
} 

export default connect(mapStateToProps, mapDispatchToProps) (ItemPrint)
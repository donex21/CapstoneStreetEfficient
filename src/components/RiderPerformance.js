import React, { useMemo ,useEffect, useState } from 'react'
import fire from '../config/fbConfig' 
import { PerformanceColumns } from './TableColumns';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory  from 'react-bootstrap-table2-paginator';
import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();

const RiderPerformance = (props) => {
    const {riderID} = props;
    const [searchDate, setSearchDate] = useState();
    const [dayScore , setDayScore] = useState([]);
    const [overallScore, setOverallScore] = useState(); 
    const [loading , setLoading] = useState(false);
    const [filterDate, setFilterDate] = useState([]);
    const [searchOn, setSearchOn] = useState(false);

    const ref = fire.firestore().collection("Route_Header").where("rider_id", "==", riderID);
    const ref1  = fire.firestore().collection("Performance").doc(riderID)
    function getPerformannce(){
        setLoading(true)
        setDayScore([]);
        ref1.get().then((doc) => {
            if (doc.exists) {
               setOverallScore(parseFloat(doc.data().average_score).toFixed(2))
               ref.get()
                .then((querySnapshot) => {
                    var id = 1;
                    querySnapshot.forEach((doc) => {
                        var scoreObj = {
                            id: id++,
                            date: moment(doc.data().date.toDate()).format('LL').toString(),
                            score: parseFloat(doc.data().total_score).toFixed(2),
                        }
                        setDayScore((dayScore) => [...dayScore, scoreObj]);       
                    });
                });
            } 
            setLoading(false);
        });
    }

    useEffect(() => {
        getPerformannce();
    }, [])

    const columns = useMemo(() => PerformanceColumns, []);
    const rowEvents = {
        onDoubleClick: (e, row) => {
           console.log(row);    
        //    setModalInfo(row);
        //    toggleTrueFalse();
        }
    }
    const selectRow = {
        mode: "radio",
        clickToSelect: true,
        bgColor: "#00BFFF",
      };
      const handleSearch = (e) =>{
        e.preventDefault();
        setSearchOn(true);
        if(!searchDate){
            toast.error('No Date Selected');
        }else{
            let newArray = dayScore.filter((sinlgeScore) => {      
                let searchValue = sinlgeScore.date;
                return searchValue.indexOf( moment(searchDate).format('LL').toString()) !==-1;          
            });
            setFilterDate(newArray);
        }
      }

      const handleDisplayAll = (e) => {
        e.preventDefault();
        setSearchOn(false);
      }

    if(loading){
        return <p>loading.....</p>
    }

    return (
        <div className = "container">
            <div>
                <h5><u>Overall Score</u></h5>
                <h2>{overallScore}</h2>
            </div>
            <div className = "ARtable">      
                <div className = "input-group ">
                    <div className="form-outline search-date">
                        <DatePicker     
                            selected = {searchDate}    
                            onChange = {e =>  setSearchDate(e)}       
                            dateFormat = 'MM/dd/yyyy'
                            placeholderText = "Search Date"
                            showYearDropdown
                            scrollableYearDropdown   
                            maxDate = {new Date()}                            
                        />
                    </div>
                    <button type="button" className="btn-primary small search-date" onClick = {handleSearch}>
                        Search
                    </button>
                    <button type="button" className="btn-primary small" onClick = {handleDisplayAll}>
                        All 
                    </button>
                </div>  
                <BootstrapTable
                    striped 
                    keyField = "id"
                    data = {searchOn ? filterDate : dayScore}
                    columns = {columns}
                    pagination = {paginationFactory()}
                    rowEvents = {rowEvents}
                    selectRow = {selectRow}
                />
            </div>
        </div>
    )
}

export default RiderPerformance

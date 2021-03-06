export const AssignRiderColumns = [
    {dataField: "item_id", text: "Item ID", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemRecipientname", text: "Recipient Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true },
    {dataField: "itemRecipientContactNumber", text: "Recipient Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'} },
    {dataField: "itemSendername", text: "Sender Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "itemSenderContactNumber", text: "Sender Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemCOD", text: "COD Price", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "date_encoded" ,text: "Date Entry", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => { 
            if (order === 'asc')
            {
            return Date.parse(a) - Date.parse(b)
            }
        else if (order === 'desc') {
            return  Date.parse(b) - Date.parse(a) 
            }
        }
    }
]

export const DispatchRidersAssign = [
    {dataField: "fname", text: "First Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "mname", text: "Middle Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "lname", text: "Last Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "designateBarangay", text: "Assign Barangay", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "vehicle_type", text: "Vehicle Type", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "contactNumber", text: "Contact Number", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemtotalweight", text: "Total Weight", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemdaytotal", text: "Total Item", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
]

export const OfficeEmployeeColumn = [
    {dataField: "email", text: "Email", headerStyle: (colum, colIndex) => {
        return { width: '300px', textAlign: 'center', backgroundColor: 'rgba(57,129,229, 0.5)' };
      }, sort: true},
    {dataField: "fname", text: "First Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "mname", text: "Middle Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "lname", text: "Last Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "branch", text: "Branch", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "contactNumber", text: "Contact Number", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "status", text: "Status", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
]

export const RiderItemsColumns = [
    {dataField: "item_id", text: "Item ID", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemRecipientname", text: "Recipient Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true },
    {dataField: "itemRecipientContactNumber", text: "Recipient Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'} },
    {dataField: "itemSendername", text: "Sender Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "itemSenderContactNumber", text: "Sender Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemCOD", text: "COD Price", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "del_date_sched" ,text: "Delivered Date", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => { 
            if (order === 'asc')
            {
            return Date.parse(a) - Date.parse(b)
            }
        else if (order === 'desc') {
            return  Date.parse(b) - Date.parse(a) 
            }
        }
    }
]

export const ReturnedItemsColumns = [
    {dataField: "item_id", text: "Item ID", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemRecipientname", text: "Recipient Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true },
    {dataField: "itemRecipientContactNumber", text: "Recipient Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'} },
    {dataField: "itemSendername", text: "Sender Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "itemSenderContactNumber", text: "Sender Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemCOD", text: "COD Price", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "del_date_sched" ,text: "Last Date Attempted", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true,
        sortFunc: (a, b, order, dataField, rowA, rowB) => { 
            if (order === 'asc')
            {
            return Date.parse(a) - Date.parse(b)
            }
        else if (order === 'desc') {
            return  Date.parse(b) - Date.parse(a) 
            }
        }
    }
]

export const DeliveryAttempColumns = [
    {dataField: "id", text: "Item ID", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "item_counter", text: "Attempt", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)',
        width: '80px'
        }, sort: true},
]

export const PerformanceColumns = [
    {dataField: "date", text: "Date", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "score", text: "Score", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
]

export const TodayItemsColumns = [
    {dataField: "item_id", text: "Item ID", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemRecipientname", text: "Recipient Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true },
    {dataField: "itemRecipientContactNumber", text: "Recipient Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'} },
    {dataField: "itemSendername", text: "Sender Name", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
    {dataField: "itemSenderContactNumber", text: "Sender Phone", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "itemCOD", text: "COD Price", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}},
    {dataField: "rider_name", text: "Rider", headerStyle: { backgroundColor: 'rgba(57,129,229, 0.5)'}, sort: true},
]



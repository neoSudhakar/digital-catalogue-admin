import { AgGridReact } from 'ag-grid-react'; 

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

import classes from "./Account.module.css";

const AccountTable = ({data}) => {

    const columnDefs=[
        { headerName: 'Id', field: 'accountId' },
        { headerName: 'Name', field: 'name' },
        { headerName: 'Phone Number', field: 'phoneNum' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Type', field: 'accountType' }
    ];

    

    return(
        <div className={classes.table}>
            <div className="ag-theme-alpine"  style={{width: "100%", height: 200}}>

                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                />
            </div>
        </div>
    )
  
  
};

export default AccountTable;
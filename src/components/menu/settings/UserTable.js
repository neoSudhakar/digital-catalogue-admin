import { AgGridReact } from 'ag-grid-react'; 

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

import classes from "./Account.module.css";

const UserTable = ({data}) => {

    const columnDefs=[
        { headerName: 'Id', field: 'userId' },
        { headerName: 'First Name', field: 'firstName' },
        { headerName: 'Last Name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Account', field: 'account' },
        { headerName: 'Role' ,field: 'userRole'}
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

export default UserTable;
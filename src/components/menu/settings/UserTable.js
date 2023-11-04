import { AgGridReact } from 'ag-grid-react'; 
import { useMemo } from 'react';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

import classes from "./User.module.css";

const UserTable = ({data}) => {

    const columnDefs=[
        { headerName: 'Id', field: 'userId',width: 100, minWidth: 100, maxWidth: 100 },
        { headerName: 'First Name', field: 'firstName' },
        { headerName: 'Last Name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        { headerName: 'Account', field: 'account' },
        { headerName: 'Role' ,field: 'userRole'}
    ];

    const defaultColDef = useMemo(() => {
        return {
          resizable: true,
          sortable: true,
        };
      }, []);


    return(
        <div style={{margin: 15}}>
            <div className="ag-theme-alpine"  style={{width: "100%", height: 200}}>

                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={data}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
        </div>
    )
  
  
};

export default UserTable;
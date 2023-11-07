import { AgGridReact } from 'ag-grid-react'; 
import { useMemo, useState, useEffect } from 'react';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

import classes from "./User.module.css";

const UserTable = ({data}) => {

    const [rowData, setRowData] = useState([]);

    useEffect(()=>{
        setRowData(data);
    },[]);

    const columnDefs=[
        { headerName: 'Id', field: 'id',width: 100, minWidth: 100, maxWidth: 100 },
        { headerName: 'First Name', field: 'firstName' },
        { headerName: 'Last Name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        {
            headerName: 'Role',
            field: 'userRole',
            valueGetter: (params) => {
              const roles = params.data.roleSet.map((role) => role.role);
              return roles.join(', '); 
            }
        },
        {
            headerName: 'Account',
            field: 'account',
            valueGetter: (params) => {
                if (params.data.account && params.data.account.name) {
                    return params.data.account.name; 
                }
            }
        }
    ];

    const defaultColDef = useMemo(() => {
        return {
          resizable: true,
          sortable: true,
        };
      }, []);


    return(
        <div style={{margin: 15}}>
            <div className="ag-theme-alpine"  style={{width: "100%", height: 300}}>

                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
        </div>
    )
  
  
};

export default UserTable;
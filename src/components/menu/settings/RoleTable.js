import { AgGridReact } from 'ag-grid-react';
import { useMemo } from 'react'; 
import "./Account.module.css";

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function RoleTable({data}) {

    console.log(data);
    const columnDefs=[
        { headerName: 'Id', field: 'id', width: 100, minWidth: 100, maxWidth: 100 },
        { headerName: 'Role', field: 'role' },
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
                    rowData={data}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
        </div>
    )
};
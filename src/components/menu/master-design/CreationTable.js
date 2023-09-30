import React, { useState, useRef, useEffect, useMemo, useCallback} from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS

const CreationTable = ({rowDataArr}) => {

//   const gridRef = useRef(); // Optional - for accessing Grid's API

  const [rowData, setRowData] = useState([]);  //Set rowData to Array of Objects, one Object per Row
  // const [rowData, setRowData]= useState([
  //   {"Sno": 1, type:"Type 1", stoneGroup:" Stone Group 1" , pcs: 1, stoneWt: 1, "UOM":"Grms" },
  //   {"Sno": 2, type:"Type 2", stoneGroup:" Stone Group 2" , pcs: 2, stoneWt: 2, "UOM":"Cts" },
  //   {"Sno": 3, type:"Type 3", stoneGroup:" Stone Group 3" , pcs: 3, stoneWt: 3, "UOM":"Cts" },
  // ]);
  useEffect(()=>{
    setRowData(rowDataArr);
  },[rowDataArr]);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {field: "Sno", filter: true},
    {field: 'type', filter: true},
    {field: 'stoneGroup', filter: true},
    {field: "pcs", filter: true},
    {field: "stoneWt", filter: true},
    {field: "UOM", filter: true},
  ]);



  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
      sortable: true
    }));

  // Example of consuming Grid Event
  const cellClickedListener = useCallback( event => {
    console.log('cellClicked', event);
  }, []);

  // Example load data from server
//   useEffect(() => {
//     fetch('https://www.ag-grid.com/example-assets/row-data.json')
//     .then(result => result.json())
//     .then(rowData => setRowData(rowData))
//   }, []);



  // Example using Grid's API
//   const buttonListener = useCallback( e => {
//     gridRef.current.api.deselectAll();
//   }, []);

  return (
    <div>

      {/* Example using Grid's API */}
      {/* <button onClick={buttonListener}>Push Me</button> */}

      {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
      <div className="ag-theme-alpine"  style={{width: "100%", height: 200}}>

        <AgGridReact
            // ref={gridRef} // Ref for accessing Grid's API

            rowData={rowData} // Row Data for Rows

            columnDefs={columnDefs} // Column Defs for Columns
            defaultColDef={defaultColDef} // Default Column Properties
            animateRows={true} // Optional - set to 'true' to have rows animate when sorted
            rowSelection='multiple' // Options - allows click selection of rows

            onCellClicked={cellClickedListener} // Optional - registering for Grid Event
            />
      </div>
    </div>
  );
};

export default CreationTable;
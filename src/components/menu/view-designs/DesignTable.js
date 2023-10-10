import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component

import classes from "./DesignTable.module.css";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import ModalComponent from "./ModalComponent";
import AddDesignTableForm from "./AddDesignTableForm";

const DesignTable = ({ rowDataArr }) => {
  const [isModelOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState();
  //   const gridRef = useRef(); // Optional - for accessing Grid's API
  const [gridApi, setGridApi] = useState(null);

  const [rowData, setRowData] = useState([]); //Set rowData to Array of Objects, one Object per Row

  useEffect(() => {
    setRowData(rowDataArr);
    setFormData();
  }, [rowDataArr]);

  function handleStartUpdateRow(data){
    setFormData(data);
    // const {data} = params;
    console.log(data);

    // const {type, stoneGroup, pieces, stoneWeight} = data;
    setIsModalOpen(true);
  }

  function handleUpdateAction(updatedData){
    console.log("UpdatedData", updatedData);
  }

  function handleCancelUpdateRow(){
    setFormData();
    setIsModalOpen(false);
  }

  function handleDeleteRow(value){
    // const {value}=params;
    console.log(value);
    const confirm= window.confirm("Are you sure?");

    if(confirm){
      alert("Deleted");
    }
  }

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    {
      headerName: "Sno.",
      field: "Sno",
      filter: false,
      width: 100,
      maxWidth: 110,
      minWidth: 100,
    },
    { headerName: "Type", field: "type", filter: false }, //width: 160, minWidth: 160, maxWidth: 200,
    { headerName: "Stone Group", field: "stoneGroup", filter: false }, //width: 180, minWidth: 180, maxWidth: 220,
    { headerName: "Pcs", field: "pieces", filter: false }, //width: 150, minWidth: 150, maxWidth: 160,
    { headerName: "Stone Wt", field: "stoneWeight", filter: false }, //width: 150, minWidth: 150, maxWidth: 160,
    { headerName: "UOM", field: "unitOfMeasurement", filter: false }, // width: 100, minWidth: 100, maxWidth: 120,
    {
      headerName: "Actions",
      field: "Sno",
      filter: false,
      // minWidth: 300,
      cellRenderer: (params) => (
        <div>
          <button className={classes.update} onClick={handleStartUpdateRow.bind(this,params.data)} >Update</button>
          <button className={classes.delete} onClick={handleDeleteRow.bind(this,params.value)}>Delete</button>
        </div>
      ),
    },
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
      sortable: true,
    };
  }, []);


  const onGridReady = (params) => {
    setGridApi(params)
  }

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback((event) => {
  //   console.log("cellClicked", event);
  // }, []);

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
      <div className="ag-theme-alpine" style={{ width: "100%", height: 200 }}>
        <AgGridReact
          // ref={gridRef} // Ref for accessing Grid's API

          rowData={rowData} // Row Data for Rows
          columnDefs={columnDefs} // Column Defs for Columns
          defaultColDef={defaultColDef} // Default Column Properties
          animateRows={true} // Optional - set to 'true' to have rows animate when sorted
          // rowSelection="multiple" // Options - allows click selection of rows
          // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
          onGridReady={onGridReady}
        />
      </div>
      {isModelOpen && <ModalComponent
        title="UPDATE DESIGN"
        isOpen={isModelOpen}
        style={{ minWidth: "50%", maxWidth: "90%" }}
      >
        <AddDesignTableForm onCloseModal={handleCancelUpdateRow} formData={formData} onAction={handleUpdateAction} />
      </ModalComponent>}
    </div>
  );
};

export default DesignTable;

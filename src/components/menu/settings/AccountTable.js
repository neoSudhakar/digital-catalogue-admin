import { AgGridReact } from 'ag-grid-react';
import { useMemo, useState } from 'react'; 
import { Modal } from 'antd';
import classes from "./Tables.module.css";
import Account from './Account';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import UpdateModal from './UpdateModal';


const AccountTable = ({data, refetchData}) => {

    const [rowData, setRowData] =useState(data);
    const [selectedRow, setSelectedRow]= useState();
    const [isModalOpen, setIsModalOpen] =useState(false);

    async function refetch() {
      try {
        const response = await fetch('http://localhost:8080/api/accounts');
        
        if (response.status === 204) {
          
        } else if(response.status === 200) {
          const data = await response.json();
          setRowData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    function handleCloseModal() {
        setIsModalOpen(false);
    };

    const handleUpdateRow= (row) => {
        setSelectedRow(row);
        setIsModalOpen(true);
    };

    const handleDeleteRow = (rowToDelete) => {
        fetch(`http://localhost:8080/api/accounts/${rowToDelete.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
        
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log('Row deleted from the backend:', rowToDelete);
              // Update the state to reflect the deletion
              const updatedRows = rowData.filter((row) => row.id !== rowToDelete.id);
              setRowData(updatedRows);
            } else {
              // Handle errors if any
              console.error('Failed to delete row from the backend.');
              message.error('Failed to delete row from the backend.');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
            message.error('Error occurred while deleting the row.');
          });
      };

    const columnDefs=[
        { headerName: 'Id', field: 'id', width: 100, minWidth: 100, maxWidth: 100 },
        { headerName: 'Name', field: 'name', width: 300},
        { headerName: 'Phone Number', field: 'phoneNumber' },
        { headerName: 'Email', field: 'email', width: 250 },
        { headerName: 'Type', field: 'accountType'},
        {
            headerName: "Actions",
            width: 300,
            cellRenderer: (params) => (
              <div>
                <button
                  className={classes.update}
                  onClick={handleUpdateRow.bind(this, params.data)}
                >
                  Update
                </button>
                <button
                  className={classes.delete}
                  onClick={handleDeleteRow.bind(this, params.data)}
                >
                  Delete
                </button>
              </div>
            ),
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
            <UpdateModal openModal={isModalOpen} closeModal= {handleCloseModal} title={"UPDATE ACCOUNT"}>
                <Account refetchAccountData={refetch} closeModal={handleCloseModal} selectedRow={selectedRow}/>
            </UpdateModal>
        </div>

    )
  
  
};

export default AccountTable;
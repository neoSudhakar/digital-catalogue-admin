import { AgGridReact } from 'ag-grid-react'; 
import { useMemo, useState, useEffect } from 'react';
import UpdateModal from '../UpdateModal';
import User from './User';

import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';

import classes from "../Tables.module.css";

const UserTable = ({data , accountData, roleData}) => {

  const [rowData, setRowData] =useState(data);
  const [selectedRow, setSelectedRow]= useState();
  const [isModalOpen, setIsModalOpen] =useState(false);

  async function refetch() {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      
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
    fetch(`http://localhost:8080/api/users/${rowToDelete.id}`, {
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


    //console.log("rowdata is:",rowData);
    const columnDefs=[
        { headerName: 'Id', field: 'id',width: 100, minWidth: 100, maxWidth: 100 },
        { headerName: 'First Name', field: 'firstName' },
        { headerName: 'Last Name', field: 'lastName' },
        { headerName: 'Email', field: 'email' },
        {
            headerName: 'Role',
            field: 'userRole',
            valueGetter: (params) => {
                if(params.data.roleSet){
                    const roles = params.data.roleSet.map((role) => role.role);
                    return roles.join(', '); 
                }
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
        },
        {
            headerName: "Actions",
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
            <UpdateModal openModal={isModalOpen} closeModal= {handleCloseModal} title={"UPDATE USER"}>
                <User refetchUserData={refetch} accountData={accountData} roleData={roleData} closeModal={handleCloseModal} selectedRow={selectedRow}/>
            </UpdateModal>
        </div>
    )
  
  
};

export default UserTable;
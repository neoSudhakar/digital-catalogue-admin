import { AgGridReact } from 'ag-grid-react';
import { useMemo , useState} from 'react'; 
import classes from "../Tables.module.css";
import UpdateModal from '../UpdateModal';


import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import StoneGroup from './StoneGroup';
import { getPermissionsObj } from '../../../../util/auth';
import { BASE_URL } from '../../../../util/http';

export default function StoneGroupTable({data}) {

  const permissions= getPermissionsObj();

  const [rowData, setRowData] =useState(data);
  const [selectedRow, setSelectedRow]= useState();
  const [isModalOpen, setIsModalOpen] =useState(false);


  async function refetch() {
    try {
      const response = await fetch(BASE_URL+'/stonegroups');
      
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
    fetch(BASE_URL+`/stonegroups/${rowToDelete.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
    
      },
    })
    .then((response) => {
      if (response.ok) {
        console.log('Row deleted from the backend:', rowToDelete);
        const updatedRows = rowData.filter((row) => row.id !== rowToDelete.id);
        setRowData(updatedRows);
      } else {
        console.error('Failed to delete row from the backend.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

    //console.log(data);
    const columnDefs=[
        { headerName: 'Id', field: 'id', width: 200, minWidth: 200, maxWidth: 200 },
        { headerName: 'Stone Group', field: 'name', width:450 },
        {
            headerName: "Actions",
            width:700,
            cellRenderer: (params) => (
              <div>
                <button
                  className={classes.update}
                  onClick={handleUpdateRow.bind(this, params.data)}
                  disabled={permissions && !permissions.features.Settings.edit}
                >
                  Update
                </button>
                <button
                  className={classes.delete}
                  onClick={handleDeleteRow.bind(this, params.data)}
                  disabled={permissions && !permissions.features.Settings.delete}
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
            <UpdateModal openModal={isModalOpen} closeModal= {handleCloseModal} title={"UPDATE STONE GROUP"}>
                <StoneGroup refetchData={refetch} closeModal={handleCloseModal} selectedRow={selectedRow}/>
            </UpdateModal>
        </div>
    )
};
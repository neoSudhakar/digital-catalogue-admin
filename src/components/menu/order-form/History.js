import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react'; 
import { Modal } from 'antd';
import classes from "./OrderForm.module.css";


import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Reorder } from 'framer-motion';
import ViewOrderItems from './ViewOrderItems';
import { all } from 'axios';

export default function History() {

  const [fetchedData, setFetchedData] =useState([]);
  const [showDesign, setShowDesign] =useState();
  const [isModalOpen, setIsModalOpen] =useState(false);

  const fetchOrders= async() => {
    try {
      const response = await fetch("http://localhost:8080/api/orders");
      
      if (!response.ok) {
        //if(data.errorCode && data.errorCode === '600'){
          //setUserData(data); // Update state with the fetched data
          //console.log(data);
        //}
        console.log(response.status);
       
      } 
      else{
        const data = await response.json();
        console.log(data);
        //console.error('Failed to fetch data:', response.statusText);
        setFetchedData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>{
    fetchOrders();
  },[]);

  function handleOpenModal(design) {
    setShowDesign(design);
    setIsModalOpen(true);
    //console.log(showDesign)
  };

  function handleCloseModal() {
    setIsModalOpen(false);
  }

   
    

    const historyOrders = fetchedData && fetchedData.filter((item) => item.orderStatus !== 'pending');
    console.log(historyOrders);

    return(
        <div className={classes["table-container"]}>
        {historyOrders.length === 0 ? <h4>No orders to show</h4>:
        <table className={classes["table"]}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Designs</th>
              <th>Ordered By</th>
              <th>Ordered Date</th>
              <th>Quantity</th>
              <th>Order Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {historyOrders && historyOrders.map((order,index)=>(
                <tr key={order.id}>
                     <td>{order.id}</td>
                     <td>
                        {order.orderItems && order.orderItems.map((item,index) => (
                            <div>
                                <img src={item.design.designImages[0].preSignedURL} alt={item.design.id}/>
                                <p>{"Design "+item.design.id}</p>
                            </div>
                        ))}
                     </td>
                     <td>
                        {order.user && <p>{order.user.firstName+order.user.lastName}</p>}
                     </td>
                     <td>{order.createdDate.slice(0,10)}</td>
                     <td>
                        {order.orderItems && order.orderItems.map((item,index) => (
                                <p>{item.quantity}</p>
                        ))}
                     </td>
                     <td style={{ color: order.orderStatus === 'accepted' ? 'green' :
                        order.orderStatus === 'rejected' ? 'red' : 
                            order.orderStatus === 'delivered' ? 'blue' : 'orange'
                     , fontWeight: 'bold'}}>
                        {order.orderStatus}
                     </td>
                     <td>{order.paymentStatus}</td>
                     <td>
                        <div>
                            <button
                                className={classes.view}
                                onClick={handleOpenModal.bind(this, order)}
                            >
                                View Order Item
                            </button>
                        </div>
                     </td>
                </tr>
            ))}
          </tbody>
        </table>}   

        <Modal
              title="DESIGNS"
              open={isModalOpen}
              onCancel={handleCloseModal}
              okButtonProps={{style:{display: "none"}}}
              cancelButtonProps={{style: {display: 'none'}}}
              destroyOnClose
            >
            {showDesign && <ul>
            <ViewOrderItems key={showDesign.id} items={showDesign.orderItems} />
            </ul>}
            </Modal>
      </div>





        /*<div>
            {historyOrders && historyOrders.length > 0 && <ul>
                {historyOrders.map((item) =><ViewOrderItems key={item.id} item={item}/>)}
    </ul>}
    {!historyOrders || historyOrders.length === 0 && <p>No items has ordered.</p>}
    <p>History</p>
            </div>*/
    )
}
/*
/*imagesArr.map((image, index) => (
              <tr key={image.id}>
                <td>
                  {image && <img src={image.preSignedURL} alt={`Image ${index + 1}`} />}
                  {!image && <img alt={`Image ${index + 1}`} />}
            </td>

                <td>
                  <input
                    id={index}
                    type="checkbox"
                    checked={isChecked[index]}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <label htmlFor={index}>Default</label>
                </td>
                <td>
                  <button
                    className={classes["delete-button"]}
                    onClick={() => handleDeleteImage(image.id)}
                  >
                    Delete
                  </button>
            </td>
              </tr>
            ))}





 const columnDefs=[
        { headerName: 'Id', field: 'id', width: 100, minWidth: 100, maxWidth: 100 },
        {
          headerName: 'Ordered By',
          field: 'user',
          valueGetter: (params) => {
              if (params.data.user && params.data.user.firstName && params.data.user.lastName) {
                  return (params.data.user.firstName+params.data.user.lastName); 
              }
          }
        },
        { headerName: 'Ordered Date', field: 'createdDate',
          valueGetter: (params) => {
            if (params.data.createdDate) {
                return params.data.createdDate.slice(0,10); 
            }
            
      }
        },
        { headerName: 'Design Ordered', field: 'design',
          valueGetter: (params) => {
            if (params.data.orderItemSet && params.data.design) {
                return ("design "+params.data.design.id); 
            }
          }
         },
         { headerName: 'Quantity', field: 'quantity' ,
         valueGetter: (params) => {
           if (params.data.orderItemSet && params.data.orderItemSet[0].quantity) {
               return (params.data.orderItemSet[0].quantity); 
           }
         }
       },
       { headerName: 'Order Status', field: 'orderStatus',
         cellStyle: (params) => {
           if (params.value === 'pending') {
             return {color: 'orange', fontWeight: 'bold'};
           }
           else if (params.value === 'accepted') {
             return {color: 'green', fontWeight: 'bold'};
           }
           else if (params.value === 'delivered') {
             return {color: 'blue', fontWeight: 'bold'};
           }
           else if (params.value === 'cancelled') {
             return { color: 'red', fontWeight:'bold' };
           }
         }
       },
       { headerName: 'Payment Status', field: 'paymentStatus',
         cellStyle: (params) => {
           if (params.value === 'pending') {
             return {color: 'orange', fontWeight: 'bold'};
           }
           else if (params.value === 'accepted') {
             return {color: 'green', fontWeight: 'bold'};
           }
           else if (params.value === 'delivered') {
             return {color: 'blue', fontWeight: 'bold'};
           }
           else if (params.value === 'cancelled') {
             return { color: 'red', fontWeight:'bold' };
           }
         }
       },
       {
         headerName: "Actions",
         width: 500,
         cellRenderer: (params) => (
           <div>
             {/*<button
               className={classes.update}
               //onClick={handleStartUpdateRow.bind(this, params.data)}
             >
               Accept
             </button>
             <button
               className={classes.delete}
               //onClick={handleDeleteRow.bind(this, params.data)}
             >
               Reject
         </button>
             <button
               className={classes.view}
               onClick={handleOpenModal.bind(this, params.data)}
             >
               View Order Item
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


<div style={{margin: 15, marginTop:30}}>
            <div className="ag-theme-alpine"  style={{width: "100%", height: 300}}>

                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={historyOrders}
                    defaultColDef={defaultColDef}
                    animateRows={true}
                />
            </div>
            <Modal
              title="ORDERED DESIGN"
              open={isModalOpen}
              onCancel={handleCloseModal}
              okButtonProps={{style:{display: "none"}}}
              cancelButtonProps={{style: {display: 'none'}}}
              destroyOnClose
            >
            {showDesign && <ul>
            <ViewOrderItems key={showDesign.id} item={showDesign} />
        </ul>}
            </Modal>
        </div>*/
   
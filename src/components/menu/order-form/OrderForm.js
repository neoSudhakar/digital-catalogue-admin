
import { AgGridReact } from 'ag-grid-react';
import { useEffect, useMemo, useState } from 'react'; 
import { Modal } from 'antd';
import classes from "./OrderForm.module.css";


import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Reorder } from 'framer-motion';
import ViewOrderItems from './ViewOrderItems';
import { getPermissionsObj } from '../../../util/auth';

export default function OrderForm() {

  const permissions= getPermissionsObj();

  const [rowData, setRowData] =useState([]);
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
        setRowData(data);
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

function handleAcceptOrder(order) {
  fetch(`http://localhost:8080/api/orders/${order.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({orderStatus: "accepted"}), 
      })
        .then((response) => {
          if (!response.ok) {
            
            console.log('Failed to update row in the backend.');
            
          } else {
            fetchOrders();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
};

function handleRejectOrder(order) {
  fetch(`http://localhost:8080/api/orders/${order.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({orderStatus: "rejected"}), 
      })
        .then((response) => {
          if (!response.ok) {
            
            console.log('Failed to update row in the backend.');
            
          } else {
            fetchOrders();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
};

function handleDeliveredOrder(order) {
  fetch(`http://localhost:8080/api/orders/${order.id}`, {
        method: 'PATCH', 
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify({orderStatus: "delivered"}), 
      })
        .then((response) => {
          if (!response.ok) {
            
            console.log('Failed to update row in the backend.');
            
          } else {
            fetchOrders();
            console.log('Row updated in the backend.');
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
};



      const pendingOrders = rowData && rowData.filter((row) => row.orderStatus === 'accepted' || row.orderStatus ==='pending' || row.orderStatus === 'cancelled');

    return(
      <div className={classes["table-container"]}>
      {pendingOrders.length === 0 ? <h4>No orders to show</h4>:
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
          {pendingOrders && pendingOrders.map((order,index)=>(
              <tr key={order.id}>
                   <td>{order.id}</td>
                   <td>
                      {order.orderItems && order.orderItems.map((item,index) => (
                          <div key={item.design.id} className={classes.designsColumn}>
                              <img src={item.design.designImages[0] ? item.design.designImages[0].preSignedURL : ""} alt={item.design.id}/>
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
                              <p key={item.id}>{item.quantity}</p>
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
                      <div className={classes.buttons}>
                          <button
                            className={classes.accept}
                            onClick={handleAcceptOrder.bind(this, order)}
                            disabled={order.orderStatus === 'accepted' || (permissions && !permissions.features.OrderForm.edit)}
                          >
                            Accept
                          </button>
                          <button
                            className={classes.reject}
                            onClick={handleRejectOrder.bind(this, order)}
                            disabled={permissions && !permissions.features.Settings.delete}
                          >
                            Reject
                          </button>
                          <button
                            className={classes.delivered}
                            onClick={handleDeliveredOrder.bind(this, order)}
                            disabled={permissions && !permissions.features.Settings.edit}
                          >
                            Delivered
                          </button>
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
    )
};
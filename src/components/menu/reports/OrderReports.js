import { useEffect, useMemo, useState } from 'react'; 
import { Select } from 'antd';
import classes from "./Reports.module.css";

import { Reorder } from 'framer-motion';

const { Option } = Select;

export default function OrderReports() {

  const [rowData, setRowData] =useState([]);

  const [retailerFilter, setRetailerFilter] = useState(0);
  const [dateRangeFilter, setDateRangeFilter] = useState(0);
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);


  const fetchOrders= async() => {

    try {
      
      let apiUrl = 'http://localhost:8080/api/orders';

      const queryParams = new URLSearchParams({
        accountId: retailerFilter || 0,
        days: dateRangeFilter || 0,
        orderStatus: orderStatusFilter || null,
        paymentStatus: paymentStatusFilter || null
      });

      console.log(apiUrl+(queryParams.toString() ? `?${queryParams.toString()}` : ''))

      const response = await fetch(apiUrl+(queryParams && queryParams.toString() ? `?${queryParams.toString()}` : ''));
      
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
  },[retailerFilter, dateRangeFilter, orderStatusFilter, paymentStatusFilter]);

    return(
      <div>
        <div className={classes.filters}>
          <div>
            <label htmlFor="retailer">Retailer:</label>
            <Select
              id="retailer"
              defaultValue=""
              onChange={(value) => setRetailerFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
                {[...new Set(rowData.map(item => item.account.id))].map((accountId) => {
                  const retailer = rowData.find(item => item.account.id === accountId);
                  return (
                    <Select.Option key={retailer.account.id} value={retailer.account.id}>
                      {retailer.account.name}
                    </Select.Option>
                  )})}
            </Select>
          </div>

          <div>
            <label htmlFor="dateRange">Date Range:</label>
            <Select
              id="dateRange"
              defaultValue=""
              onChange={(value) => setDateRangeFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value={7}>Last 7 Days</Select.Option>
              <Select.Option value={30}>Last 30 Days</Select.Option>
            </Select>
          </div>

          <div>
            <label htmlFor="orderStatus">Order Status:</label>
            <Select
              id="orderStatus"
              defaultValue=""
              onChange={(value) => setOrderStatusFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="accepted">Accepted</Select.Option>
              <Select.Option value="rejected">Rejected</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
              <Select.Option value="delivered">Delivered</Select.Option>
              
            </Select>
          </div>

          <div>
            <label htmlFor="paymentStatus">Payment Status:</label>
            <Select
              id="paymentStatus"
              defaultValue=""
              onChange={(value) => setPaymentStatusFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="cancelled">Cancelled</Select.Option>
              <Select.Option value="received">Received</Select.Option>
              
          </Select>
              </div>


      </div>
        <hr style={{width: '98%', color: '#000000'}}></hr>

        <div className={classes["table-container"]}>
        {rowData.length === 0 ? <h4>No orders to show</h4>:
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
            </tr>
          </thead>
          <tbody>
            {rowData && rowData.map((order,index)=>(
                <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>
                        {order.orderItems && order.orderItems.map((item,index) => (
                            <div>
                                <span><img src={item.design.designImages[0].preSignedURL} alt={item.design.id}/></span>
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
                </tr>
            ))}
          </tbody>
        </table>}   
      </div>
    </div>
    )
};



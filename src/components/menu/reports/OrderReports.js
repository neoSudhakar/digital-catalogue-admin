import { useEffect, useMemo, useState } from 'react'; 
import { Select, Button, DatePicker, Calendar, Input} from 'antd';
import classes from "./Reports.module.css";
import { SearchOutlined } from '@ant-design/icons';
import styles from "../dashboard/Dashboard.module.css"

import { Reorder } from 'framer-motion';
import { usePDF } from 'react-to-pdf';
import { useSelector } from 'react-redux';
import Chart from '../dashboard/Chart';
import BarChartClassComponent from '../dashboard/BarChartClassComponent';
import Tile from '../dashboard/Tile';
import { useQuery } from '@tanstack/react-query';
import { fetchAccounts, fetchOrdersForManufacturer } from '../../../util/http';

const { Option } = Select;

export default function OrderReports() {
  const isDashboardOpen = useSelector(state => state.ui.isDashboardOpen);

  const {toPDF, targetRef} = usePDF({filename: 'order-report.pdf'});

  const [rowData, setRowData] =useState([]);

  const [retailerFilter, setRetailerFilter] = useState(0);
  const [dateFilter, setDateFilter] = useState(null);
  const [dateRangeFilter, setDateRangeFilter] = useState(0);
  const [orderStatusFilter, setOrderStatusFilter] = useState(null);
  const [paymentStatusFilter, setPaymentStatusFilter] = useState(null);

  const [searchText, setSearchText] = useState('');

  function handleSearch() {
    if (searchText.trim() === '') {
      fetchOrders();
    }
    const filtered = rowData.filter(item => {
      return (
        item.account && item.account.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.user && item.user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.user && item.user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.orderStatus.toLowerCase().includes(searchText.toLowerCase()) ||
        item.paymentStatus.toLowerCase().includes(searchText.toLowerCase()) ||
        item.createdDate.slice(0,10).includes(searchText)
      );
    });
  
    setRowData(filtered);
  }


  const fetchOrders= async() => {

    try {
      
      let apiUrl = 'http://localhost:8080/api/orders';

      const queryParams = new URLSearchParams({
        accountId: retailerFilter || 0,
        days: dateRangeFilter || 0,
        date: dateFilter || null,
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

  function onPickDate(value) {
    if(value){
      setDateFilter(value.format("YYYY-MM-DD"));
    }
    else{
      setDateFilter(null);
    }
  }
  //console.log(dateFilter);

  useEffect(() =>{
    fetchOrders();
  },[searchText]);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    
  };


  const {data: ordersData} = useQuery({
    queryKey: ["manufacturer-orders"],
    queryFn: fetchOrdersForManufacturer ,
});

const {data: accountsData} = useQuery({
    queryKey: ["accounts"],
    queryFn: fetchAccounts,
})

const [retailerAccountsCount, setRetailerAccountsCount] = useState(0);

 useEffect(()=>{
        if(accountsData){
            const retailers = accountsData.filter((account)=>{
                return account.accountType === "Retailer"
            })
            setRetailerAccountsCount(retailers.length);
        }
    },[accountsData])


  const [retailersWithOrders, setRetailersWithOrders] =useState([]);
  const fetchRetailerswithOrders= async() => {

    try {
      
      let apiUrl = 'http://localhost:8080/api/orders';

      const response = await fetch(apiUrl);
      
      if (!response.ok) {
      
        console.log(response.status);
       
      } 
      else{
        const data = await response.json();
        console.log(data);
        //console.error('Failed to fetch data:', response.statusText);
        setRetailersWithOrders(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(()=> {
    fetchRetailerswithOrders();
  },[])

    const uniqueRetailers= [...new Set(retailersWithOrders.map(item => item.account.id))].map((accountId) => {
      return retailersWithOrders.find(item => item.account.id === accountId).account;
    });

    return(
      <div style={{paddingTop: "1rem"}}>
      <div className={`${classes["search"]} ${isDashboardOpen ? classes["full"] : ""}`}>
        <label htmlFor="search">Search:</label>
        <Input
          id="search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          suffix={<SearchOutlined onClick={handleSearch} style={{ cursor: 'pointer' }} />}
          onPressEnter={handleKeyPress}
          placeholder='type and press enter...'
          style={{ width: 200 }}
        />
      </div>
      <div className={`${classes["filters"]} ${isDashboardOpen ? classes["full"] : ""}`}>
          <div className={classes[`${isDashboardOpen ? "full" : ""}`]}>
            <label htmlFor="retailer">Retailer:</label>
            <Select
              id="retailer"
              defaultValue=""
              onChange={(value) => setRetailerFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
                  {uniqueRetailers && uniqueRetailers.map((retailer) => (
                    <Select.Option key={retailer.id} value={retailer.id}>
                    {retailer.name}
                  </Select.Option>
                  ))}
            </Select>
          </div>

          <div className={classes[`${isDashboardOpen ? "full" : ""}`]}>
            <label htmlFor="datePicked">Date:</label>
            <DatePicker
              id='datePicked' 
              onChange={onPickDate}/>
            {/*<Calendar
            id="datePicked"
            onChange={(value) => setDateFilter(value)}
            />
            <Select
              id="datePicked"
              defaultValue=""
              onChange={(value) => setDateRangeFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value={7}>Last 7 Days</Select.Option>
              <Select.Option value={30}>Last 30 Days</Select.Option>
                  </Select>*/}
          </div>

          <div className={classes[`${isDashboardOpen ? "full" : ""}`]}>
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

          <div className={classes[`${isDashboardOpen ? "full" : ""}`]}>
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

            <Button className={classes["button"]} onClick={fetchOrders}>
              Get Reports
            </Button>
          <Button onClick={toPDF} className={classes["download-btn"]}>Download Report</Button>
      </div>

        <hr style={{width: '98%', color: '#000000'}}></hr>

        <div ref={targetRef} style={{paddingTop: "1rem"}}>
        <span className={classes["download-heading"]}>Orders Report</span>
        <div className={styles["whole"]} style={{marginTop:"0", paddingTop: "0", marginLeft: "0rem", marginRight:"0rem"}}>
          <menu className={styles["whole-tiles-and-charts"]}>
            <section className={styles["whole-charts"]} style={{alignItems:"flex-start"}}>
                <Chart title="Orders by retailers" chartComponent={<BarChartClassComponent orderReports />} companyName="Tasks in catalogue" />
                <Tile title="Orders" count={ordersData ? ordersData.length : 0} filterCount={1}  />
                <Tile title="Retailers" count={retailerAccountsCount} filterCount={2} />
            </section>
          </menu> 
        </div>

        <div className={classes["table-container"]}>
        {rowData.length === 0 ? <h4>No orders to show</h4>:
        <>
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
                              <div key={item.design.id}>
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
          </table>
        </>
        }   
      </div>
    </div>
    </div>
    )
};
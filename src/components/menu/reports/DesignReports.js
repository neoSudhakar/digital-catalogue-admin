import { useEffect, useMemo, useState } from 'react'; 
import { Modal } from 'antd';
import classes from "./Reports.module.css";

import { Reorder } from 'framer-motion';

export default function DesignReports() {

  const [rowData, setRowData] =useState([]);

  const fetchOrders= async() => {
    try {
      const response = await fetch("http://localhost:8080/api/designs");
      
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


    return(
      <div className={classes["table-container"]}>
      {rowData.length > 0 ?
      <table className={classes["table"]}>
        <thead>
          <tr>
            <th>Id</th>
            <th>Design</th>
            <th>Main Group</th>
            <th>Category</th>
            <th>Created Date</th>
            <th>Pieces</th>
            <th>Net Weight</th>
            <th>Unit of Measurement</th>
          </tr>
        </thead>
        <tbody>
          {rowData && rowData.map((item)=>(
              <tr key={item.id}>
                   <td>{item.id}</td>
                   <td>
                        <img src={item.designImages[0].preSignedURL} alt={item.id}/>
                   </td>
                   <td>{item.mainGroup}</td>
                   <td>{item.category}</td>
                   <td>{item.createdDate.slice(0,10)}</td>
                   <td>{item.pieces}</td>
                   <td>{item.netWeight}</td>
                   <td>{item.detailsSet[0].unitOfMeasurement}</td>
              </tr>
          ))}
        </tbody>
      </table>: <h4>No Designs to show</h4>}   
    </div>
    )
};



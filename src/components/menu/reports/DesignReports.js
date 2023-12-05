import { useEffect, useMemo, useState } from 'react'; 
import { Input, Select, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import classes from "./Reports.module.css";

import { Reorder } from 'framer-motion';

export default function DesignReports() {

  const [rowData, setRowData] =useState([]);

  const [designsFilter, setDesignsFilter] =useState(null);
  const [retailerFilter, setRetailerFilter] =useState(0);

  const [retailerData, setRetailerData] =useState([]);

  const [searchText, setSearchText] = useState('');
  const [prevSearchText, setPrevSearchText] = useState('');

 //const [filteredData, setFilteredData]= useState([]);
 //let filteredData= rowData;

  //console.log(filteredData)

  function handleSearch() {
    if (searchText.trim() === '') {
      fetchDesigns();
    }
    const filtered = rowData.filter(item => {
      return (
        item.mainGroup.toLowerCase().includes(searchText.toLowerCase()) ||
        item.category.toLowerCase().includes(searchText.toLowerCase()) ||
        item.detailsSet[0].unitOfMeasurement.toLowerCase().includes(searchText.toLowerCase()) ||
        //item.style.toLowerCase().includes(searchText.toLowerCase()) ||
        //item.product.toLowerCase().includes(searchText.toLowerCase()) ||
        //item.model.toLowerCase().includes(searchText.toLowerCase()) ||
        //item.worker.toLowerCase().includes(searchText.toLowerCase()) ||
        //item.size.toLowerCase().includes(searchText.toLowerCase()) ||
        item.netWeight.toString().includes(searchText) ||
        item.pieces.toString().includes(searchText.toString()) ||
        item.createdDate.includes(searchText)
      );
    });
  
    setRowData(filtered);
  }




  const fetchAssignedRetailers= async () => {
    try {
      const response = await fetch('http://localhost:8080/api/accounts/withDesigns');
      
      if (response.status === 204) {
    
      } else if(response.status === 200) {
        const data = await response.json();
        console.log(data);
        setRetailerData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchDesigns= async() => {
    try {

      let apiUrl = 'http://localhost:8080/api/designs/filters';

      const queryParams = new URLSearchParams({
        designs: designsFilter || null,
        accountId: retailerFilter || 0
      });

      //console.log(apiUrl+(queryParams.toString() ? `?${queryParams.toString()}` : ''))

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
    fetchDesigns();
    //handleSearch();
  },[searchText]);

  function handleDesignFilters(value) {
    setDesignsFilter(value);
    if(value !== 'assigned'){
      setRetailerFilter(0);
    }
    else{
      fetchAssignedRetailers();
      
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
    
  };
//console.log(accountData);
//const retailerData= accountData.filter(account => account.accountType === 'Retailer');

    return(
      <div>
        <div className={classes.filters}>

        <div>
          <label htmlFor="search">Search:</label>
          <Input
            id="search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            suffix={<SearchOutlined onClick={handleSearch} style={{ cursor: 'pointer' }} />}
            onKeyPress={handleKeyPress}
            placeholder='type and press enter...'
            style={{ width: 200 }}
          />
        </div>

          <div>
            <label htmlFor="designs">Designs:</label>
            <Select
              id="designs"
              defaultValue=""
              onChange={handleDesignFilters}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              <Select.Option value="assigned">Assigned</Select.Option>
              <Select.Option value="notAssigned">Not Assigned</Select.Option>
            </Select>
          </div>

          {designsFilter === 'assigned' && 
          <div>
            <label htmlFor="retailer">Retailer:</label>
            <Select
              id="retailer"
              defaultValue=""
              onChange={(value) => setRetailerFilter(value)}
              style={{width: 150}}
            >
              <Select.Option value="">All</Select.Option>
              {retailerData && retailerData.map((item) =>(
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </div>}
            

          <div>
            <Button onClick={fetchDesigns}>
              Get Reports
            </Button>
          </div>
      </div>


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
                  <th>UOM</th>
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
    </div>
    )
};



import classes from "./Settings.module.css";
import Account from "./Account";
import User from "./User";
import Role from "./Role";
import Group from "./Group";
import Category from "./Category";
import AccountTable from "./AccountTable";
import UserTable from "./UserTable";
import RoleTable from "./RoleTable";
import GroupTable from "./GroupTable";
import CategoryTable from "./CategoryTable";
import axios from "axios";

import { Menu, Modal,Button } from "antd";
import { useEffect, useState } from "react";

export default function Settings(){

  const [selectedTab, setselectedTab] = useState('account');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateMode, setIsUpdateMode] =useState(false);
  const [selectedRow, setSelectedRow] =useState(null);

  const [accountData, setAccountData] = useState([
    //{ id: 1,name: 'Tom', phoneNumber: '9876543210', email: 'tom@example.com' , accountType: 'Retailer'},
    //{ id: 2,name: 'john', phoneNumber: '9876543211', email: 'john@example.com' , accountType: 'Manufacturer'},
  ]);

  const [userData, setUserData]= useState([
    //{ id: 1,firstName: 'Tom', lastName: 'Kate', email: 'tom@example.com' , account: 'tom', userRole: 'Retail User'},
    //{ id: 2,firstName: 'john', lastName: 'Mathew', email: 'john@example.com' , account: 'john', userRole: 'Admin'},
  ]);

  const [roleData, setRoleData] = useState([]);
  const [groupData, setGroupData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);


  const fetchAccountData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/accounts');
      
      if (response.status === 204) {
        
        //if(data.errorCode && data.errorCode === '600'){
          //setUserData(data); // Update state with the fetched data
          //console.log(data);
        //}
        
         // Update state with the fetched data
        
      } else if(response.status === 200) {
        const data = await response.json();
        //console.error('Failed to fetch data:', response.statusText);
        setAccountData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      //console.log("response is",response);
      
      if (response.status === 204) {
        
        //if(data.errorCode && data.errorCode === '600'){
          //setUserData(data); // Update state with the fetched data
          //console.log(data);
        //}
        
      } 
      /*else if(response.status === 400){
        throw new Error("no data to fetch ")
      }*/
      else if (response.status === 200){
        const data = await response.json();
        //console.log("data is", data)
        //console.error('Failed to fetch data:', response.statusText);
        setUserData(data);
      }
    } catch (error) {
      console.log("error msg", error.message);
      console.error('Error:', error);
    }
  };

  

  const fetchRoleData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/roles');
      
      if (response.status === 204) {
        //if(data.errorCode && data.errorCode === '600'){
          //setUserData(data); // Update state with the fetched data
          //console.log(data);
        //}
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        //console.error('Failed to fetch data:', response.statusText);
        setRoleData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  const fetchGroupData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/groups');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setGroupData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchCategoryData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/categories');
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setCategoryData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  

  useEffect(() =>{
    fetchAccountData();
    fetchUserData();
    fetchRoleData();
    fetchGroupData();
    fetchCategoryData();
  },[]);
  

    function handleOpenModal() {
        //setIsUpdateMode(isUpdateMode);
        //setSelectedRow(selectedRow);
        setIsModalOpen(true);
    };

    function handleCloseModal() {
        //setIsUpdateMode(false);
        //setSelectedRow();
        setIsModalOpen(false);
    };

  const tabHandler= (tab) => {
    setselectedTab(tab);
  };

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['account']} className={classes.menuBar}>
            <Menu.Item key="account" onClick={tabHandler.bind(this, 'account')} className={classes.menuItem}>
            Account
            </Menu.Item>
            <Menu.Item key="role" onClick={tabHandler.bind(this, 'role')} className={classes.menuItem}>
            Role
            </Menu.Item>
            <Menu.Item key="user" onClick={tabHandler.bind(this, 'user')} className={classes.menuItem}>
            User
            </Menu.Item>
            <Menu.Item key="group" onClick={tabHandler.bind(this, 'group')} className={classes.menuItem}>
            Design Group
            </Menu.Item>
            <Menu.Item key="category" onClick={tabHandler.bind(this, 'category')} className={classes.menuItem}>
            Design Category
            </Menu.Item>
        </Menu>

        <div>
          <Button onClick={handleOpenModal} className={classes.button}>
            {selectedTab === 'account' ? "Add Account":
              (selectedTab === 'role' ? "Add Role": 
                (selectedTab === 'user' ? "Add User":
                  (selectedTab === 'group' ? "Add Group":"Add Category")
                )
              )
            }
          </Button>

          {selectedTab === 'account' ? <AccountTable key={accountData} data={accountData}/>:
           (selectedTab === 'role' ? <RoleTable key={roleData} data={roleData}/>: 
            (selectedTab === 'user' ? <UserTable key={userData} data={userData} accountData={accountData} roleData={roleData}/>:
              (selectedTab === 'group' ? <GroupTable key={groupData} data={groupData}/>:
                <CategoryTable key={categoryData} data={categoryData}/>
              )
            )
           )
          }
          
          <Modal
            //title={isUpdateMode ? `UPDATE ${selectedTab.toUpperCase()}` : `ADD ${selectedTab.toUpperCase()}`}
            title={selectedTab === 'account' ? "ADD ACCOUNT":
                (selectedTab === 'role' ? "ADD ROLE": 
                  (selectedTab === 'user' ? "ADD USER":
                    (selectedTab === 'group' ? "ADD DESIGN GROUP":"ADD DESIGN CATEGORY")
                  )
                )
              }
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
            destroyOnClose
          >
            {selectedTab === 'account' ? <Account refetchAccountData={fetchAccountData} closeModal={handleCloseModal}/> :
              (selectedTab === 'role' ? <Role 
                refetchRoleData={fetchRoleData} 
                closeModal={handleCloseModal} /> :
                (selectedTab === 'user' ? <User refetchUserData={fetchUserData} accountData={accountData} roleData={roleData} closeModal={handleCloseModal}/>:
                  (selectedTab === 'group' ? <Group refetchGroupData={fetchGroupData} closeModal={handleCloseModal}/>:
                    <Category refetchCategoryData={fetchCategoryData} closeModal={handleCloseModal} />
                  )
                )
              )
            }
          </Modal>
        
      </div>
    </div>
  );
}


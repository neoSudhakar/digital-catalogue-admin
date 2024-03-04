import classes from "../Settings.module.css";
import Account from "./Account";
import User from "./User";
import Role from "./Role";
import AccountTable from "./AccountTable";
import UserTable from "./UserTable";
import RoleTable from "./RoleTable";

import { Menu, Modal,Button } from "antd";
import { useEffect, useState } from "react";
import { getPermissionsObj, getUserId } from "../../../../util/auth";
import { BASE_URL } from "../../../../util/http";


export default function UserSettings(){

  const user= getUserId();
  const permissions= getPermissionsObj();

  const [selectedTab, setselectedTab] = useState('account');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountData, setAccountData] = useState([]);
  const [userData, setUserData]= useState([]);
  const [roleData, setRoleData] = useState([]);


  const fetchAccountData = async () => {
    try {
      const response = await fetch(BASE_URL+'/accounts');
      
      if (response.status === 204) {
        
        //if(data.errorCode && data.errorCode === '600'){
          //setUserData(data); // Update state with the fetched data
          //console.log(data);
        //}
        
         // Update state with the fetched data
        
      } else if(response.status === 200) {
        const data = await response.json();
        //console.error('Failed to fetch data:', response.statusText);
        const filteredData= data.filter(account => account.accountType !== 'system');
        setAccountData(filteredData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch(BASE_URL+'/users/filters');
      //console.log("response is",response);
      
      if (response.status === 204) {
      
        
      } 
      else if (response.status === 200){
        const data = await response.json();
        console.log("data is", data)
        //console.error('Failed to fetch data:', response.statusText);
        const filteredData= data.filter(user => user.account?.accountType !== 'system');
        setUserData(filteredData);
      }
    } catch (error) {
      console.log("error msg", error.message);
      console.error('Error:', error);
    }
  };

  

  const fetchRoleData = async () => {
    try {
      const response = await fetch(BASE_URL+`/roles/filters?userId=${user}`);
      
      if (response.status === 204) {
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        console.log(data);
        setRoleData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>{
    fetchAccountData();
    fetchUserData();
    fetchRoleData();
  },[]);
  

    function handleOpenModal() {
        setIsModalOpen(true);
    };

    function handleCloseModal() {
        setIsModalOpen(false);
    };

    const items = [
      {
        label: 'Account',
        key: 'account',
        style: {fontSize: '18px'}
      },
      {
        label: 'Role',
        key: 'role',
        style: {fontSize: '18px'}
      },
      {
        label: 'User',
        key: 'user',
        style: {fontSize: '18px'}
      }
  ]

  const tabHandler= (tab) => {
    setselectedTab(tab.key);
    if(tab.key === 'user'){
      fetchAccountData();
      fetchRoleData();
    }
  };

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['account']} onClick={tabHandler} items={items} className={classes.menuBar}>
        </Menu>

        <div>
          <Button 
            onClick={handleOpenModal} 
            className={classes.button}
            disabled={permissions && !permissions.features.Settings.edit}
          >
            {selectedTab === 'account' ? "Add Account":
              (selectedTab === 'role' ? "Add Role": "Add User")
            }
          </Button>

          {selectedTab === 'account' ? <AccountTable key={accountData} data={accountData}/>:
           (selectedTab === 'role' ? <RoleTable key={roleData} data={roleData}/>: 
            <UserTable key={userData} data={userData} accountData={accountData} roleData={roleData}/>)
          }
          
          <Modal
            title={selectedTab === 'account' ? "ADD ACCOUNT":
                (selectedTab === 'role' ? "ADD ROLE": "ADD USER")
              }
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
            destroyOnClose
          >
            {selectedTab === 'account' ? <Account refetchAccountData={fetchAccountData} closeModal={handleCloseModal}/> :
              (selectedTab === 'role' ? <Role refetchRoleData={fetchRoleData} closeModal={handleCloseModal} /> :
                <User refetchUserData={fetchUserData} accountData={accountData} roleData={roleData} closeModal={handleCloseModal}/>
              )
            }
          </Modal>
        
        </div>
    </div>
  );
}

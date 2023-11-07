import classes from "./Settings.module.css";
import Account from "./Account";
import User from "./User";
import AccountTable from "./AccountTable";
import UserTable from "./UserTable";

import { Menu, Modal,Button } from "antd";
import { useEffect, useState } from "react";

export default function Settings(){

  const [selectedCategory, setSelectedCategory] = useState('account');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountData, setAccountData] = useState([
    //{ id: 1,name: 'Tom', phoneNumber: '9876543210', email: 'tom@example.com' , accountType: 'Retailer'},
    //{ id: 2,name: 'john', phoneNumber: '9876543211', email: 'john@example.com' , accountType: 'Manufacturer'},
  ]);

  const [userData, setUserData]= useState([
    //{ userId: 1,firstName: 'Tom', lastName: 'Kate', email: 'tom@example.com' , account: 'tom', userRole: 'Retail User'},
    //{ userId: 2,firstName: 'john', lastName: 'Mathew', email: 'john@example.com' , account: 'john', userRole: 'Admin'},
  ]);

  const [roleData, setRoleData] = useState([]);

  const fetchRoleData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/roles');
      if (response.ok) {
        const data = await response.json();
        setRoleData(data); // Update state with the fetched data
      } 
      else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  //const updateAccountData = (data) => {
  //  setAccountData([...accountData, data]);
  //};

  //const updateUserData =(data) => {
//setUserData([...userData, data]);
  //};

  const fetchAccountData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/accounts');
      if (response.ok) {
        const data = await response.json();
        setAccountData(data); // Update state with the fetched data
      } else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users');
      console.log("response is",response)
      if (response.ok) {
        const data = await response.json();
        console.log("data is", data)
        setUserData(data); // Update state with the fetched data
      } 
      else if(response.status === 400){
        throw new Error("no data to fetch ")
      }
      else {
        console.error('Failed to fetch data:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log("error msg", error.message);
    }
  };
  

  useEffect(() =>{
    fetchAccountData();
    fetchUserData();
    fetchRoleData();
  },[]);
  

    function addAccountHandler() {
        setIsModalOpen(true);
    };

    function handleCloseModal() {
        setIsModalOpen(false);
    };

  const categoryHandler= (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['account']} className={classes.menuBar}>
            <Menu.Item key="account" onClick={categoryHandler.bind(this, 'account')} className={classes.menuItem}>
            Account
            </Menu.Item>
            <Menu.Item key="user" onClick={categoryHandler.bind(this, 'user')} className={classes.menuItem}>
            User
            </Menu.Item>
        </Menu>

        <div>
            <Button onClick={addAccountHandler} className={classes.button}>
              {selectedCategory === 'account' ? "Add Account" : "Add User"}
            </Button>

            {selectedCategory === 'account' ? <AccountTable data={accountData}/>: <UserTable data={userData}/>}
          
          <Modal
            title={selectedCategory === 'account' ? "ADD ACCOUNT" : "ADD USER"}
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
          >
            {selectedCategory === 'account' ? 
              <Account/> :
              //<Account updateAccountData={updateAccountData} index={accountData.length}/> : 
              <User accountData={accountData} key={accountData} roleData={roleData}/>
              //<User updateUserData={updateUserData} accountData={accountData} index={userData.length}/>
            }
          </Modal>
        
      </div>
    </div>
  );
}
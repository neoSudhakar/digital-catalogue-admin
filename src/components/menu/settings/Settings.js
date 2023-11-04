import classes from "./Settings.module.css";
import Account from "./Account";
import User from "./User";
import AccountTable from "./AccountTable";
import UserTable from "./UserTable";

import { Menu, Modal,Button } from "antd";
import { useState } from "react";

export default function Settings(){

  const [selectedCategory, setSelectedCategory] = useState('account'); // State to track the selected category
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountData, setAccountData] = useState([
    { accountId: 1,name: 'Tom', phoneNum: '9876543210', email: 'tom@example.com' , accountType: 'Retailer'},
    { accountId: 2,name: 'john', phoneNum: '9876543211', email: 'john@example.com' , accountType: 'Manufacturer'},
  ]);

  const [userData, setUserData]= useState([
    { userId: 1,firstName: 'Tom', lastName: 'Kate', email: 'tom@example.com' , account: 'tom', userRole: 'Retail User'},
    { userId: 2,firstName: 'john', lastName: 'Mathew', email: 'john@example.com' , account: 'john', userRole: 'Admin'},
  ]);

  const updateAccountData = (data) => {
    setAccountData([...accountData, data]);
  };

  const updateUserData =(data) => {
    setUserData([...userData, data]);
  };

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
          {/* Content for Account settings */}
          {/* You can add your account settings components here */}
          <Modal
            title={selectedCategory === 'account' ? "ADD ACCOUNT" : "ADD USER"}
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
          >
            {selectedCategory === 'account' ? 
              <Account updateAccountData={updateAccountData} index={accountData.length}/> : 
              <User updateUserData={updateUserData} accountData={accountData} index={userData.length}/>
            }
          </Modal>
        
      </div>
    </div>
  );
}
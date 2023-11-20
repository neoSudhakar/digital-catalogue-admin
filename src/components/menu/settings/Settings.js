import classes from "./Settings.module.css";
import Account from "./Account";
import User from "./User";
import Role from "./Role";
import AccountTable from "./AccountTable";
import UserTable from "./UserTable";
import RoleTable from "./RoleTable";
import axios from "axios";

import { Menu, Modal,Button } from "antd";
import { useEffect, useState } from "react";
import { getAccountLoader } from "../../../util/auth";

export default function Settings(){

  const [selectedCategory, setSelectedCategory] = useState('account');

  const {accountType} = getAccountLoader();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [accountData, setAccountData] = useState([
    //{ id: 1,name: 'Tom', phoneNumber: '9876543210', email: 'tom@example.com' , accountType: 'Retailer'},
    //{ id: 2,name: 'john', phoneNumber: '9876543211', email: 'john@example.com' , accountType: 'Manufacturer'},
  ]);

  const [userData, setUserData]= useState([
    //{ id: 1,firstName: 'Tom', lastName: 'Kate', email: 'tom@example.com' , account: 'tom', userRole: 'Retail User'},
    //{ id: 2,firstName: 'john', lastName: 'Mathew', email: 'john@example.com' , account: 'john', userRole: 'Admin'},
  ]);

  const [roleData, setRoleData] = useState([]);


  //const updateAccountData = (data) => {
  //  setAccountData([...accountData, data]);
  //};

  //const updateUserData =(data) => {
//setUserData([...userData, data]);
  //};

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


  

  useEffect(() =>{
    fetchAccountData();
    fetchUserData();
    fetchRoleData();

    /*try {

      axios.get('http://localhost:8080/api/users')
  
        .then((res) =>  {
  
         // console.log('response is list Designs: ',res.data)
          if(typeof res.data !== 'string'){
          setUserData(res.data);
          }
          else{
            setUserData([
              { id: 1,firstName: 'Tom', lastName: 'Kate', email: 'tom@example.com' , account: 'tom', userRole: 'Retail User'},
            ])
          }
          //setLoad[false];
  
        })
  
          .catch((err) => console.log('error is : ', err))
  
      }
  
      catch (err){
  
        console.log(err)
  };*/
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

  if(accountType === "Retailer"){
    return <div>
      <h1>Retailer Settings</h1>
    </div>
  }

  return (
    <div className={classes.settings}>

        <Menu mode="horizontal" defaultSelectedKeys={['account']} className={classes.menuBar}>
            <Menu.Item key="account" onClick={categoryHandler.bind(this, 'account')} className={classes.menuItem}>
            Account
            </Menu.Item>
            <Menu.Item key="role" onClick={categoryHandler.bind(this, 'role')} className={classes.menuItem}>
            Role
            </Menu.Item>
            <Menu.Item key="user" onClick={categoryHandler.bind(this, 'user')} className={classes.menuItem}>
            User
            </Menu.Item>
        </Menu>

        <div>
          <Button onClick={addAccountHandler} className={classes.button}>
            {selectedCategory === 'account' ? "Add Account" :
             (selectedCategory === 'role' ? "Add Role" : "Add User")
            }
          </Button>

          {selectedCategory === 'account' ? <AccountTable key={accountData} data={accountData}/>:
           (selectedCategory === 'role' ? <RoleTable key={roleData} data={roleData}/>: <UserTable key={userData} data={userData}/>
           )
          }
          
          <Modal
            title={selectedCategory === 'account' ? "ADD ACCOUNT" : (selectedCategory === 'role' ? "ADD ROLE" : "ADD USER")}
            open={isModalOpen}
            onCancel={handleCloseModal}
            okButtonProps={{style:{display: "none"}}}
            cancelButtonProps={{style: {display: 'none'}}}
          >
            {selectedCategory === 'account' ? 
              <Account refetchAccountData={fetchAccountData}/> :
              (selectedCategory === 'role' ? 
              <Role refetchRoleData={fetchRoleData}/> :
              //<Account updateAccountData={updateAccountData} index={accountData.length}/> : 
              <User refetchUserData={fetchUserData} accountData={accountData} roleData={roleData}/>)
              //<User updateUserData={updateUserData} accountData={accountData} index={userData.length}/>
            }
          </Modal>
        
      </div>
    </div>
  );
}
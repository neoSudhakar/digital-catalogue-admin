import { getAccountLoader } from "../../../../util/auth";
import classes from "../Settings.module.css";
import User from "./User";
import UserTable from "./UserTable";

import { Menu, Modal, Button } from "antd";
import { useEffect, useState } from "react";

export default function RetailerUserSettings() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userData, setUserData] = useState([]);
  const [roleData, setRoleData] = useState([]);

  const fetchUserData = async () => {
    try {
        const accountObj = getAccountLoader();
      const response = await fetch(`http://localhost:8080/api/users/filters?accountId=${accountObj.id}`);
      //console.log("response is",response);
      
      if (response.status === 204) {
      
        
      } 
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
       
      } 
      else if(response.status === 200){
        const data = await response.json();
        //console.log(data);
        setRoleData(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() =>{
    fetchUserData();
    fetchRoleData();
  },[]);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <div className={classes.settings}>
      <div>
        <Button onClick={handleOpenModal} className={classes.button}>
          Add User
        </Button>

        <UserTable
          key={userData}
          data={userData}
          roleData={roleData}
        />

        <Modal
          title="ADD USER"
          open={isModalOpen}
          onCancel={handleCloseModal}
          okButtonProps={{ style: { display: "none" } }}
          cancelButtonProps={{ style: { display: "none" } }}
          destroyOnClose
        >
          <User
            refetchUserData={fetchUserData}
            roleData={roleData}
            closeModal={handleCloseModal}
          />
        </Modal>
      </div>
    </div>
  );
}

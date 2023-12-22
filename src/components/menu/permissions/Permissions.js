import { Menu } from 'antd'
import React, { useState } from 'react'
import ManufacturersPermissions from './Manufacturers/ManufacturersPermissions';
import RetailersPermissions from './Retailers/RetailersPermissions';
import classes from "./Permissions.module.css"

export default function Permissions() {

  const [selectedTab, setSelectedTab] = useState("Manufacturers");

  const items = [
    {
      label: "Manufacturers",
      key: "Manufacturers",
    },
    {
      label: "Retailers",
      key: "Retailers",
    },
  ]

  function handleTabSelect(tab){
    setSelectedTab(tab.key);
  }

  return (
    <div className={classes["whole"]}>
      <Menu mode="horizontal"  selectedKeys={[selectedTab]} items={items} onClick={handleTabSelect} className={classes["menuBar"]}/>
      {selectedTab === "Manufacturers" ? <ManufacturersPermissions/> : <RetailersPermissions/>}
    </div>
  )
}

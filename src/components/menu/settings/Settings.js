import { Menu } from "antd";
import { useState } from "react";

import classes from "./Settings.module.css";
import UserSettings from "./userSettings/UserSettings";
import DesignSettings from "./designSettings/DesignSettings";
import { getAccountLoader } from "../../../util/auth";
import RetailerUserSettings from "./userSettings/RetailerUserSettings";

export default function Settings() {
const {accountType} = getAccountLoader(); 
const [selectedTab, setselectedTab] = useState('manageUsers');

const items = [
    {
      label: 'User Management',
      key: 'manageUsers',
      style: {fontSize: '20px'}
    },
    {
      label: 'Design Management',
      key: 'manageDesigns',
      style: {fontSize: '20px'}
    }
]

const retailerItems =[
    {
        label: 'User Management',
        key: 'manageRetailerUsers',
        style: {fontSize: '18px'}
    }
]

const tabHandler= (tab) => {
    setselectedTab(tab.key);
  };


if(accountType === "Retailer"){
    return <div className={classes.settings}>
    <Menu mode="horizontal" items={retailerItems} className={classes.menuBar}>
    </Menu>

    <div>
        <RetailerUserSettings/>
    </div>
</div>
}

if(accountType === "system"){
    return <>
        <h1>System Settings</h1>
    </>
}

return (
    <div className={classes.settings}>
        <Menu mode="horizontal" defaultSelectedKeys={['manageUsers']} onClick={tabHandler} items={items} className={classes.menuBar}>
        </Menu>

        <div>
            {selectedTab === 'manageUsers' ? <UserSettings/>: <DesignSettings/>}
        </div>
    </div>
)
};

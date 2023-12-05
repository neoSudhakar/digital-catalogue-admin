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

const tabHandler= (tab) => {
    setselectedTab(tab);
  };

if(accountType === "Retailer"){
    return <div className={classes.settings}>
    <Menu mode="horizontal" defaultSelectedKeys={['manageUsers']} className={classes.menuBar}>
            <Menu.Item key="manageUsers" onClick={tabHandler.bind(this, 'manageUsers')} className={classes.menuItem}>
                User Management
            </Menu.Item>
    </Menu>

    <div>
        {selectedTab === 'manageUsers' && <RetailerUserSettings/>}
    </div>
</div>
}

return (
    <div className={classes.settings}>
        <Menu mode="horizontal" defaultSelectedKeys={['manageUsers']} className={classes.menuBar}>
                <Menu.Item key="manageUsers" onClick={tabHandler.bind(this, 'manageUsers')} className={classes.menuItem}>
                User Management
                </Menu.Item>
                <Menu.Item key="manageDesigns" onClick={tabHandler.bind(this, 'manageDesigns')} className={classes.menuItem}>
                Design Management
                </Menu.Item>
        </Menu>

        <div>
            {selectedTab === 'manageUsers' ? <UserSettings/>: <DesignSettings/>}
        </div>
    </div>
)
};

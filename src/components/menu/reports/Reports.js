import { Menu } from "antd";
import { useState } from "react";

import classes from "./Reports.module.css";
import DesignReports from "./DesignReports";
import OrderReports from "./OrderReports";
import { getAccountLoader } from "../../../util/auth";

export default function Reports() {
const {accountType} = getAccountLoader();
const [selectedTab, setselectedTab] = useState('designs');

const items = [
    {
      label: 'Designs',
      key: 'designs',
    },
    {
      label: 'Orders',
      key: 'orders',
    }
]

const tabHandler= (tab) => {
    setselectedTab(tab.key);
};

if(accountType === "Retailer"){
    return <>
        <h1>Retailer Reports</h1>
    </>
}
if(accountType === "system"){
    return <>
        <h1>System Reports</h1>
    </>
}

return (
    <div className={classes.reportsMenu}>
        <Menu mode="horizontal" selectedKeys={[selectedTab]} onClick={tabHandler} style={{fontSize: "1rem"}} items={items} className={classes.menuBar}/>

        <div>
            {selectedTab === 'designs' ? <DesignReports/>: <OrderReports/>}
        </div>
    </div>
)
};

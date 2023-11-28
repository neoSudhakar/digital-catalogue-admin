import { Menu } from "antd";
import { useState } from "react";

import classes from "./Reports.module.css";
import DesignReports from "./DesignReports";
import OrderReports from "./OrderReports";

export default function Reports() {
const [selectedTab, setselectedTab] = useState('designs');

const tabHandler= (tab) => {
    setselectedTab(tab);
  };

return (
    <div className={classes.reportsMenu}>
        <Menu mode="horizontal" defaultSelectedKeys={['designs']} className={classes.menuBar}>
                <Menu.Item key="designs" onClick={tabHandler.bind(this, 'designs')} className={classes.menuItem}>
                Designs
                </Menu.Item>
                <Menu.Item key="orders" onClick={tabHandler.bind(this, 'orders')} className={classes.menuItem}>
                Orders
                </Menu.Item>
        </Menu>

        <div>
            {selectedTab === 'designs' ? <DesignReports/>: <OrderReports/>}
        </div>
    </div>
)
};

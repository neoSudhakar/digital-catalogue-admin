import { Menu } from "antd";
import { useState } from "react";
import OrderForm from "./OrderForm";
import History from "./History";
import classes from "../settings/Settings.module.css";

export default function OrdersMenu() {
const [selectedTab, setselectedTab] = useState('orders');

const tabHandler= (tab) => {
    setselectedTab(tab);
  };

return (
    <div className={classes.ordersMenu}>
        <Menu mode="horizontal" defaultSelectedKeys={['orders']} className={classes.menuBar}>
                <Menu.Item key="orders" onClick={tabHandler.bind(this, 'orders')} className={classes.menuItem}>
                Orders
                </Menu.Item>
                <Menu.Item key="history" onClick={tabHandler.bind(this, 'history')} className={classes.menuItem}>
                History
                </Menu.Item>
        </Menu>

        <div>
            {selectedTab === 'orders' ? <OrderForm/>: <History/>}
        </div>
    </div>
)
};
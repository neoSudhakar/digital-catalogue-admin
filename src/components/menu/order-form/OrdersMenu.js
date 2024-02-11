import { Menu } from "antd";
import { useState } from "react";
import OrderForm from "./OrderForm";
import History from "./History";
import classes from "./OrderForm.module.css";

export default function OrdersMenu() {
const [selectedTab, setselectedTab] = useState('orders');

const items = [
    {
      key: 'orders',
      label: 'Orders',
      style: {
        fontSize: "1.2rem",
        // paddingBottom: "0.35rem",
        // margin: "0 1.5rem",
      },
    },
    {
      key: 'history',
      label: 'History',
      style: {
        fontSize: "1.2rem",
        // paddingBottom: "0.35rem",
        // margin: "0 1.5rem",
      },
    }
]


const tabHandler= (tab) => {
    setselectedTab(tab.key);
  };

return (
    <div className={classes.ordersMenu}>
        <Menu mode="horizontal" defaultSelectedKeys={'orders'} selectedKeys={[selectedTab]} onClick={tabHandler} items={items} className={classes.menuBar}>
        </Menu>

        <div>
            {selectedTab === 'orders' ? <OrderForm/>: <History/>}
        </div>
    </div>
)
};
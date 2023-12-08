import { Menu } from "antd";
import { useState } from "react";
import OrderForm from "./OrderForm";
import History from "./History";
import classes from "./OrderForm.module.css";

export default function OrdersMenu() {
const [selectedTab, setselectedTab] = useState('orders');

const items = [
    {
      label: 'Orders',
      key: 'orders',
      style: {fontSize: '20px'}
    },
    {
      label: 'History',
      key: 'history',
      style: {fontSize: '20px'}
    }
]


const tabHandler= (tab) => {
    setselectedTab(tab.key);
  };

return (
    <div className={classes.ordersMenu}>
        <Menu mode="horizontal" selectedKeys={[selectedTab]} onClick={tabHandler} items={items} className={classes.menuBar}>
        </Menu>

        <div>
            {selectedTab === 'orders' ? <OrderForm/>: <History/>}
        </div>
    </div>
)
};
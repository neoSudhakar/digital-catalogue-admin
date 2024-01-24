import { Button, Row } from 'antd'
import React, { useState } from 'react'
import classes from "./Orders.module.css"
import styles from "../cart/Cart.module.css"
import OrderItem from './OrderItem';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../../util/http';
import { getUserId } from '../../../util/auth';

function Order({order,setOrderOpen, onOpenOrder}) {

    function handleGoToOrderItems() {
        setOrderOpen(true);
        onOpenOrder(order);
    }

  return (
    <div className={classes["order"]} onClick={handleGoToOrderItems}>
        <h2>Order {order.id}</h2>
    </div>
  )
}

export default Order

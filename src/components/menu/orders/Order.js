import { Button, Row } from 'antd'
import React, { useState } from 'react'
import classes from "./Orders.module.css"
import { FaArrowRightLong } from "react-icons/fa6";

function Order({order,setOrderOpen, onOpenOrder}) {

    function handleGoToOrderItems() {
        setOrderOpen(true);
        onOpenOrder(order);
    }

  return (
    <div className={classes["order"]} onClick={handleGoToOrderItems}>
        <h2 style={{color: "rgb(192, 9, 146)"}}>Order {order.id}</h2>
        <FaArrowRightLong size={"1.75rem"} color='rgb(189, 8, 98)'/>
    </div>
  )
}

export default Order

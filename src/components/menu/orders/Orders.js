import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import classes from "./Orders.module.css"
import OrderItem from './OrderItem';
import { getUserId } from '../../../util/auth';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../../util/http';
import styles from "../cart/Cart.module.css"
import LoadingIndicator from '../../../UI/LoadingIndicator';
import ErrorBlock from '../../../UI/ErrorBlock';

export default function Orders() {
    const ordersArr = useSelector(state=>state.orders.orders);

    const userId = getUserId();

    const [orderedDesigns, setOrderedDesigns] = useState([]); 

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["orders", {userId: userId}],
        queryFn: ({signal, queryKey}) => fetchOrders({signal, userId}),
      });
    
    useEffect(()=>{
      if(data){
        console.log("Orders data is: ", data);
        const mappedList = data.flatMap(order =>
          order.orderItems.map(item => ({orderId: order.id, ...item }))
        );

        console.log("mappedList ordered designs is: ", mappedList);

        setOrderedDesigns(mappedList);
      }
    },[data])

    let content;

    if(isPending){
      content = <div className={styles["loading-container"]}><LoadingIndicator/></div>
  }

  if(isError){
      content = <div  className={styles["error-container"]}>
                  <ErrorBlock title="An Error has occurred" message={error?.info?.message || "Failed to fetch orders"}/>
              </div>
  }

  if(data){
    content = <>
        {orderedDesigns.length > 0 && <ul className={styles["list"]}>
            {orderedDesigns.map((item)=><OrderItem key={item.id} item={item} />)}
        </ul>}
        {orderedDesigns.length === 0 && <p className={styles["fallback"]}>No items has ordered.</p>}
        </>
  }

  return (
    <div className={classes["whole"]}>
      {content}
    </div>
  )
}

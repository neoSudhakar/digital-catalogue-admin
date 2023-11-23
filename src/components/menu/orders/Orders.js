import React from 'react'
import { useSelector } from 'react-redux'
import classes from "./Orders.module.css"
import OrderItem from './OrderItem';
import { getUserId } from '../../../util/auth';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '../../../util/http';

export default function Orders() {
    const ordersArr = useSelector(state=>state.orders.orders);

    const userId = getUserId();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["orders", {userId: userId}],
        queryFn: ({signal, queryKey}) => fetchOrders({signal, userId}),
      });
    
      if(data){
        console.log("Orders data is: ", data);
      }

  return (
    <div className={classes["whole"]}>
      {data && data.length > 0 && <ul>
            {data.map((item)=><OrderItem key={item.id} item={item} />)}
        </ul>}
        {!data || data.length === 0 && <p>No items has ordered.</p>}
    </div>
  )
}

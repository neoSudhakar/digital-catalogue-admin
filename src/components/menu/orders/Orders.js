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
import Order from './Order';
import Button from '../../../UI/Button';
import { Col, Row } from 'antd';

export default function Orders() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [openedOrder, setOpenedOrder] = useState();
    const ordersArr = useSelector(state=>state.orders.orders);

    const userId = getUserId();

    const [orders, setOrders] = useState([]); 

    const [refreshed, setRefreshed] = useState(false);
    const [refreshedOrderId, setRefreshedOrderId] = useState();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["orders", {userId: userId}],
        queryFn: ({signal, queryKey}) => fetchOrders({signal, userId}),
      });
    
    useEffect(()=>{
      if(data){
        console.log("Orders data is: ", data);
        // const mappedList = data.flatMap(order =>
        //   order.orderItems.map(item => ({orderId: order.id, ...item }))
        // );

        // console.log("mappedList ordered designs is: ", );

        setOrders(data);
      }
    },[data])

    function handleOpenOrder(order){
      setOpenedOrder(order); 
    }

    let content;

    if(isPending){
      content = <div className={styles["loading-container"]}><LoadingIndicator/></div>
  }

  if(isError){
      content = <div  className={styles["error-container"]}>
                  <ErrorBlock title="An Error has occurred" message={error?.info?.message || "Failed to fetch orders"}/>
              </div>
  }

  function handleOnMutationAtion(orderId){
    setRefreshed(true);
    setRefreshedOrderId(orderId);
  }

  useEffect(()=>{
    if(refreshed && refreshedOrderId){
      const openedOrder = data.find((order)=>order.id === refreshedOrderId);
      setOpenedOrder(openedOrder);
    }
  },[refreshed, refreshedOrderId, data])

    if(openedOrder && orderOpen){
      return (
        <div className={classes["whole"]}>
          <div className={classes["order-items-page"]}>
              <Button style={{alignSelf: "flex-start", fontSize: "1rem" , padding: "0.5rem 1.5rem"}} type="primary" onClick={()=>setOrderOpen(false)}>Back</Button>
              <ul className={styles["list"]}>
                  {openedOrder.orderItems.map((item)=>(
                      <OrderItem order={openedOrder} onMutationAction={handleOnMutationAtion} setRefreshed={setRefreshed} setRefreshedOrderId={setRefreshedOrderId} key={item.id} item={{...item, orderId: openedOrder.id}} />
                  ))}
              </ul>
          </div>
          </div>
      )
    }

  if(data){
    content =<>
        {orders.length > 0 && <Row gutter={[16,16]}>
            {orders.map((item)=>(
              <Col span={4} key={item.id} style={{height: "10rem"}}>
                <Order onOpenOrder={handleOpenOrder} setOrderOpen={setOrderOpen} order={item} />
              </Col>
            ))}
        </Row>}
        {orders.length === 0 && <p className={styles["fallback"]}>No items has ordered.</p>}
        </>
  }

  return (
    <div className={classes["whole"]}>
      {content}
    </div>
  )
}

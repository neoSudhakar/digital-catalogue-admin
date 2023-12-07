import { useQuery } from '@tanstack/react-query'
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { fetchRecentOrders } from '../../../util/http'
import { Carousel } from 'react-responsive-carousel';
import classes from "./PieChartClassComponent.module.css"
import { useSelector } from 'react-redux';

export default function PieChartClassComponent() {

  const isDashboardOpen = useSelector(state=>state.ui.isDashboardOpen)

  const {data} = useQuery({
    queryKey: ["orders", {max:3}],
    queryFn: ({signal, queryKey})=>fetchRecentOrders({signal, ...queryKey[1]})
  })

  let content = <p>No data yet.</p>

  if(data){
    console.log("recent orders data is", data);
    content = <ul className={classes["list"]}>
      {data.map((order)=>{
        return <li className={classes[`${!isDashboardOpen ? classes["full"] : ""}`]} key={order.id}>
          <Carousel showThumbs={false} className={classes["carousel"]}>
            {order.orderItems.map((item)=>{
              return <div className={classes["image-container"]} key={item.id}>
                <img src={item.design.designImages[0]?.preSignedURL} />
              </div>
            })}
          </Carousel>
          {/* <div className={`${classes["field"]} ${!isDashboardOpen ? classes["full"] : ""}`}>
            <span>no. of designs</span>
            <label>{order.orderItems.length}</label>
          </div> */}
          <div className={`${classes["field"]} ${!isDashboardOpen ? classes["full"] : ""}`}>
            <span>by</span>
            <label>{order.user.firstName} {order.user.lastName}</label>
          </div>
          <div className={`${classes["field"]} ${!isDashboardOpen ? classes["full"] : ""}`}>
            <span>ordered date</span>
            <label>{order.createdDate.slice(0,10)}</label>
          </div>
          <div className={`${classes["field"]} ${!isDashboardOpen ? classes["full"] : ""}`} style={{marginRight: isDashboardOpen ? "2rem" : "3.25rem"}}>
            <span>status</span>
            <label>{order.orderStatus}</label>
          </div>
        </li>
      })}
    </ul>
  }
  return (
    <div>
      {content}
    </div>
  )
}

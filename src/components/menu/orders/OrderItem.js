import React from 'react'
import classes from "./OrderItem.module.css"

export default function OrderItem({item}) {
  return (
    <li className={classes["list-item"]}>
        <div className={classes["image-container"]}>
            <img src={item.design.designImages[0].preSignedURL} alt={`Design ${item.design.id}`} />
        </div>
        <div className={classes["content"]}>
            <h3>Design {item.design.id}</h3>
            <div className={classes["below-title"]}>
                <span className={classes["price"]}>₹30,499.00</span>
            </div>
        </div>
    </li>
  )
}

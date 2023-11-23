import React from 'react'
import classes from "./OrderForm.module.css";

export default function ViewOrderItems({item}) {

  const cardItem=item.orderItemList[0].design;
  return (
    <>
        <li className={classes["list-item"]}>
                <div className={classes["image-container"]}>
                    <img src={item.orderItemList[0].design.designImages[0].preSignedURL} alt={`Design ${item.orderItemList[0].design.id}`} />
                </div>
                <div className={classes["content"]}>
                    <h3>Design {item.orderItemList[0].design.id}</h3>
                    <div className={classes["below-title"]}>
                        <span className={classes["price"]}>₹30,499.00</span>
                    </div>
                </div>
        </li>
        <hr></hr>
            <div className={classes["cardItem-details"]}>
            <div>
                <span>Design Id: </span>
                <p>{cardItem.id}</p>
            </div>
            <div>
                <span>Main Group: </span>
                <p>{cardItem.mainGroup}</p>
            </div>
            <div>
                <span>Category: </span>
                <p>{cardItem.category}</p>
            </div>
            <div>
                <span>Created Date: </span>
                <p>{cardItem.createdDate.slice(0, 10)}</p>
            </div>
            <div>
                <span>Style: </span>
                <p>{cardItem.style}</p>
            </div>
            <div>
                <span>Product: </span>
                <p>{cardItem.product}</p>
            </div>
            <div>
                <span>Model: </span>
                <p>{cardItem.model}</p>
            </div>
            <div>
                <span>Size: </span>
                <p>{cardItem.size}</p>
            </div>
            <div>
                <span>Worker: </span>
                <p>{cardItem.worker}</p>
            </div>
            <div>
                <span>Pieces: </span>
                <p>{cardItem.pieces}</p>
            </div>
            <div>
                <span>Gross Weight: </span>
                <p>{cardItem.grossWeight} grms</p>
            </div>
            <div>
                <span>Stone Weight: </span>
                <p>{cardItem.stoneWeight} grms</p>
            </div>
            <div>
                <span>Net Weight: </span>
                <p>{cardItem.netWeight} grms</p>
            </div>
            <div>
                <span>Ghat Weight: </span>
                <p>{cardItem.ghatWt} grms</p>
            </div>
            <div>
                <span>Component Weight: </span>
                <p>{cardItem.componentWeight} grms</p>
            </div>
            </div>
    </>
  )
}

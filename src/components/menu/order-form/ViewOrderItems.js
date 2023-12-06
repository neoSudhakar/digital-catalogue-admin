import React from 'react'
import classes from "./OrderForm.module.css";
import { useState } from 'react';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { Button } from 'antd';


export default function ViewOrderItems({items}) {

  //const cardItem=items.design;

  const [expandedItemId, setExpandedItemId] = useState(null);
  const [expanded, setExpanded] = useState(false);
const toggleDetails = (itemId) => {
    setExpanded(!expanded);
    setExpandedItemId((prevId) => (prevId === itemId ? null : itemId));
  };


  return (
    <>
        {items.map((item)=>{
            return <li key={item.id}>
                <div className={classes["list-item"]}>
                <div className={classes["image-container"]}>
                    <img src={item.design.designImages[0].preSignedURL} alt={`Design ${item.design.id}`} />
                </div>
                <div className={classes["content"]}>
                    <h3>Design {item.design.id}</h3>
                    <div className={classes["below-title"]}>
                        <span className={classes["price"]}>₹30,499.00</span>
                        <Button onClick={() => toggleDetails(item.id)}>
                            {expanded ? (
                                <>
                                Hide Details <CaretUpOutlined />
                                </>
                            ) : (
                                <>
                                More Details <CaretDownOutlined />
                                </>
                            )} 
                        </Button>
                    </div>
                </div>
                </div>
                <hr></hr>
                {expandedItemId === item.id && (
                        
                    <div className={classes["cardItem-details"]}>
                        <div>
                            <span>Design Id: </span>
                            <p>{item.design.id}</p>
                        </div>
                        <div>
                            <span>Main Group: </span>
                            <p>{item.design.mainGroup}</p>
                        </div>
                        <div>
                            <span>Category: </span>
                            <p>{item.design.category}</p>
                        </div>
                        <div>
                            <span>Created Date: </span>
                            <p>{item.design.createdDate.slice(0, 10)}</p>
                        </div>
                        <div>
                            <span>Style: </span>
                            <p>{item.design.style}</p>
                        </div>
                        <div>
                            <span>Product: </span>
                            <p>{item.design.product}</p>
                        </div>
                        <div>
                            <span>Model: </span>
                            <p>{item.design.model}</p>
                        </div>
                        <div>
                            <span>Size: </span>
                            <p>{item.design.size}</p>
                        </div>
                        <div>
                            <span>Worker: </span>
                            <p>{item.design.worker}</p>
                        </div>
                        <div>
                            <span>Pieces: </span>
                            <p>{item.design.pieces}</p>
                        </div>
                        <div>
                            <span>Gross Weight: </span>
                            <p>{item.design.grossWeight} grms</p>
                        </div>
                        <div>
                            <span>Stone Weight: </span>
                            <p>{item.design.stoneWeight} grms</p>
                        </div>
                        <div>
                            <span>Net Weight: </span>
                            <p>{item.design.netWeight} grms</p>
                        </div>
                        <div>
                            <span>Ghat Weight: </span>
                            <p>{item.design.ghatWt} grms</p>
                        </div>
                        <div>
                            <span>Component Weight: </span>
                            <p>{item.design.componentWeight} grms</p>
                        </div>
                    </div>
                )}
            </li>
        })}

    </>
  )
}

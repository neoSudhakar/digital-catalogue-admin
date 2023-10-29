import React from 'react';
import classes from "./CatalogueProductDetails.module.css";

export default function CatalogueProductDetails({cardItem}) {
  return (
  <div className={classes["product-details"]}>
    <div className={classes["left-details"]}>
      <h2>Product details</h2>
      <p className={classes["specification-heading"]}>Specifications</p>
      <div className={classes["specifications"]}>
        <div className={classes['each-specification']}>
          <span className={classes['label']}>Jewellery Type:</span>
          <span className={classes["value"]}>{cardItem.category}</span>
        </div>
        <div className={classes['each-specification']}>
          <span className={classes['label']}>Gross Weight:</span>
          <span className={classes["value"]}>{cardItem.grossWeight}</span>
        </div>
        <div className={classes['each-specification']}>
          <span className={classes['label']}>Style:</span>
          <span className={classes["value"]}>{cardItem.style}</span>
        </div>
        <div className={classes['each-specification']}>
          <span className={classes['label']}>Model:</span>
          <span className={classes["value"]}>{cardItem.model}</span>
        </div>
        <div className={classes['each-specification']}>
          <span className={classes['label']}>Size:</span>
          <span className={classes["value"]}>{cardItem.size}</span>
        </div>
      </div>
    </div>

    {/* <div className={classes['right-image']}>
      <img src={cardItem.designImages[0].imageUrl} alt={cardItem.category} />
    </div> */}
  </div>
  )
}

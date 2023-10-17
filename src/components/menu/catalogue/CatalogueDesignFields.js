import React from 'react'
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import classes from "./CatalogueDesignFields.module.css";
import DiamondIcon from '../../../icons/diamond-icon';
import ExchangeIcon from '../../../icons/exchange-icon';
import ShippingIcon from '../../../icons/shipping-icon';

export default function CatalogueDesignFields({cardItem}) {
  return (
    <div className={classes["fields"]}>
      <div className={classes["title-container"]}>
        <h2>Design{cardItem.id}</h2>
      </div>
      <p className={classes.price}>Price <span>₹30,499.00</span></p>
      <div className={classes["quantity-container"]}>
        <span>Quantity</span>
        <div className={classes["quantity-actions"]}>
            <span><MinusIcon circle={true} /></span>
            <input type="number" min={1} step={1} />
            <span><PlusIcon circle={true}/></span>
        </div>
      </div>
      <div className={classes["actions"]}>
        <button className={classes["add-to-cart"]}>Add to Cart</button>
        <button className={classes["buy"]}>Buy Now</button>
      </div>
      <div className={classes["info-container"]}>
        <div className={classes.info}>
            <DiamondIcon/>
            <span>Purity Guaranteed.</span>
        </div>
        <div className={classes.info}>
            <ExchangeIcon/>
            <span>Exchange across all stores.</span>
        </div>
        <div className={classes.info}>
            <ShippingIcon/>
            <span>Free Shipping all across India.</span>
        </div>
      </div>
    </div>
  )
}

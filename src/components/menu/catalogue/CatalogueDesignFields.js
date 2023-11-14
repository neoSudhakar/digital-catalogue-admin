import React, { useState } from 'react'
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import classes from "./CatalogueDesignFields.module.css";
import DiamondIcon from '../../../icons/diamond-icon';
import ExchangeIcon from '../../../icons/exchange-icon';
import ShippingIcon from '../../../icons/shipping-icon';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from '../../../store/cart-slice';

export default function CatalogueDesignFields({cardItem}) {
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  function handleDecreaseQty(){
    setQty(prev=>+prev-1);
  }
  function handleIncreaseQty(){
    setQty(prev=>+prev+1);
  }

  function handleQtyChange(event){
    setQty(event.target.value);
  }

  function handleAddToCart(){
    console.log({...cardItem, quantity:+qty});
    dispatch(cartSliceActions.addItemToCart({...cardItem, quantity:+qty}));
  }
  return (
    <div className={classes["fields"]}>
      <div className={classes["title-container"]}>
        <h2>Design{cardItem.id}</h2>
      </div>
      <p className={classes.price}>Price <span>₹30,499.00</span></p>
      <div className={classes["quantity-container"]}>
        <span>Quantity</span>
        <div className={classes["quantity-actions"]}>
            <button onClick={handleDecreaseQty} disabled={qty===1}><MinusIcon circle={true} /></button>
            <input type="number" min={1} step={1} value={qty} onChange={handleQtyChange} />
            <button onClick={handleIncreaseQty}><PlusIcon circle={true}/></button>
        </div>
      </div>
      <div className={classes["actions"]}>
        <button className={classes["add-to-cart"]} onClick={handleAddToCart}>Add to Cart</button>
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

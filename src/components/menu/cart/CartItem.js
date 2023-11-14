import React from 'react'
import classes from "./CartItem.module.css"
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import { useDispatch } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice'

export default function CartItem({item}) {
    const dispatch = useDispatch()

    function handleMinus(){
        dispatch(cartSliceActions.removeItemFromCart(item.id));
    }

    function handlePlus() {
        dispatch(cartSliceActions.addItemToCart({...item, quantity: 1}));
    }

  return (
    <li className={classes["list-item"]}>
        <div className={classes["content"]}>
            <h3>Design {item.id}</h3>
            <div className={classes["below-title"]}>
                <span className={classes["price"]}>₹30,499.00</span>
                <span className={classes["qty"]}>x{item.quantity}</span>
            </div>
        </div>
        <div className={classes["actions"]}>
            <button className={classes["minus"]} onClick={handleMinus}><MinusIcon circle size="22"/></button>
            <button className={classes["plus"]} onClick={handlePlus}><PlusIcon circle size="22"/></button>
        </div>
    </li>
  )
}

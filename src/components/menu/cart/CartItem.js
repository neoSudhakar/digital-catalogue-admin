import React from 'react'
import classes from "./CartItem.module.css"
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import { useDispatch } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice'
import TrashBinIcon from '../../../icons/trash-bin-icon'

export default function CartItem({item}) {
    const dispatch = useDispatch()

    function handleMinus(){
        dispatch(cartSliceActions.removeItemFromCart(item.id));
    }

    function handlePlus() {
        dispatch(cartSliceActions.addItemToCart({...item, quantity: 1}));
    }

    function handleRemoveWholeItemFromCart(){
        dispatch(cartSliceActions.removeWholeItemFromCart(item.id));
    }

  return (
    <li className={classes["list-item"]}>
        <div className={classes["content"]}>
            <h3>Design {item.id}</h3>
            <div className={classes["below-title"]}>
                <span className={classes["price"]}>₹30,499.00</span>
            </div>
        </div>
        <div className={classes["actions"]}>
            <button className={classes["minus"]} onClick={handleMinus}><MinusIcon circle size="22"/></button>
            <span className={classes["qty"]}>x{item.quantity}</span>
            <button className={classes["plus"]} onClick={handlePlus}><PlusIcon circle size="22"/></button>
        </div>
        <button className={classes["remove-icon"]} onClick={handleRemoveWholeItemFromCart} ><TrashBinIcon/></button>
    </li>
  )
}

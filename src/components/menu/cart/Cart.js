import React from 'react'
import ModalComponent from '../view-designs/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice';
import classes from "./Cart.module.css"
import CartItem from './CartItem';

export default function Cart() {
    const dispatch = useDispatch();

    const cartItems = useSelector(state=>state.cart.items);
    const totalQuantity = useSelector(state=>state.cart.totalQuantity);
    const isCartOpen = useSelector(state=>state.cart.isCartOpen);

    function handleCloseCart(){
        dispatch(cartSliceActions.toggleCart());
    }

  return (
    <div>
        <ModalComponent
            isOpen={isCartOpen}
            title={"CART"}
            style={{ maxWidth: "90%", minWidth: "35%" }} >
            <div className={classes["cart"]}>
                {cartItems.length > 0 && <ul  className={classes["list"]}>
                    {cartItems.map((item)=><CartItem key={item.id} item={item} />)}
                </ul>}
                {cartItems.length === 0 && <p className={classes["fallback"]}>No items in cart.</p>}

                <button  className={classes["close-btn"]} onClick={handleCloseCart}>Close</button>
            </div>
            </ModalComponent>
    </div>
  )
}

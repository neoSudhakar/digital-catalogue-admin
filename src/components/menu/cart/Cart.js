import React, { useEffect, useState } from 'react'
import ModalComponent from '../view-designs/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice';
import classes from "./Cart.module.css"
import CartItem from './CartItem';
import { getUserId } from '../../../util/auth';
import { fetchCart } from '../../../util/http';
import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../../../UI/LoadingIndicator';
import ErrorBlock from '../../../UI/ErrorBlock';

export default function Cart() {
    const dispatch = useDispatch();

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const userId = getUserId();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["cart", {userId: userId}],
        queryFn : ({signal})=>fetchCart({signal, userId: userId}),
    })

    useEffect(()=>{
        if(data){
            console.log("cart data is", data);
            const mappedList = data.flatMap(cart =>
                cart.cartItemSet.map(item => ({ cartId: cart.id , ...item }))
              );
      
              console.log("mappedList of cart is: ", mappedList);
      
              setCartItems(mappedList);
            // localStorage.setItem("CART_ID", data.id);
            setTotalQuantity(mappedList.reduce((sum, item)=>{
                return sum + item.quantity 
            }, 0));
        }
    },[data])

    const isCartOpen = useSelector(state=>state.cart.isCartOpen);

    function handleCloseCart(){
        dispatch(cartSliceActions.toggleCart());
    }

    let content;

    if(isPending){
        content = <div className={classes["loading-container"]}><LoadingIndicator/></div>
    }

    if(isError){
        content = <div  className={classes["error-container"]}>
                    <ErrorBlock title="An Error has occurred" message={error?.info?.message || "Failed to fetch cart"}/>
                </div>
    }

    if(data){
        content = <>
        {cartItems.length > 0 && <ul  className={classes["list"]}>
            {cartItems.map((item)=><CartItem key={item.cartId} item={item} />)}
        </ul>}
        {cartItems.length === 0 && <p className={classes["fallback"]}>No items in cart.</p>}

    </>
    }

  return (
    <div>
        <ModalComponent
            isOpen={isCartOpen}
            title={"CART"}
            style={{ maxWidth: "90%", minWidth: "55%" }} >

            <div className={classes["cart"]}>
                {content}
                <button  className={classes["close-btn"]} onClick={handleCloseCart}>Close</button>
            </div>
            
        </ModalComponent>
    </div>
  )
}

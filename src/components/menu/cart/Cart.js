import React, { useEffect, useState } from 'react'
import ModalComponent from '../view-designs/ModalComponent'
import { useDispatch, useSelector } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice';
import classes from "./Cart.module.css"
import CartItem from './CartItem';
import { getAccountLoader, getUserId } from '../../../util/auth';
import { fetchCart, postOrder, queryClientObj } from '../../../util/http';
import { useMutation, useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../../../UI/LoadingIndicator';
import ErrorBlock from '../../../UI/ErrorBlock';

export default function Cart() {
    const dispatch = useDispatch();

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [cartItems, setCartItems] = useState([]);

    const userId = getUserId();
    const {id: accountId} = getAccountLoader();

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["cart", {userId: userId}],
        queryFn : ({signal})=>fetchCart({signal, userId: userId}),
    })

    useEffect(()=>{
        if(data === null){
            console.log("no cart data");
        }
        if(data){
            console.log("cart data is", data);
            
            setCartItems(data.cartItems);

            setTotalQuantity(data.cartItems.reduce((sum, item)=>{
                return sum + item.quantity 
            }, 0));
        }
    },[data])

    const isCartOpen = useSelector(state=>state.cart.isCartOpen);

    function handleCloseCart(){
        dispatch(cartSliceActions.toggleCart());
    }

    const [errModalIsOpen, setErrModalIsOpen] = useState(false);
    const {mutate: orderMutate, isPending: orderIsPendign, isError: orderIsError, error: orderError} = useMutation({
        mutationFn: postOrder,
        onSuccess: ()=>{
            queryClientObj.invalidateQueries({
                queryKey: ["orders"],
            })
            queryClientObj.invalidateQueries({
                queryKey: ["cart"],
            })
            handleCloseCart();
        },
        onError: ()=>{
            setErrModalIsOpen(true);
        }
    })

    function handleOrder(){
        const mappedList = data.cartItems.map(item => ({designId: item.design.id, quantity: item.quantity}));

        console.log("mappedList of ordering cart items", mappedList);
          orderMutate({ userId: userId, accountId: accountId, orderItems: [...mappedList], cartId: data.id });
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

    let content2;

    if(errModalIsOpen){
        content2 = <div  className={classes["error-container"]}>
        <ErrorBlock title="An Error has occurred" message={error?.info?.message || "Failed to order cart items"}/>
    </div>
    }

    if(data){
        content = <>
        {cartItems.length > 0 && <ul  className={classes["list"]}>
            {cartItems.map((item)=><CartItem key={item.id} item={item} cartId={data.id} />)}
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
                {content2}
                {content}
                <div className={classes["actions"]}>
                    <button  className={classes["close-btn"]} onClick={handleCloseCart}>Close</button>
                    {cartItems.length > 0 && <button className={classes["order-btn"]} onClick={handleOrder}>Order</button>}
                </div>
            </div>
            
        </ModalComponent>
    </div>
  )
}

import React, { useState } from 'react'
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import classes from "./CatalogueDesignFields.module.css";
import DiamondIcon from '../../../icons/diamond-icon';
import ExchangeIcon from '../../../icons/exchange-icon';
import ShippingIcon from '../../../icons/shipping-icon';
import { useDispatch, useSelector } from 'react-redux';
import { cartSliceActions } from '../../../store/cart-slice';
import { getAccountLoader, getUserId } from '../../../util/auth';
import { useMutation } from '@tanstack/react-query';
import { postCart, postOrder, queryClientObj } from '../../../util/http';
import ErrorModal from '../view-designs/ErrorModal';

export default function CatalogueDesignFields({cardItem}) {
  const dispatch = useDispatch();

  const {id: accountId} = getAccountLoader();
  const userId = getUserId();

  const cartItems = useSelector(state=>state.cart.items);

  const ordersArr = useSelector(state=>state.orders.orders);

  const isDesignExistInOrders = ordersArr.findIndex((order)=>{
    const isExist = order.orderItemSet.findIndex((item)=>item.design.id ===cardItem.id ) >= 0;
    return isExist;
  }) >= 0;
  const isDesignExistInCart = cartItems.findIndex((cart)=>{
    const isExist = cart.cartItemSet.findIndex((item)=>item.design.id ===cardItem.id ) >= 0;
    return isExist;
  }) >= 0;

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

  const {mutate: mutateCart } = useMutation({
    mutationFn: postCart,
    onSuccess: ()=>{
      queryClientObj.invalidateQueries({
        queryKey: ["cart"],
      })
    },
  })

  function handleAddToCart(){
    console.log({...cardItem, quantity:+qty});
    // dispatch(cartSliceActions.addItemToCart({...cardItem, quantity:+qty}));
    mutateCart({userId: userId, accountId: accountId, cartItemSet: [{designId: cardItem.id, quantity: qty}]});

  }

  const [errModalIsOpen, setErrModalIsOpen] = useState(false);
  const {mutate, isPending, isError, error, data} = useMutation({
    mutationFn: postOrder,
    onSuccess: ()=>{
      queryClientObj.invalidateQueries({
        queryKey: ["orders"],
      })
    },
    onError: ()=>{
      setErrModalIsOpen(true);
    }
  })

  function handleCloseErrModal(){
    setErrModalIsOpen(false);
  }

  function handleOrderNow(){
    const userId = getUserId();
    console.log("userId is: ", userId);
    const {id: accountId} = getAccountLoader();
    console.log("accountId is: ", accountId);

    mutate({ userId: userId, accountId: accountId, orderItemSet: [{designId: cardItem.id, quantity: +qty }]});
  }

  let content;

  if(isError){
    content = <ErrorModal errModalIsOpen={errModalIsOpen} err={error} onCloseErrModal={handleCloseErrModal} fallBackErrMsg="Failed to post order!" />
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
        <button className={classes["add-to-cart"]} onClick={handleAddToCart} disabled={isDesignExistInCart}>{isDesignExistInCart ? "Added to cart" : "Add to cart"}</button>
        <button className={`${classes["buy"]} ${isDesignExistInOrders ? classes["ordered"] : ""}`} onClick={handleOrderNow} disabled={isDesignExistInOrders}>{isDesignExistInOrders ? "Ordered" : "Order Now"}</button>
        {content}
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

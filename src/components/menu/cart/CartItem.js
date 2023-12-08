import React, { useState } from 'react'
import classes from "./CartItem.module.css"
import MinusIcon from '../../../icons/minus-icon'
import PlusIcon from '../../../icons/plus-icon'
import { useDispatch } from 'react-redux'
import { cartSliceActions } from '../../../store/cart-slice'
import TrashBinIcon from '../../../icons/trash-bin-icon'
import { useMutation } from '@tanstack/react-query'
import { deleteCart, queryClientObj, updateCart } from '../../../util/http'
import ErrorModal from '../view-designs/ErrorModal'

export default function CartItem({item, cartId}) {
    console.log('cart id is:', cartId)
    const dispatch = useDispatch()

    const [isErrModalOpen, setIsErrModalOpen] = useState(false);
    const [err, setErr] = useState();

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: deleteCart,
        onSuccess: ()=>{
            queryClientObj.invalidateQueries({
                queryKey: ["cart"]
            })
        },
        onError: (errData)=>{
            setIsErrModalOpen(true);
            setErr(errData);
        }
    })

    const {mutate: updateMutate, isError: updateIsError, isPending: updateIsPending, error: updateError} = useMutation({
        mutationFn: updateCart,
        onSuccess: ()=>{
            queryClientObj.invalidateQueries({
                queryKey: ["cart"]
            })
        },
        onError: (errData)=>{
            setIsErrModalOpen(true);
            setErr(errData);
        }
    })

    function handleCloseErrModal(){
        setIsErrModalOpen(false);
    }

    function handleMinus(){
        // dispatch(cartSliceActions.removeItemFromCart(item.id));
        const updatedQuantity = item.quantity - 1;
        console.log("design id is:", item.design.id);
        console.log("updating data is:", {cartId, cartItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
        updateMutate({cartId, cartItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
    }

    function handlePlus() {
        // dispatch(cartSliceActions.addItemToCart({...item, quantity: 1}));
        const updatedQuantity = item.quantity + 1;
        console.log("design id is:", item.design.id);
        console.log("updating data is:", {cartId, cartItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
        updateMutate({cartId, cartItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
    }

    function handleRemoveWholeItemFromCart(){
        // dispatch(cartSliceActions.removeWholeItemFromCart(item.id));
        mutate({cartId, cartItemId: item.id})
    }

  return (
    <li className={classes["list-item"]}>
        <div className={classes["image-container"]}>
            <img src={item.design.designImages[0].preSignedURL} alt={`Design ${item.id}`} />
        </div>
        <div className={classes["content"]}>
            <h3>Design {item.design.id}</h3>
            <div className={classes["below-title"]}>
                <span className={classes["price"]}>₹30,499.00</span>
            </div>
        </div>
        <div className={classes["actions"]}>
            <button className={classes["minus"]} onClick={item.quantity === 1 ? handleRemoveWholeItemFromCart : handleMinus }><MinusIcon circle size="22"/></button>
            <span className={classes["qty"]}>x{item.quantity}</span>
            <button className={classes["plus"]} onClick={handlePlus}><PlusIcon circle size="22"/></button>
        </div>
        <button className={classes["remove-icon"]} onClick={handleRemoveWholeItemFromCart} >
            <TrashBinIcon/>
        </button>
        {isErrModalOpen && <ErrorModal errModalIsOpen={isErrModalOpen} err={err} onCloseErrModal={handleCloseErrModal} fallBackErrMsg={updateIsError ? "Failed to update cart item!" : "Failed to delete cart item!"} />}
    </li>
  )
}

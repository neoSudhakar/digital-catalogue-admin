import React, { useState } from 'react'
import classes from "../cart/CartItem.module.css"
import { useSelector } from 'react-redux'
import MinusIcon from '../../../icons/minus-icon';
import PlusIcon from '../../../icons/plus-icon';
import TrashBinIcon from '../../../icons/trash-bin-icon';
import { useMutation } from '@tanstack/react-query';
import { deleteOrder, queryClientObj, updateOrder } from '../../../util/http';
import ErrorModal from '../view-designs/ErrorModal';

export default function OrderItem({item}) {
    const isDashboardOpen = useSelector(state=>state.ui.isDashboardOpen);

    const [isErrModalOpen, setIsErrModalOpen] = useState(false);
    const [err, setErr] = useState();

    const {mutate, isError, isPending, error} = useMutation({
        mutationFn: deleteOrder,
        onSuccess: ()=>{
            queryClientObj.invalidateQueries({
                queryKey: ["orders"]
            })
        },
        onError: (errData)=>{
            setIsErrModalOpen(true);
            setErr(errData);
        }
    })

    const {mutate: updateMutate, isError: updateIsError, isPending: updateIsPending, error: updateError} = useMutation({
        mutationFn: updateOrder,
        onSuccess: ()=>{
            queryClientObj.invalidateQueries({
                queryKey: ["orders"]
            })
        },
        onError: (errData)=>{
            setIsErrModalOpen(true);
            setErr(errData);
        }
    })

    function handleMinus(){
        const updatedQuantity = item.quantity - 1;
        updateMutate({orderId: item.orderId, orderItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
    }

    function handlePlus() {
        const updatedQuantity = item.quantity + 1;
        updateMutate({orderId: item.orderId, orderItemId: item.id, data: {designId: item.design.id, quantity: updatedQuantity}})
    }

    function handleCloseErrModal(){
        setIsErrModalOpen(false);
    }

    function handleDeleteOrderItem(){
        mutate({orderId: item.orderId, orderItemId: item.id});
    }

  return (
    <li className={classes["list-item"]} style={{width: isDashboardOpen ? "80%" : "60%"}}>
        <div className={classes["image-container"]}>
            <img src={item.design.designImages[0].preSignedURL} alt={`Design ${item.design.id}`} />
        </div>
        <div className={classes["content"]}>
            <h3>Design {item.design.id}</h3>
            <div className={classes["below-title"]}>
                <span className={classes["price"]}>₹30,499.00</span>
            </div>
        </div>
        <div className={classes["actions"]}>
            <button className={classes["minus"]} onClick={item.quantity === 1 ? handleDeleteOrderItem : handleMinus}><MinusIcon circle size="22"/></button>
            <span className={classes["qty"]}>x{item.quantity}</span>
            <button className={classes["plus"]} onClick={handlePlus}><PlusIcon circle size="22"/></button>
        </div>
        <button className={classes["remove-icon"]} onClick={handleDeleteOrderItem}><TrashBinIcon/></button>
        {isErrModalOpen && <ErrorModal errModalIsOpen={isErrModalOpen} err={err} onCloseErrModal={handleCloseErrModal} fallBackErrMsg={updateIsError ? "Failed to update order item!" : "Failed to delete order item!"} />}
    </li>
  )
}

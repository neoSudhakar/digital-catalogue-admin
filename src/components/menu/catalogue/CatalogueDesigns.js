import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import classes from "../view-designs/ViewDesign.module.css";
import { redirect, useNavigate, useRouteLoaderData } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import DesignCards from "../view-designs/DesignCards/DesignCards";
import CatalogueDesignDetails from "./CatalogueDesignDetails";
import { uiActions } from "../../../store/ui-slice";
import { getAccountLoader, getUserId } from "../../../util/auth";
import { useQuery } from "@tanstack/react-query";
import { fetchCart, fetchOrders } from "../../../util/http";
import { ordersSliceActions } from "../../../store/orders-slice";
import { cartSliceActions } from "../../../store/cart-slice";

export default function CatalogueDesigns() {
  const navigate = useNavigate();

  const account = getAccountLoader();
  const userId = getUserId();

  const accountId = account?.id;

  const token = useRouteLoaderData("root");
  const dispatch = useDispatch();

  const [cardItem, setCardItem] = useState();

  const isDesignDetailsOpen = useSelector((state)=>state.ui.isCatalogueDesignDetailsOpen);

  function handleShowDetails(item) {
    // console.log(item);
    setCardItem(item);
    // setIsShow(true);
    dispatch(uiActions.openDesignDetails());
  }
  function handleGoBack() {
    // setIsShow(false);
    setCardItem();
    dispatch(uiActions.closeDesignDetails());
  }

  const {data, isPending, isError, error} = useQuery({
    queryKey: ["orders", {userId: userId}],
    queryFn: ({signal, queryKey}) => fetchOrders({signal, userId}),
  });

  if(data){
    console.log("Orders data is: ", data);
    dispatch(ordersSliceActions.setOrders(data));
  }

  const {data: cartData, isPending: cartIsPending, isError: cartIsError, error: cartError} = useQuery({
    queryKey: ["cart", {userId: userId}],
    queryFn : ({signal})=>fetchCart({signal, userId: userId}),
  })

  useEffect(()=>{
    if(cartData){
      console.log("Cart data is: ", cartData);
      dispatch(cartSliceActions.setCart(cartData.cartItems));
    }
  },[cartData]);



  let content = (
    <DesignCards handleShowDetails={handleShowDetails} catalogue accountId={accountId}/>
  );

  if (cardItem) {
    content = (
      <CatalogueDesignDetails onGoBack={handleGoBack} cardItem={cardItem}/>
    );
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {content}
      </AnimatePresence>
    </>
  );
}

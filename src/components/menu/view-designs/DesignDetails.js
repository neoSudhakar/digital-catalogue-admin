import { motion } from "framer-motion";
import { useState } from "react";
import classes from "./DesignDetails.module.css";
import ReactImageMagnify from "react-image-magnify";

export default function DesignDetails({cardItem, onGoBack}){

    const [imageItems, setImageItems]= useState(cardItem.images);

    const defaultImageItem=imageItems.find((item)=>{
        return item.isDefault;
    });

    function handleGoBack(){
        onGoBack();
    }

    function handleSelectImage(imageItem){
        // setSelectedImageItem(imageItem.image);
        const updatedImageItems=imageItems.map((item)=>{
          if(item.image===imageItem.image){
            return {...item, isDefault: true};
          }
          else{
            return {...item, isDefault: false};
          }
        });
        setImageItems(updatedImageItems);
      }


    return <motion.div
    key="details"
    initial={{ y: -30, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: -30, opacity: 0 }}
    className={classes["details-container"]}
  >
    <h1>{cardItem.title} Details</h1>
    <div className={classes["card-details"]}>
      <div className={classes.carousel}>
      <div className={classes["default-image"]}>
        <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: defaultImageItem.image,
                        width:"100%",
                        zIndex:0,
                        height: "100%",
                    },
                    largeImage: {
                        src: defaultImageItem.image,
                        width: 1200,
                        height: 1800
                    },
                    enlargedImageContainerDimensions:{
                        width:"100%",
                        height:"100%"
                    }
          }} />
        </div>
        <ul className={classes["left-images-container"]}>
          {imageItems.map((item)=>{
            return <li className={`${classes["left-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.image}>
                <img src={item.image}/>
            </li>
          })}
        </ul>
        
      </div>
      <section className={classes.content}>
        <h2 className={classes.title}>{cardItem.title}</h2>
        <p>{cardItem.description}</p>
        <div className={classes["cardItem-details"]}>
          <div>
            <span>Design No.: </span>
            <p>{cardItem.design_number}</p>
          </div>
          <div>
            <span>Mian Group: </span>
            <p>{cardItem.main_group}</p>
          </div>
          <div>
            <span>Category: </span>
            <p>{cardItem.category}</p>
          </div>
          <div>
            <span>Created Date: </span>
            <p>{cardItem.created_date}</p>
          </div>
          <div>
            <span>Style: </span>
            <p>{cardItem.style}</p>
          </div>
          <div>
            <span>Product: </span>
            <p>{cardItem.product}</p>
          </div>
          <div>
            <span>Model: </span>
            <p>{cardItem.model}</p>
          </div>
          <div>
            <span>Size: </span>
            <p>{cardItem.size}</p>
          </div>
          <div>
            <span>Worker: </span>
            <p>{cardItem.worker}</p>
          </div>
          <div>
            <span>Pieces: </span>
            <p>{cardItem.pieces}</p>
          </div>
          <div>
            <span>Gross Weight: </span>
            <p>{cardItem.gross_weight}</p>
          </div>
          <div>
            <span>Stone Weight: </span>
            <p>{cardItem.stone_weight}</p>
          </div>
          <div>
            <span>Net Weight: </span>
            <p>{cardItem.net_weight}</p>
          </div>
          <div>
            <span>Component Weight: </span>
            <p>{cardItem.component_weight}</p>
          </div>
          <div>
            <span>Ghat Weight: </span>
            <p>{cardItem.ghat_weight}</p>
          </div>

          {/* <p className={classes.price}>
            <span>₹{cardItem.price} </span>
          </p> */}
        </div>
        <div className={classes.actions}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, mass: 1 }}
          >
            ADD TO CART
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 500, mass: 1 }}
          >
            BUY
          </motion.button>
        </div>
      </section>
    </div>
    {/* <CarouselComponent /> */}
    <motion.button
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 500, mass: 1 }}
      className={classes.back}
      onClick={handleGoBack}
    >
      Back
    </motion.button>
  </motion.div>
}
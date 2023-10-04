import { motion } from "framer-motion";
import { useState } from "react";
import classes from "./DesignDetails.module.css";
import ReactImageMagnify from "react-image-magnify";
import CreationTable from "../master-design/CreationTable";
import DesignTable from "./DesignTable";

export default function DesignDetails({cardItem, onGoBack}){
    const {detailsSet} = cardItem;

     //   {"Sno": 1, type:"Type 1", stoneGroup:" Stone Group 1" , pcs: 1, stoneWt: 1, "UOM":"Grms" },

    const rowDataArr= detailsSet.map((eachItem, index)=>{
      const {type, stoneGroup, pieces, stoneWeight, unitOfMeasurement} = eachItem;
      return {
        "Sno": index+1,
        type,
        stoneGroup,
        pcs: pieces,
        stoneWt: stoneWeight,
        "UOM": unitOfMeasurement,
      }
    })

    const [imageItems, setImageItems]= useState(cardItem.designImages);

    const defaultImageItem=imageItems.find((item)=>{
        return item.isDefault;
    });

    function handleGoBack(){
        onGoBack();
    }

    function handleSelectImage(imageItem){
        // setSelectedImageItem(imageItem.image);
        const updatedImageItems=imageItems.map((item)=>{
          if(item.imageUrl===imageItem.imageUrl){
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
    <h1>Design {cardItem.id} Details</h1>
    <div className={classes["card-details"]}>
      <div className={classes["above-table"]}>
      <div className={classes.carousel}>
      <div className={classes["default-image"]}>
        <ReactImageMagnify {...{
                    smallImage: {
                        alt: 'Wristwatch by Ted Baker London',
                        isFluidWidth: true,
                        src: defaultImageItem.imageUrl,
                        width:"100%",
                        zIndex:0,
                        height: "100%",
                    },
                    largeImage: {
                        src: defaultImageItem.imageUrl,
                        width: 1000,
                        height: 1000
                    },
                    enlargedImageContainerDimensions:{
                        width:"100%",
                        height:"100%"
                    }
          }} />
        </div>
        <ul className={classes["left-images-container"]}>
          {imageItems.map((item)=>{
            return <li className={`${classes["left-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.imageUrl}>
                <img src={item.imageUrl}/>
            </li>
          })}
        </ul>
        
      </div>
      <section className={classes.content}>
        {/* <h2 className={classes.title}>Design {cardItem.id}</h2> */}
        <div className={classes["cardItem-details"]}>
          <div>
            <span>Design No.: </span>
            <p>{cardItem.designNumber}</p>
          </div>
          <div>
            <span>Mian Group: </span>
            <p>{cardItem.mainGroup}</p>
          </div>
          <div>
            <span>Category: </span>
            <p>{cardItem.category}</p>
          </div>
          <div>
            <span>Created Date: </span>
            <p>{cardItem.createdDate}</p>
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
            <p>{cardItem.grossWeight}</p>
          </div>
          <div>
            <span>Stone Weight: </span>
            <p>{cardItem.stoneWeight}</p>
          </div>
          <div>
            <span>Net Weight: </span>
            <p>{cardItem.netWeight}</p>
          </div>
          <div>
            <span>Component Weight: </span>
            <p>{cardItem.componentWeight}</p>
          </div>
          <div>
            <span>Ghat Weight: </span>
            <p>{cardItem.ghatWt}</p>
          </div>
        </div>
      </section>
      </div>
      <div className={classes.table}>
          <DesignTable rowDataArr={rowDataArr}/>
      </div>
    </div>
    
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
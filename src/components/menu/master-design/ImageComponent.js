import { useState, useMemo } from "react";
import classes from "./ImageComponent.module.css";
import UploadImage from "../../../assets/upload-image.png";

export default function ImageComponent({images}){
   

    


    return <>
        {images.length === 0 && (
        //"https://nxtdiv-digital-catalogue.s3.ap-south-1.amazonaws.com/DigitalCatalogue/2023/8/30/20230930202809573_Jewellery.jpg"
        <img src={UploadImage} alt="Design Image" style={{ width: '30%' }} />)
      }
      {images.length >= 1 && <img src={images[0].previewUrl}  style={{ width: '100%', height:"95%" }}  />}
      
          
          
      
    </>
}
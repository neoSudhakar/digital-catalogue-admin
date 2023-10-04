import { useState } from "react";
import classes from "./ImageComponent.module.css";
import UploadImage from "../../../assets/upload-image.png";

export default function ImageComponent({fileList}){
      let  images= [
            {image: "https://picsum.photos/536/354", isDefault: true},
            // {image: "https://picsum.photos/536/301", isDefault: false},
            {image: "https://picsum.photos/536/302", isDefault: false},
            {image: "https://picsum.photos/536/303" , isDefault: false},
      ]

    const [imageItems, setImageItems]= useState(images);

    const defaultImageItem=imageItems.find((item)=>{
        return item.isDefault;
    });

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

    return <>
        {images.length === 0 && (
        //"https://nxtdiv-digital-catalogue.s3.ap-south-1.amazonaws.com/DigitalCatalogue/2023/8/30/20230930202809573_Jewellery.jpg"
        <img src={UploadImage} alt="Design Image" style={{ width: '30%' }} />)
      }
      {images.length === 1 && <img src={images[0].image}  style={{ width: '100%' }}  />}
      {images.length > 1 && <div className={classes.container}>
          <div className={classes["default-img"]}>
              <img src={defaultImageItem.image} />
          </div>
          <ul className={classes["normal-images-container"]}>
            {imageItems.map((item)=>{
              return <li className={`${classes["normal-image"]} ${item.isDefault ? classes.active : "" }`} onMouseOver={()=>handleSelectImage(item)} key={item.image}>
                        <img src={item.image}/>
                  </li>
            })}
          </ul>
      </div>
      }
    </>
}
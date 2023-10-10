import React from 'react';
import ReactImageMagnify from 'react-image-magnify';

import classes from "./magnify.module.css";


export default function Magnify({src}){
        return (
                    <div>
                        <ReactImageMagnify {...{
                            smallImage: {
                                alt: 'Wristwatch by Ted Baker London',
                                isFluidWidth: true,
                                src: src,
                                width: "50%",
                                height:"60vh"
                            },
                            largeImage: {
                                src: src,
                                width: 1200,
                                height: 1800,
                            },
                            enlargedImageContainerDimensions: {
                                width: '100%',
                                height: '100%'
                            }
                        }} />
                    </div>
        );
}
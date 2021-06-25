import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import axiosServer from "../../services/axiosServer";

const DemoCarousel = ({ files }) => {
    console.log("democarousel", files);
    // return null;
    return (
        <Carousel>
            {
                !!files && files.map(element => {
                    return (
                        <div>
                            <a download href={`${axiosServer.defaults.baseURL}/download/${element.id}`}>{element.name}</a>
                        </div>
                    );
                })
            }
        </Carousel>
    );
};

export default DemoCarousel;
// Don't forget to include the css in your page

// Using webpack or parcel with a style loader
// import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';

// Using html tag:
// <link rel="stylesheet" href="<NODE_MODULES_FOLDER>/react-responsive-carousel/lib/styles/carousel.min.css"/>

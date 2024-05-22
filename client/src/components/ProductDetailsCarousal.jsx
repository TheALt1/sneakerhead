import React from "react";
import { useState, useEffect } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const ProductDetailsCarousel = ( {images }) => {
    const [showIndicators, setShowIndicators] = useState(window.innerWidth < 1023); // Adjust the breakpoint as needed

  const handleResize = () => {
    setShowIndicators(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    // Clean up the listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
    return (
            <div>
            <Carousel
                infiniteLoop={true}
                showIndicators={showIndicators}
                showStatus={false}
                thumbWidth={60}
                className="productCarousel"
                
            >   
              {/* plan and make logic for video and image rendering for side panel */}
                {images?.map((img) => (
                  img.attributes.name.endsWith('.mp4') ? (
                    <video key={img.id} controls autoPlay loop  width="100%" height="100%" >
                         <source src={img.attributes.url} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                  ) : (
                    <img
                          key={img.id}
                          src={img.attributes.url}
                          alt={img.attributes.name}
                            />
                  )
                
                ))}
            </Carousel>
            </div>
    );
};

export default ProductDetailsCarousel;
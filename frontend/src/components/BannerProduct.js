import React, { useEffect, useState } from 'react';
import image1 from '../assest/banner/img1.jpg';
import image2 from '../assest/banner/img2.webp';
import image4 from '../assest/banner/img4.webp';

import image1Mobile from '../assest/banner/img1_mobile.jpg';
import image2Mobile from '../assest/banner/img2_mobile.jpg';
import image3Mobile from '../assest/banner/img3_mobile.jpg';
import image5Mobile from '../assest/banner/img5_mobile.jpg';

import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [image1, image2, image4];
    const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image5Mobile];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage((prev) => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage((prev) => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded">
            <div className="h-56 md:h-72 lg:h-96 w-full bg-slate-200 relative">
                <div className="absolute z-10 h-full w-full md:flex items-center hidden">
                    <div className="flex justify-between w-full text-2xl">
                        <button onClick={prevImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleLeft />
                        </button>
                        <button onClick={nextImage} className="bg-white shadow-md rounded-full p-1">
                            <FaAngleRight />
                        </button>
                    </div>
                </div>

                {/* Desktop and Tablet Carousel */}
                <div className="hidden md:flex h-full w-full overflow-hidden">
                    {desktopImages.map((imageURL, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-transform duration-500 ease-in-out"
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className="w-full h-full object-cover" alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>

                {/* Mobile Carousel */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {mobileImages.map((imageURL, index) => (
                        <div
                            className="w-full h-full min-w-full min-h-full transition-transform duration-500 ease-in-out"
                            key={imageURL}
                            style={{ transform: `translateX(-${currentImage * 100}%)` }}
                        >
                            <img src={imageURL} className="w-full h-full object-cover" alt={`Slide ${index}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BannerProduct;

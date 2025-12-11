import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

import banner1 from "../../assets/images/banner/banner1.jpg";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";

const Hero = () => {
    return (
        <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={3500}
            className="pt-0 overflow-hidden"
        >
            {/* Slide 1 */}
            <div className="relative">
                <img src={banner1} className="h-[75vh] w-full object-cover" />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40" />

                {/* Text Box */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                        Transform Your Space with StyleDecor
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
                        Elegant decoration for home & ceremony — crafted with style and creativity.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <button className="btn bg-primary text-white border-none px-8 rounded-full hover:bg-secondary shadow-lg">
                            Book Now
                        </button>

                        <button className="btn bg-base-100 text-secondary border border-secondary px-8 rounded-full hover:bg-base-200 shadow">
                            Browse Services
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide 2 */}
            <div className="relative">
                <img src={banner2} className="h-[75vh] w-full object-cover" />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                        Make Every Moment Beautiful
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
                        Wedding, home, corporate — we handle all decoration needs.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <button className="btn bg-primary text-white border-none px-8 rounded-full hover:bg-secondary shadow-lg">
                            Book Decoration
                        </button>

                        <button className="btn bg-base-100 text-secondary border border-secondary px-8 rounded-full hover:bg-base-200 shadow">
                            View Packages
                        </button>
                    </div>
                </div>
            </div>

            {/* Slide 3 */}
            <div className="relative">
                <img src={banner3} className="h-[75vh] w-full object-cover" />

                <div className="absolute inset-0 bg-black/40" />

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-5">
                    <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg">
                        Premium Decoration Services
                    </h1>
                    <p className="mt-3 text-lg md:text-xl text-white/90 max-w-2xl">
                        Designed by professionals. Delivered with perfection.
                    </p>

                    <div className="mt-6 flex gap-4">
                        <button className="btn bg-primary text-white border-none px-8 rounded-full hover:bg-secondary shadow-lg">
                            Get Started
                        </button>

                        <button className="btn bg-base-100 text-secondary border border-secondary px-8 rounded-full hover:bg-base-200 shadow">
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </Carousel>
    );
};

export default Hero;
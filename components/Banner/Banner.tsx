"use client";

import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";

export default function Banner() {
    return (
        <div className="w-full">
            <Splide
                options={{
                    type: "loop",
                    autoplay: true,
                    interval: 4000,
                    pauseOnHover: true,
                    arrows: false,
                    pagination: true,
                    rewind: true,
                }}
                className="overflow-hidden"
            >
                <SplideSlide>
                    <img src="/banner/slide1.jpg" alt="Slide 1" className="w-full h-auto object-cover" />
                </SplideSlide>
                <SplideSlide>
                    <img src="/banner/slide2.jpg" alt="Slide 2" className="w-full h-auto object-cover" />
                </SplideSlide>
                <SplideSlide>
                    <img src="/banner/slide3.jpg" alt="Slide 3" className="w-full h-auto object-cover" />
                </SplideSlide>
            </Splide>
        </div>
    );
}

"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import "./style.css";

const banners = [
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8a2l0Y2hlbnxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVkcm9vbXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664303228218-c7eedbffe762?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c3RhdGlvbmFyeXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=2229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
];

export default function HomeBannerSlider() {
    return (
        <div className="relative w-full z-1">
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{
                    delay: 4000000,
                    disableOnInteraction: false,
                }}
                navigation
                pagination={{ clickable: true }}
                className="home-swiper"
            >
                {banners.map((src, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={src}
                            alt={`Banner ${index}`}
                            width={1600}
                            height={500}
                            priority={index === 0}
                            className="w-full h-[40vh] md:h-[55vh] object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

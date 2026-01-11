"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./style.css"
import { IMAGES } from "@/utils/images";
import Image from "next/image";

const products = [
    { id: 1, title: "Mixer Grinder", price: "₹2,499" },
    { id: 2, title: "Air Fryer", price: "₹4,999" },
    { id: 3, title: "Microwave", price: "₹7,999" },
    { id: 4, title: "Refrigerator", price: "₹18,999" },
    { id: 5, title: "Induction", price: "₹2,199" },
    { id: 6, title: "Oven", price: "₹5,299" },
];

export default function CardSlider() {
    return (
        <div className="relative px-6 ">
            <p className="font-semibold text-2xl py-4">Nearest Products from you</p>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={20}
                slidesPerView={4}
                slidesPerGroup={1}
                speed={600}
                breakpoints={{
                    320: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {products.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div className="card">
                            <Image
                                className="w-full h-48 object-cover mb-4 rounded-md"
                                src={"https://images.unsplash.com/photo-1515940175183-6798529cb860?q=80&w=2229&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} alt="product" height={200} width={200} />
                            <p className="font-semibold text-xl font-nunito">{item.title}</p>
                            <p>{item.price}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

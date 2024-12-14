import React from "react";

import {InfiniteCarousel} from "../shared/infinity-carousel";

export const CarouselCards = () => {
    const items = [
        "/images/innovation.png",
        "/images/oliy.png",
        "/images/tatu.png",
        "/images/mitc.png"
    ];

    return (
        <div className="flex items-center justify-center">
            <InfiniteCarousel items={items} direction="right" speed="slow"/>
        </div>
    );
};
"use client";

import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";

import {cn} from "@/lib/utils";

export const InfiniteCarousel = ({
                                     items,
                                     direction = "left",
                                     speed = "fast",
                                     pauseOnHover = true,
                                     className,
                                 }: {
    items: string[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scrollerRef = useRef<HTMLUListElement>(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        if (containerRef.current && scrollerRef.current) {
            // Clone children for infinite effect
            const children = Array.from(scrollerRef.current.children);
            children.forEach((child) => scrollerRef.current?.appendChild(child.cloneNode(true)));
            // Set direction and speed
            containerRef.current.style.setProperty(
                "--animation-direction",
                direction === "left" ? "forwards" : "reverse"
            );
            containerRef.current.style.setProperty(
                "--animation-duration",
                speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
            );
            setStart(true);
        }
    }, [direction, speed]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 overflow-hidden max-w-full [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex gap-x-20 py-4 w-max flex-nowrap items-center",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        key={idx}
                    >
                        <Image
                            src={item}
                            className={"object-cover object-center"}
                            alt={"carousel-item"}
                            width={120}
                            height={120}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};
'use client'

import Image from 'next/image'
import React, {useState} from 'react'

interface ImageProps {
    fill?: boolean;
    src: string;
    alt: string;
}

const CustomImage = ({fill, src, alt}: ImageProps) =>
{
    const [isLoading, setIsLoading] = useState(true);

    return (
        <>
            {fill ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    className={`object-contain duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75 ${
                        isLoading
                            ? "scale-100 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoadingComplete={() => setIsLoading(false)}
                />
            ) : (
                <Image 
                    src={src} 
                    alt={alt}
                    width={400}
                    height={1000}
                    className={`object-contain duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-75 ${
                        isLoading
                            ? "scale-100 blur-2xl grayscale"
                            : "scale-100 blur-0 grayscale-0"
                    }`}
                    onLoad={() => setIsLoading(false)}
                />
            )
            }
        </>
    )
}
export default CustomImage

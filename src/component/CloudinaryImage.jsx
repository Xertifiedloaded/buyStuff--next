"use client";

import Image from 'next/image';
export default function CloudinaryImage({ src, width,alt, height, style }) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={style}
            objectFit='cover'
        />
    );
}
"use client";

import LightGallery from "lightgallery/react";
import Image from "next/image";
import Link from "next/link";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

interface IProps {
  images: string[];
}

const DetailPageImageGallery = ({ images }: IProps) => {
  return (
    <LightGallery
      elementClassNames="mb-4 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {images.map((image, index) => (
        <Link
          key={index}
          className={`relative w-full ${index === 0 ? "col-span-2 row-span-2" : ""} 
                      ${index === 0 ? "h-96 md:h-96" : "h-48 md:h-56"}`}
          href={image}
        >
          <Image
            fill
            alt={`detail-image-${index + 1}`}
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image}
          />
        </Link>
      ))}
    </LightGallery>
  );
};

export default DetailPageImageGallery;

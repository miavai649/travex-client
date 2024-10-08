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

const ImageGallery = ({ images }: IProps) => {
  const visibleImages = images?.slice(0, 4);
  const remainingCount = images?.length - 4;

  return (
    <LightGallery
      elementClassNames={`mb-4 gap-2 grid ${
        visibleImages?.length === 1
          ? "grid-cols-1"
          : visibleImages?.length === 2
            ? "grid-cols-2"
            : "grid-cols-2 grid-rows-2"
      }`}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {visibleImages?.map((image, index) => (
        <Link
          key={index}
          className={`relative w-full ${
            visibleImages?.length === 3 && index === 0
              ? "col-span-2"
              : "col-span-1"
          } ${visibleImages?.length === 1 ? "h-96" : "h-48"}`}
          href={image}
        >
          <Image
            fill
            alt={`blog-image-${index + 1}`}
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 800px) 50vw, 33vw"
            src={image}
          />
          {index === 3 && remainingCount > 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center rounded-lg">
              <span className="text-white text-2xl font-bold">
                +{remainingCount}
              </span>
            </div>
          )}
        </Link>
      ))}
    </LightGallery>
  );
};

export default ImageGallery;

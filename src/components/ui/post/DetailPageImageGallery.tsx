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
  const getGridClass = (totalImages: number) => {
    if (totalImages === 1) return "grid-cols-1";
    if (totalImages === 2) return "grid-cols-2";
    if (totalImages === 3) return "grid-cols-2 md:grid-cols-3";
    if (totalImages === 4) return "grid-cols-2";

    return "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  };

  const getImageClass = (index: number, totalImages: number) => {
    if (totalImages === 1) return "col-span-1 aspect-video";
    if (totalImages === 2) return "col-span-1 aspect-square";
    if (totalImages === 3) return "aspect-square";
    if (totalImages === 4) {
      return index < 2 ? "col-span-1 aspect-square" : "col-span-1 aspect-[4/3]";
    }
    if (totalImages >= 5) {
      if (index === 0)
        return "col-span-2 row-span-2 aspect-square md:aspect-[4/3]";

      return "col-span-1 aspect-square";
    }

    return "";
  };

  return (
    <LightGallery
      elementClassNames={`grid ${getGridClass(images.length)} gap-2`}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}
    >
      {images.map((image, index) => (
        <Link
          key={index}
          className={`relative block ${getImageClass(index, images.length)} overflow-hidden`}
          href={image}
        >
          <Image
            fill
            alt={`detail-image-${index + 1}`}
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={image}
          />
        </Link>
      ))}
    </LightGallery>
  );
};

export default DetailPageImageGallery;

'use client'

import LightGallery from 'lightgallery/react'
import Image from 'next/image'
import Link from 'next/link'

import 'lightgallery/css/lightgallery.css'
import 'lightgallery/css/lg-zoom.css'
import 'lightgallery/css/lg-thumbnail.css'

import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'

interface IProps {
  images: string[]
}

const DetailPageImageGallery = ({ images }: IProps) => {
  const getGridClass = (totalImages: number) => {
    switch (totalImages) {
      case 1:
        return 'grid-cols-1'
      case 2:
        return 'grid-cols-2'
      case 3:
        return 'grid-cols-2 md:grid-cols-3'
      default:
        return 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
    }
  }

  const getImageClass = (index: number, totalImages: number) => {
    if (totalImages === 1) return 'col-span-1 row-span-1 h-[70vh]'
    if (totalImages === 2) return 'col-span-1 row-span-1 h-[50vh]'
    if (totalImages === 3 && index === 0)
      return 'col-span-2 row-span-2 h-[60vh] md:h-[70vh]'
    if (totalImages === 3 && index > 0)
      return 'col-span-1 row-span-1 h-48 md:h-56'
    if (index === 0) return 'col-span-2 row-span-2 h-96 md:h-[70vh]'
    return 'col-span-1 row-span-1 h-48 md:h-56'
  }

  return (
    <LightGallery
      elementClassNames={`mb-4 gap-2 grid ${getGridClass(images.length)}`}
      plugins={[lgThumbnail, lgZoom]}
      speed={500}>
      {images.map((image, index) => (
        <Link
          key={index}
          className={`relative w-full ${getImageClass(index, images.length)} overflow-hidden rounded-lg`}
          href={image}>
          <Image
            fill
            alt={`detail-image-${index + 1}`}
            className='object-cover'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            src={image}
          />
          {index === 4 && images.length > 5 && (
            <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl font-bold'>
              +{images.length - 5} more
            </div>
          )}
        </Link>
      ))}
    </LightGallery>
  )
}

export default DetailPageImageGallery

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
  return (
    <LightGallery
      elementClassNames='mb-4 gap-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
      speed={500}
      plugins={[lgThumbnail, lgZoom]}>
      {images.map((image, index) => (
        <Link
          key={index}
          className={`relative w-full ${
            index === 0 ? 'col-span-2 row-span-2' : ''
          } ${index === 0 ? 'h-96 md:h-full' : 'h-48 md:h-56'}`}
          href={image}>
          <Image
            className='rounded-lg object-cover'
            src={image}
            alt={`blog-image-${index + 1}`}
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        </Link>
      ))}
    </LightGallery>
  )
}

export default DetailPageImageGallery

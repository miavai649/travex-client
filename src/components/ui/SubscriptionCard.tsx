'use client'

import React from 'react'
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card'
import { Button } from '@nextui-org/button'
import { Chip } from '@nextui-org/chip'
import { FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface SubscriptionCardProps {
  title: string
  price: string
  features: string[]
  expiry: string
  recommended?: boolean
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  features,
  expiry,
  recommended = false
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      className='w-full max-w-xs'>
      {' '}
      {/* Add a consistent max width here */}
      <Card
        className={`w-full ${recommended ? 'border-primary border-2' : ''}`}
        shadow='lg'>
        <CardHeader className='flex flex-col items-center pb-0 pt-2 px-4'>
          <h2 className='text-2xl font-bold text-primary'>{title}</h2>
          {recommended && (
            <Chip color='primary' variant='flat' className='mt-2'>
              Recommended
            </Chip>
          )}
        </CardHeader>
        <CardBody className='overflow-visible py-2'>
          <div className='flex justify-center items-baseline my-8'>
            <span className='text-5xl font-extrabold'>${price}</span>
            <span className='text-xl text-default-500 ml-1'>/{expiry}</span>
          </div>
          <ul className='space-y-4 mb-6'>
            {features.map((feature, index) => (
              <motion.li
                key={index}
                className='flex items-center space-x-3'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}>
                <FaCheck className='text-primary' />
                <span className='break-words'> {feature}</span>
              </motion.li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className='pt-0'>
          <Button color='primary' size='lg' className='w-full'>
            {price === '0' ? 'Current Plan' : 'Subscribe Now'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default SubscriptionCard

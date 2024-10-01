'use client'

import { IInput } from '@/src/types'
import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { IoMdEyeOff } from 'react-icons/io'
import { BsEyeFill } from "react-icons/bs";

interface IProps extends IInput {}

const TPasswordInput = ({
  variant = 'bordered',
  size = 'md',
  placeholder,
  isRequired = false,
  type = 'text',
  label,
  name
}: IProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name].message as string) : ''}
      {...register(name)}
      variant={variant}
      size={size}
      placeholder={placeholder}
      isRequired={isRequired}
      endContent={
        <button
          className='focus:outline-none'
          type='button'
          onClick={toggleVisibility}
          aria-label='toggle password visibility'>
          {isVisible ? (
            <IoMdEyeOff className='text-2xl text-default-400 pointer-events-none' />
          ) : (
            <BsEyeFill className='text-2xl text-default-400 pointer-events-none' />
          )}
        </button>
      }
      type={isVisible ? 'text' : type}
      label={label}
    />
  )
}

export default TPasswordInput

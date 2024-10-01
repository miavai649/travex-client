'use client'

import { IInput } from '@/src/types'
import { Input } from '@nextui-org/input'
import { useFormContext } from 'react-hook-form'

interface IProps extends IInput {}

const TInput = ({
  variant = 'bordered',
  size = 'md',
  isRequired = false,
  type = 'text',
  label,
  name
}: IProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name].message as string) : ''}
      {...register(name)}
      variant={variant}
      size={size}
      isRequired={isRequired}
      type={type}
      label={label}
    />
  )
}

export default TInput

'use client'

import { Input } from '@nextui-org/input'
import { useFormContext } from 'react-hook-form'

import { IInput } from '@/src/types'

interface IProps extends IInput {}

const TInput = ({
  variant = 'bordered',
  size = 'md',
  isRequired = false,
  placeholder,
  type = 'text',
  label,
  name,
  isReadOnly,
  isDisabled
}: IProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Input
      errorMessage={(errors[name]?.message as string) ?? ''}
      isInvalid={!!errors[name]}
      {...register(name)}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isRequired={isRequired}
      label={label}
      placeholder={placeholder}
      size={size}
      type={type}
      variant={variant}
    />
  )
}

export default TInput

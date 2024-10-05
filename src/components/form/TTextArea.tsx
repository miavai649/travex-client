import { IInput } from '@/src/types'
import { Textarea } from '@nextui-org/input'
import { useFormContext } from 'react-hook-form'

interface IProps extends IInput {}

const TTextarea = ({ label, name, variant = 'bordered' }: IProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <Textarea
      label={label}
      {...register(name)}
      isInvalid={!!errors[name]}
      errorMessage={errors[name] ? (errors[name].message as string) : ''}
      maxRows={6}
      variant={variant}
    />
  )
}

export default TTextarea

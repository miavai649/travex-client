'use client'
import { DatePicker } from '@nextui-org/date-picker'
import { Controller } from 'react-hook-form'

import { IInput } from '@/src/types'
import { Checkbox } from '@nextui-org/checkbox'

interface IProps extends IInput {}

const TCheckbox = ({ label, name }: IProps) => {
  return (
    <Controller
      name={name}
      render={({ field: { value, ...fields } }) => (
        <Checkbox {...fields} radius='full' value='premium'>
          <span className='text-sm'>{label}</span>
        </Checkbox>
      )}
    />
  )
}

export default TCheckbox

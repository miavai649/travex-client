'use client'
import { ReactNode } from 'react'
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm
} from 'react-hook-form'

interface IFormConfig {
  defaultValues?: Record<string, any>
  resolver?: any
}

interface IProps extends IFormConfig {
  onSubmit: SubmitHandler<any>
  children: ReactNode
}

const TForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
  const formConfig: IFormConfig = {}

  if (!!defaultValues) {
    formConfig['defaultValues'] = defaultValues
  }

  if (!!resolver) {
    formConfig['resolver'] = resolver
  }

  const methods = useForm(formConfig)

  const submitHandler = methods.handleSubmit

  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data)
    methods.reset()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler(submit)}>{children}</form>
    </FormProvider>
  )
}

export default TForm

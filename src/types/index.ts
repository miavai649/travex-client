import { SVGProps } from 'react'

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number
}

export interface IInput {
  variant?: 'flat' | 'bordered' | 'faded' | 'underlined'
  size?: 'sm' | 'md' | 'lg'
  required?: boolean
  type?: string
  placeholder?: string
  label: string
  name: string
  isRequired?: boolean
  disabled?: boolean
}

export type TError = {
  data: {
    message: string
    stack: string
    success: boolean
  }
  status: number
}

export type TResponse<T> = {
  data?: T
  error?: TError
  success: boolean
  message: string
}
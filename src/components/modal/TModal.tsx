'use client'
import { Button } from '@nextui-org/button'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from '@nextui-org/modal'
import { ReactNode } from 'react'
import { IoAddCircleOutline } from 'react-icons/io5'

type TSize =
  | 'xs'
  | 'sm'
  | 'md'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | 'full'

interface IProps {
  buttonText: string
  title: string
  children: ReactNode
  buttonVariant?:
    | 'light'
    | 'solid'
    | 'bordered'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost'
    | undefined
  buttonClassName?: string
  icon?: ReactNode
  size?: TSize
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger" 
}

export default function TModal({
  buttonText,
  title,
  children,
  size = 'md',
  color,
  buttonVariant = 'light',
  buttonClassName,
  icon
}: IProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button
        color={color}
        startContent={icon}
        variant={buttonVariant}
        className={buttonClassName}
        onPress={onOpen}>
        {buttonText}
      </Button>
      <Modal
        isOpen={isOpen}
        size={size}
        onOpenChange={onOpenChange}
        placement='center'
        backdrop={'blur'}
        scrollBehavior={'inside'}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{title}</ModalHeader>
              <ModalBody>{children}</ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

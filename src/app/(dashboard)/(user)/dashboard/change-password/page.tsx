'use client'
import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TPasswordInput from '@/src/components/form/TPasswordInput'
import Container from '@/src/components/ui/Container'
import { useChangePasswordMutation } from '@/src/redux/features/auth/authApi'
import { logout } from '@/src/redux/features/auth/authSlice'
import { useAppDispatch } from '@/src/redux/hook'
import { changePasswordValidationSchema } from '@/src/schemas/auth.schema'
import { TResponse } from '@/src/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { Spinner } from '@nextui-org/spinner'

const ChangePasswordPage = () => {
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation()

  const dispatch = useAppDispatch()

  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const passwordData = {
      ...data
    }

    try {
      const res = (await changePassword(passwordData)) as TResponse<any>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000
        })
      } else {
        toast.success('Password changed successfully', {
          duration: 2000
        })

        dispatch(logout())

        router.push('/login')
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    }
  }

  return (
    <Container>
      <div className='w-full max-w-xl mx-auto py-10'>
        <h1 className='text-3xl font-bold mb-4'>Change Password</h1>
        <p className='text-gray-500 mb-6'>
          Please enter your old password and choose a new one.
        </p>

        <TForm
          onSubmit={onSubmit}
          resolver={zodResolver(changePasswordValidationSchema)}>
          <div className='py-3'>
            <TPasswordInput
              name='oldPassword'
              label='Old Password'
              type='password'
            />
          </div>

          <div className='py-3'>
            <TPasswordInput
              name='newPassword'
              label='New Password'
              type='password'
            />
          </div>

          <div className='py-3'>
            <TPasswordInput
              name='confirmPassword'
              label='Confirm Password'
              type='password'
            />
          </div>

          <Button
            isLoading={changePasswordLoading}
            spinner={<Spinner size='sm' color='current' />}
            className='w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105 '
            size='lg'
            type='submit'>
            Change Password
          </Button>
        </TForm>
      </div>
    </Container>
  )
}

export default ChangePasswordPage

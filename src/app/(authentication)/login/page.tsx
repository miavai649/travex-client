'use client'

import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TPasswordInput from '@/src/components/form/TPasswordInput'
import Loading from '@/src/components/ui/Loading'
import { ThemeSwitch } from '@/src/components/ui/theme-switch'
import { useLoginMutation } from '@/src/redux/features/auth/authApi'
import { setUser } from '@/src/redux/features/auth/authSlice'
import { useAppDispatch } from '@/src/redux/hook'
import { TResponse } from '@/src/types'
import { verifyToken } from '@/src/utils/verifyToken'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginValidationSchema } from '@/src/schemas/auth.schema'

const page = () => {
  const [loginUser, { isLoading }] = useLoginMutation({})
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await loginUser(data)) as TResponse<any>

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000
      })
    } else {
      toast.success(res.data.message, {
        duration: 2000
      })

      const token = res.data?.data?.accessToken
      const decoded = await verifyToken(token)

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded
        })
      )

      router.push('/')
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <div className='flex h-screen w-full items-center justify-center'>
        <div className='relative flex w-full max-w-md flex-col items-center justify-center rounded-lg border px-8 py-6 bg-default-100 border-default-200 transition-transform duration-500 transform opacity-100'>
          {/* theme toggle switch */}
          <div className='absolute top-4 right-4'>
            <ThemeSwitch />
          </div>

          <h3 className='text-3xl font-bold text-blue-600 mb-2'>
            Login to Travex
          </h3>
          <p className='text-lg text-gray-600 mb-6'>
            Welcome Back! Let's Get Started
          </p>

          {/* login form */}
          <div className='w-full'>
            <TForm
              onSubmit={onSubmit}
              resolver={zodResolver(loginValidationSchema)}>
              <div className='py-3'>
                <TInput
                  name='email'
                  placeholder='Enter your email'
                  label='Email'
                  type='email'
                />
              </div>

              <div className='py-3'>
                <TPasswordInput
                  name='password'
                  placeholder='Enter your password'
                  label='Password'
                  type='password'
                />
              </div>

              <Button
                className='w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105 hover:bg-blue-700'
                size='lg'
                type='submit'>
                Login
              </Button>
            </TForm>

            <div className='mt-4 text-center text-gray-500'>
              Don’t have an account?{' '}
              <Link
                href={'/register'}
                className='text-blue-600 transition duration-300 hover:underline hover:text-blue-700'>
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

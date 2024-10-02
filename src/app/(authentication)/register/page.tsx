'use client'
import { TravexLogo } from '@/src/assets/icons'
import TDatePicker from '@/src/components/form/TDatePicker'
import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TPasswordInput from '@/src/components/form/TPasswordInput'
import TSelect from '@/src/components/form/TSelect'
import Loading from '@/src/components/ui/Loading'
import { ThemeSwitch } from '@/src/components/ui/theme-switch'
import { useRegisterMutation } from '@/src/redux/features/auth/authApi'
import { setUser } from '@/src/redux/features/auth/authSlice'
import { useAppDispatch } from '@/src/redux/hook'
import { registerValidationSchema } from '@/src/schemas/auth.schema'
import { TResponse } from '@/src/types'
import dateToIso from '@/src/utils/dateToIso'
import { verifyToken } from '@/src/utils/verifyToken'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'

const genderOptions = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'other', label: 'Other' }
]

const page = () => {
  const [registerUser, { isLoading }] = useRegisterMutation()
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      birthDate: dateToIso(data.birthDate),
      mobileNumber: data.mobileNumber
    }
    try {
      const res = (await registerUser(userData)) as TResponse<any>

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
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    }
  }

  return (
    <div>
      {isLoading && <Loading />}
      <div className='flex min-h-screen w-full items-center justify-center p-6'>
        <div className='relative flex w-full max-w-xl flex-col items-center justify-center rounded-lg border px-8 py-10 bg-default-100 border-default-200 shadow-lg'>
          {/* theme toggle switch */}
          <div className='absolute top-4 right-4'>
            <ThemeSwitch />
          </div>

          {/* logo and heading section */}
          <div className='flex flex-col items-center justify-center mb-6'>
            <TravexLogo className='w-16 h-16 mb-4' />
            <h3 className='text-3xl font-bold text-blue-600 text-center mb-2'>
              Join Travex Today!
            </h3>
            <p className='text-lg text-gray-600 text-center'>
              Start your adventure with us. Sign up now and unlock exclusive
              benefits!
            </p>
          </div>

          {/* register Form */}
          <div className='w-full'>
            <TForm
              onSubmit={onSubmit}
              resolver={zodResolver(registerValidationSchema)}>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                <div className='py-2'>
                  <TInput name='name' label='Name' type='text' />
                </div>
                <div className='py-2'>
                  <TSelect
                    name='gender'
                    options={genderOptions}
                    label='Gender'
                    placeholder='Select your gender'
                  />
                </div>
                <div className='py-2'>
                  <TInput name='email' label='Email' type='email' />
                </div>
                <div className='py-2'>
                  <TInput
                    name='mobileNumber'
                    label='Mobile Number'
                    type='text'
                  />
                </div>
                <div className='py-2'>
                  <TDatePicker name='birthDate' label='Birth date' />
                </div>
                <div className='py-2'>
                  <TPasswordInput
                    name='password'
                    label='Password'
                    type='password'
                  />
                </div>
                <div className='py-2'>
                  <TPasswordInput
                    name='confirmPassword'
                    label='Confirm Password'
                    type='password'
                  />
                </div>
              </div>

              <Button
                className='w-full py-2 mt-6 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105'
                size='lg'
                type='submit'>
                Register
              </Button>
            </TForm>

            <div className='mt-4 text-center text-gray-500'>
              Already have an account?{' '}
              <Link
                href={'/login'}
                className='text-blue-600 transition duration-300 hover:underline hover:text-blue-700'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page

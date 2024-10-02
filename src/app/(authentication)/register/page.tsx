'use client'
import TDatePicker from '@/src/components/form/TDatePicker'
import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TPasswordInput from '@/src/components/form/TPasswordInput'
import TSelect from '@/src/components/form/TSelect'
import { ThemeSwitch } from '@/src/components/ui/theme-switch'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const genderOptions = [
  { key: 'Male', label: 'male' },
  { key: 'Female', label: 'female' },
  { key: 'Other', label: 'other' }
]

const page = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <div className='relative flex w-full max-w-md flex-col items-center justify-center rounded-lg border px-8 py-6 bg-default-100 border-default-200 transition-transform duration-500 transform opacity-100'>
        {/* theme toggle switch */}
        <div className='absolute top-4 right-4'>
          <ThemeSwitch />
        </div>

        <h3 className='text-3xl font-bold text-blue-600 mb-2'>
          Register with Travex
        </h3>
        <p className='text-lg text-gray-600 mb-6'>
          Welcome Back! Let's Get Started
        </p>

        {/* register form */}
        <div className='w-full'>
          <TForm
            onSubmit={onSubmit}
            // resolver={zodResolver(loginValidationSchema)}
          >
            {/* <div className='grid grid-cols-2 gap-2'> */}
            <div className='py-3'>
              <TInput name='name' label='Name' type='text' />
            </div>
            <div className='py-3'>
              <TSelect
                name='gender'
                options={genderOptions}
                label='Gender'
                placeholder='Select your gender'
              />
            </div>
            <div className='py-3'>
              <TInput name='email' label='Email' type='email' />
            </div>

            <div className='py-3'>
              <TInput name='mobileNumber' label='Mobile Number' type='text' />
            </div>

            <div className='py-3'>
              <TDatePicker name='birthDate' label='Birth date' />
            </div>

            <div className='py-3'>
              <TPasswordInput
                name='password'
                label='Password'
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
            {/* </div> */}

            <Button
              className='w-full py-2 mt-4 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105 '
              size='lg'
              type='submit'>
              Login
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
  )
}

export default page

'use client'
import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TPasswordInput from '@/src/components/form/TPasswordInput'
import Container from '@/src/components/ui/Container'
import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'

const ChangePasswordPage = () => {
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // Process the password change here
    console.log('Password Change Data:', data)
    // Implement the API call to change the password
  }

  return (
    <Container>
      {/* Removed the center alignment */}
      <div className='w-full max-w-xl mx-auto py-10'>
        {/* Heading and description for the password change form */}
        <h1 className='text-3xl font-bold mb-4'>Change Password</h1>
        <p className='text-gray-500 mb-6'>
          Please enter your old password and choose a new one.
        </p>

        <TForm
          onSubmit={onSubmit}
          // resolver={zodResolver(changePasswordValidationSchema)}
        >
          {/* Old password input */}
          <div className='py-3'>
            <TPasswordInput
              name='oldPassword'
              label='Old Password'
              type='password'
            />
          </div>

          {/* New password input */}
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

          {/* Submit button */}
          <Button
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

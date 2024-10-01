'use client'

import TForm from "@/src/components/form/TForm"
import TInput from "@/src/components/form/TInput"
import TPasswordInput from "@/src/components/form/TPasswordInput"
import { ThemeSwitch } from "@/src/components/ui/theme-switch"
import { Button } from "@nextui-org/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FieldValues, SubmitHandler } from "react-hook-form"


const page = () => {
  // const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin()
  const router = useRouter()

  // const { setIsLoading: userLoading } = useUser()

  // const searchParams = useSearchParams()

  // const redirect = searchParams.get('redirect')

  // if (!isPending && isSuccess) {
  //   if (redirect) {
  //     router.push(redirect)
  //   } else {
  //     router.push('/')
  //   }
  // }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // await handleUserLogin(data)
    // userLoading(true)
    console.log(data);
  }

  return (
    <div className='flex h-screen w-full items-center justify-center'>
      {/* {isPending && <Loading />} */}
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
          <TForm onSubmit={onSubmit}>
            <div className='py-3'>
              <TInput name='email' placeholder="Enter your email" label='Email' type='email' />
            </div>

            <div className='py-3'>
              <TPasswordInput
                name='password'
                placeholder="Enter your password"
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
  )
}

export default page

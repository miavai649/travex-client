'use client'

import { useState, ChangeEvent } from 'react'
import TForm from '@/src/components/form/TForm'
import TInput from '@/src/components/form/TInput'
import TSelect from '@/src/components/form/TSelect'
import TTextarea from '@/src/components/form/TTextArea'
import Container from '@/src/components/ui/Container'
import { Button } from '@nextui-org/button'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import {
  useGetCurrentUserQuery,
  useUpdateUserMutation
} from '@/src/redux/features/auth/authApi'
import Loading from '@/src/components/ui/Loading'
import { TResponse, TUser } from '@/src/types'
import { toast } from 'sonner'
import { Spinner } from '@nextui-org/spinner'
import { zodResolver } from '@hookform/resolvers/zod'
import { userUpdateValidationSchema } from '@/src/schemas/auth.schema'

const genderOptions = [
  { key: 'male', label: 'Male' },
  { key: 'female', label: 'Female' },
  { key: 'other', label: 'Other' }
]

const EditProfilePage = () => {
  const [imageFile, setImageFile] = useState<File | ''>('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [updateUser, { isLoading: updateUserLoading }] = useUpdateUserMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()

    const userData = {
      ...data
    }

    formData.append('userData', JSON.stringify(userData))

    formData.append('profileImage', imageFile)
    try {
      const res = (await updateUser(formData)) as TResponse<TUser>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000
        })
      } else {
        toast.success('User updated successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    }
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      setImageFile(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const { data: currentUserData, isLoading: currentUserLoading } =
    useGetCurrentUserQuery({})

  const userData = currentUserData?.data

  const userDefaultValues = {
    name: userData?.name || '',
    email: userData?.email || '',
    gender: userData?.gender || '',
    bio: userData?.bio || '',
    mobileNumber: userData?.mobileNumber || '',
    birthDate: userData?.birthDate || '',
    address: userData?.address || ''
  }

  return (
    <Container>
      {currentUserLoading ? (
        <Loading />
      ) : (
        <Card className='w-full max-w-3xl mx-auto'>
          <CardHeader className='flex flex-col items-center pb-0 pt-6 px-4'>
            <h1 className='text-2xl font-bold mb-4'>Edit Profile</h1>
            <div className='relative mb-6'>
              <div className='w-32 h-32 rounded-full overflow-hidden bg-gray-200'>
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <img
                    src={currentUserData?.data?.profileImage}
                    alt='Profile'
                    className='w-full h-full object-cover'
                  />
                )}
              </div>
              <label
                htmlFor='profile-image'
                className='absolute bottom-0 right-0 bg-primary text-white rounded-full p-2 cursor-pointer'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  className='w-5 h-5'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              </label>
              <input
                type='file'
                id='profile-image'
                className='hidden'
                accept='image/*'
                onChange={handleImageChange}
              />
            </div>
          </CardHeader>
          <CardBody className='px-4 py-6'>
            <TForm
              onSubmit={onSubmit}
              defaultValues={userDefaultValues}
              resetOnSubmit={false}
              resolver={zodResolver(userUpdateValidationSchema)}>
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
                  <TInput
                    name='email'
                    isDisabled={true}
                    label="Email (Can't be changed)"
                    type='email'
                  />
                </div>
                <div className='py-2'>
                  <TInput
                    name='mobileNumber'
                    label='Mobile Number'
                    type='text'
                  />
                </div>
                <div className='py-2'>
                  <TInput
                    name='birthDate'
                    isDisabled={true}
                    label="Birth date (Can't be changed)"
                    type='text'
                  />
                </div>
                <div className='py-2'>
                  <TInput name='address' label='Address' type='text' />
                </div>
                <div className='py-2 sm:col-span-2'>
                  <TTextarea name='bio' label='Bio' />
                </div>
              </div>

              <div className='w-full flex justify-center'>
                <Button
                  isLoading={updateUserLoading}
                  spinner={<Spinner size='sm' color='default' />}
                  className='w-2/5  py-2 mt-6 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 transform hover:scale-105'
                  size='lg'
                  type='submit'>
                  Update
                </Button>
              </div>
            </TForm>
          </CardBody>
        </Card>
      )}
    </Container>
  )
}

export default EditProfilePage

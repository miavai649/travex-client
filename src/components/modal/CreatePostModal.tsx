'use client'

import { IoAddCircleOutline } from 'react-icons/io5'
import TModal from './TModal'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import TForm from '../form/TForm'
import TInput from '../form/TInput'
import TTextarea from '../form/TTextArea'
import TSelect from '../form/TSelect'
import { Button } from '@nextui-org/button'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '@nextui-org/checkbox'
import { FaImage, FaTrash } from 'react-icons/fa'
import { Divider } from '@nextui-org/divider'

const postCategoriesOptions = [
  { key: 'Adventure', label: 'Adventure' },
  { key: 'Business Travel', label: 'Business Travel' },
  { key: 'Exploration', label: 'Exploration' },
  { key: 'Budget Travel', label: 'Budget Travel' },
  { key: 'Luxury Travel', label: 'Luxury Travel' },
  { key: 'Solo Travel', label: 'Solo Travel' },
  { key: 'Family Travel', label: 'Family Travel' },
  { key: 'Road Trips', label: 'Road Trips' }
]

const CreatePostModal = () => {
  const [isPremium, setIsPremium] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([])

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:', data)
    // Implement your form submission logic here
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newFiles = Array.from(files)
      setImageFiles((prev) => [...prev, ...newFiles])

      newFiles.forEach((file) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreviews((prev) => [...prev, reader.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index))
    setImagePreviews((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <TModal
      size='3xl'
      color={'primary'}
      buttonText='Create Post'
      icon={<IoAddCircleOutline fontSize={'1.5rem'} />}
      title='Create a new Post'
      buttonVariant='solid'>
      <TForm onSubmit={onSubmit} resetOnSubmit={false}>
        <div className='space-y-6'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='sm:col-span-2'>
              <TInput name='title' label='Title' type='text' />
            </div>
            <div>
              <TSelect
                name='category'
                options={postCategoriesOptions}
                label='Category'
                placeholder='Select your post category'
              />
            </div>
            <div className='flex items-center'>
              <Checkbox
                radius='full'
                value='premium'
                isSelected={isPremium}
                onValueChange={setIsPremium}>
                <span className='text-sm'>
                  Available for premium users only
                </span>
              </Checkbox>
            </div>
          </div>

          <div>
            <TTextarea name='description' label='Short Description' />
          </div>

          <Divider className='my-4' />

          <div>
            <label className='block text-sm font-medium text-default-700 mb-2'>
              Upload Thumbnail
            </label>
            <div className='flex items-center justify-center w-full'>
              <label
                className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-default-100 border-default-300 hover:bg-default-200 transition-colors duration-300'
                htmlFor='image'>
                <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                  <FaImage className='w-8 h-8 mb-3 text-default-500' />
                  <p className='mb-2 text-sm text-default-500'>
                    <span className='font-semibold'>Click to upload</span> or
                    drag and drop
                  </p>
                  <p className='text-xs text-default-400'>
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
                <input
                  multiple
                  className='hidden'
                  id='image'
                  type='file'
                  onChange={handleImageChange}
                  accept='image/*'
                />
              </label>
            </div>
          </div>

          {imagePreviews.length > 0 && (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
              {imagePreviews.map((imageDataUrl, index) => (
                <div key={index} className='relative group'>
                  <img
                    src={imageDataUrl}
                    alt={`Preview ${index + 1}`}
                    className='w-full h-32 object-cover rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => removeImage(index)}
                    className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <FaTrash size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className='flex justify-center mt-6'>
            <Button
              className='w-full sm:w-2/3 md:w-1/2 py-2 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700'
              size='lg'
              type='submit'>
              Create Post
            </Button>
          </div>
        </div>
      </TForm>
    </TModal>
  )
}

export default CreatePostModal

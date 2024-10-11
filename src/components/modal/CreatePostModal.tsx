'use client'

import { IoAddCircleOutline } from 'react-icons/io5'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { Button } from '@nextui-org/button'
import { ChangeEvent, useState } from 'react'
import { Checkbox } from '@nextui-org/checkbox'
import { FaImage, FaTrash } from 'react-icons/fa'
import { Divider } from '@nextui-org/divider'
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'
import { toast } from 'sonner'

import TSelect from '../form/TSelect'
import TTextarea from '../form/TTextArea'
import TInput from '../form/TInput'
import TForm from '../form/TForm'
import { Spinner } from '@nextui-org/spinner'

import { IPost } from '@/src/types/post.type'
import { TResponse } from '@/src/types'
import { useAddPostMutation } from '@/src/redux/features/post/postApi'
import uploadImageToCloudinary from '@/src/utils/uploadImageToCloudinary'
import { useGetCurrentUserQuery } from '@/src/redux/features/auth/authApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal'
import { postValidationSchema } from '@/src/schemas/post.schema'

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
})

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' }
      ],
      ['link', 'image'],
      ['clean']
    ],
    handlers: {
      image: function () {
        const input = document.createElement('input')

        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()

        input.onchange = async () => {
          const file = input?.files?.[0]

          if (file) {
            const toastId = toast.loading('Image uploading', { duration: 2000 })
            if (file.size > 10485760) {
              return toast.warning(
                'File size exceeds 10 MB limit. Please select a smaller file.'
              )
            }
            const url = await uploadImageToCloudinary(file)

            if (url) {
              toast.success('Image uploaded successfully', {
                duration: 2000,
                id: toastId
              })
              const quill = (this as any).quill
              const range = quill.getSelection()

              if (range) {
                quill.insertEmbed(range.index, 'image', url)
              }
            } else {
              toast.error('Failed to upload image to Cloudinary')
            }
          }
        }
      }
    }
  }
}

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
]

export const postCategoriesOptions = [
  { key: 'Adventure', label: 'Adventure' },
  { key: 'Business Travel', label: 'Business Travel' },
  { key: 'Exploration', label: 'Exploration' },
  { key: 'Budget Travel', label: 'Budget Travel' },
  { key: 'Luxury Travel', label: 'Luxury Travel' },
  { key: 'Solo Travel', label: 'Solo Travel' },
  { key: 'Family Travel', label: 'Family Travel' },
  { key: 'Road Trips', label: 'Road Trips' }
]

interface IProps {
  isOpen: boolean
  onClose: () => void
}

const CreatePostModal = ({ isOpen, onClose }: IProps) => {
  const [isPremiumContent, setIsPremiumContent] = useState<boolean>(false)
  const [imageFiles, setImageFiles] = useState<File[] | []>([])
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([])
  const [value, setValue] = useState('')

  const { data: currentUserData } = useGetCurrentUserQuery({})

  const [handleAddPost, { isLoading: handleAddPostLoading }] =
    useAddPostMutation()

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData()

    const postData = {
      ...data,
      content: value,
      author: currentUserData?.data?._id,
      isPremium: isPremiumContent
    }

    formData.append('postData', JSON.stringify(postData))

    for (const image of imageFiles) {
      formData.append('postImages', image)
    }

    try {
      const res = (await handleAddPost(formData)) as TResponse<IPost>

      if (res.error) {
        toast.error(res.error.data.message, {
          duration: 2000
        })
      } else {
        toast.success('Post created successfully', {
          duration: 2000
        })
      }
    } catch (error) {
      toast.error('Something went wrong', { duration: 2000 })
    } finally {
      onClose()
    }
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
    <Modal
      backdrop={'blur'}
      classNames={{
        base: 'bg-background',
        header: 'border-b border-divider',
        footer: 'border-t border-divider',
        closeButton: 'hover:bg-default-100 active:bg-default-200'
      }}
      isOpen={isOpen}
      scrollBehavior='inside'
      size='3xl'
      placement='center'
      onOpenChange={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              <h2 className='text-xl font-bold'>Edit Comment</h2>
            </ModalHeader>
            <ModalBody className='my-8'>
              <TForm
                resetOnSubmit={true}
                onSubmit={onSubmit}
                resolver={zodResolver(postValidationSchema)}>
                <div className='space-y-6'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='sm:col-span-2'>
                      <TInput label='Title' name='title' type='text' />
                    </div>
                    <div>
                      <TSelect
                        label='Category'
                        name='category'
                        options={postCategoriesOptions}
                        placeholder='Select your post category'
                      />
                    </div>
                    <div>
                      <TInput label='Location' name='location' type='text' />
                    </div>
                    {currentUserData?.data?.isVerified && (
                      <div className='sm:col-span-2 flex items-center'>
                        <Checkbox
                          isSelected={isPremiumContent}
                          radius='full'
                          value='premium'
                          onValueChange={setIsPremiumContent}>
                          <span className='text-sm'>
                            Make this post premium content
                          </span>
                        </Checkbox>
                      </div>
                    )}
                  </div>

                  <div>
                    <TTextarea label='Short Description' name='description' />
                  </div>

                  <Divider className='my-4' />

                  <div>
                    <label
                      className='block text-sm font-medium text-default-700 mb-2'
                      htmlFor='image'>
                      Upload Thumbnail
                    </label>
                    <div className='flex items-center justify-center w-full'>
                      <label
                        className='flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-default-100 border-default-300 hover:bg-default-200 transition-colors duration-300'
                        htmlFor='image' // This associates with the input
                      >
                        <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                          <FaImage className='w-8 h-8 mb-3 text-default-500' />
                          <p className='mb-2 text-sm text-default-500'>
                            <span className='font-semibold'>
                              Click to upload
                            </span>{' '}
                            or drag and drop
                          </p>
                          <p className='text-xs text-default-400'>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </label>
                      <input
                        multiple
                        accept='image/*'
                        className='hidden'
                        id='image'
                        type='file'
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4'>
                      {imagePreviews.map((imageDataUrl, index) => (
                        <div key={index} className='relative group'>
                          <img
                            alt={`Preview ${index + 1}`}
                            className='w-full h-32 object-cover rounded-lg'
                            src={imageDataUrl}
                          />
                          <button
                            className='absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'
                            type='button'
                            onClick={() => removeImage(index)}>
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <ReactQuill
                    className='mt-3'
                    formats={formats}
                    modules={modules}
                    theme='snow'
                    value={value}
                    onChange={setValue}
                  />

                  <div className='flex justify-center mt-6'>
                    <Button
                      className='w-full sm:w-2/3 md:w-1/2 py-2 rounded-lg bg-blue-600 text-white font-semibold transition duration-300 hover:bg-blue-700 mb-6'
                      size='lg'
                      isLoading={handleAddPostLoading}
                      spinner={<Spinner color='current' size='sm' />}
                      type='submit'>
                      Create Post
                    </Button>
                  </div>
                </div>
              </TForm>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CreatePostModal

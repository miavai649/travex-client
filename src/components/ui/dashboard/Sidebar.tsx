'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import {
  IoHomeOutline,
  IoLogOutOutline,
  IoKeyOutline,
  IoClose
} from 'react-icons/io5'
import { CiGrid42 } from 'react-icons/ci'
import { FaRegHeart } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { RiEditLine } from 'react-icons/ri'
import { Menu } from 'lucide-react'

import { ThemeSwitch } from '../theme-switch'
import { TravexLogo } from '@/src/assets/icons'
import { useAppDispatch } from '@/src/redux/hook'
import { logout } from '@/src/redux/features/auth/authSlice'

const links = [
  { item: 'Profile', icon: CgProfile, link: '/dashboard/profile' },
  { item: 'My Content', icon: CiGrid42, link: '/dashboard/my-content' },
  { item: 'Favourites', icon: FaRegHeart, link: '/dashboard/favourites' },
  { item: 'Edit Profile', icon: RiEditLine, link: '/dashboard/edit-profile' },
  {
    item: 'Change Password',
    icon: IoKeyOutline,
    link: '/dashboard/change-password'
  },
  { item: 'Home', icon: IoHomeOutline, link: '/' }
]

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const toggleSidebar = () => setIsOpen(!isOpen)
  const closeSidebar = () => setIsOpen(false)

  const handleLogout = () => {
    dispatch(logout())
    router.push('/')
  }

  return (
    <>
      <Button
        isIconOnly
        className='lg:hidden fixed top-4 left-4 z-40'
        size='lg'
        variant='flat'
        onPress={toggleSidebar}>
        <Menu size={24} />
      </Button>

      {isOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-30 lg:hidden'
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-screen md:w-72 bg-background border-r z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className='flex flex-col h-[100vh]'>
          <div className='p-4'>
            <div className='flex items-center justify-between'>
              <Link className='flex items-center space-x-2' href='/'>
                <TravexLogo />
                <span className='text-xl font-semibold'>Travex</span>
              </Link>
              <Button
                isIconOnly
                className='lg:hidden'
                variant='light'
                onPress={closeSidebar}>
                <IoClose size={24} />
              </Button>
            </div>
          </div>

          <Divider />

          <nav className='flex-grow overflow-y-auto p-4 space-y-2'>
            {links.map((item) => (
              <Link key={item.link} href={item.link} onClick={closeSidebar}>
                <Button
                  className={`w-full justify-start ${
                    item.link === pathname ? 'bg-primary/10 text-primary' : ''
                  }`}
                  startContent={<item.icon size={20} />}
                  variant={item.link === pathname ? 'flat' : 'light'}>
                  {item.item}
                </Button>
              </Link>
            ))}
          </nav>

          <div className='mt-auto p-4 space-y-4'>
            <Divider />
            <div className='flex items-center justify-between'>
              <span className='text-sm font-medium'>Theme</span>
              <ThemeSwitch />
            </div>
            <Button
              className='w-full justify-start text-danger'
              color='danger'
              startContent={<IoLogOutOutline size={20} />}
              variant='flat'
              onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}

export default Sidebar

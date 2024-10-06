import { Card, CardBody, CardHeader } from '@nextui-org/card'

import { Button } from '@nextui-org/button'
import { Divider } from '@nextui-org/divider'
import {
  FaGlobe,
  FaUsers,
  FaLightbulb,
  FaMapMarkedAlt,
  FaComments
} from 'react-icons/fa'
import { MdExplore } from 'react-icons/md'
import { AboutUsBanner } from '@/src/assets'
import Image from 'next/image'

const page = () => {
  return (
    <div className='container mx-auto px-4 py-12 space-y-16'>
      <section className='text-center space-y-4'>
        <h1 className='text-5xl font-bold text-primary'>About Travex</h1>
        <p className='text-xl text-default-600 max-w-3xl mx-auto'>
          Empowering travelers to share experiences, discover new destinations,
          and create unforgettable memories.
        </p>
      </section>

      <Card className='bg-default-50 shadow-lg'>
        <CardBody className='p-0 overflow-hidden'>
          <div className='flex flex-col md:flex-row items-center'>
            <div className='md:w-1/2'>
              <Image
                alt='Travex team'
                className='object-cover w-full h-full'
                src={AboutUsBanner}
                width={800}
                height={600}
              />
            </div>
            <div className='md:w-1/2 p-8 space-y-6'>
              <h2 className='text-3xl font-semibold text-primary'>
                Our Mission
              </h2>
              <p className='text-default-700 text-lg'>
                At Travex, we're passionate about connecting travel enthusiasts
                from around the world. Our platform is designed to inspire,
                inform, and empower travelers to explore the globe with
                confidence and curiosity.
              </p>
              <Button color='primary' size='lg' radius='full'>
                Join Our Community
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      <section className='space-y-8'>
        <h2 className='text-3xl font-semibold text-primary text-center'>
          Why Choose Travex?
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              icon: FaGlobe,
              title: 'Global Reach',
              description:
                'Connect with travelers from every corner of the world and gain insights into diverse cultures and destinations.'
            },
            {
              icon: FaUsers,
              title: 'Community-Driven',
              description:
                'Share your experiences, learn from others, and be part of a supportive community of like-minded adventurers.'
            },
            {
              icon: FaLightbulb,
              title: 'Inspiring Content',
              description:
                'Discover hidden gems, expert tips, and breathtaking stories that will fuel your wanderlust and enhance your travels.'
            },
            {
              icon: FaMapMarkedAlt,
              title: 'Personalized Recommendations',
              description:
                'Get tailored travel suggestions based on your interests and past experiences.'
            },
            {
              icon: FaComments,
              title: 'Interactive Discussions',
              description:
                'Engage in lively conversations with fellow travelers and get real-time advice for your trips.'
            },
            {
              icon: MdExplore,
              title: 'Diverse Experiences',
              description:
                'From budget backpacking to luxury retreats, explore a wide range of travel styles and options.'
            }
          ].map((feature, index) => (
            <Card
              key={index}
              className='bg-default-100 hover:bg-default-200 transition-colors duration-300'>
              <CardBody className='items-center text-center p-6 space-y-4'>
                <feature.icon className='text-primary text-5xl' />
                <h3 className='text-2xl font-semibold'>{feature.title}</h3>
                <p className='text-default-700'>{feature.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>

      <Divider className='my-12' />

      <section className='text-center space-y-8'>
        <h2 className='text-3xl font-semibold text-primary'>
          Join Us on the Journey
        </h2>
        <p className='text-default-700 text-lg max-w-3xl mx-auto'>
          Whether you're a seasoned globetrotter or planning your first
          adventure, Travex is here to support and inspire you every step of the
          way. Join our community today and start sharing your travel stories!
        </p>
        <Button color='primary' size='lg' radius='full'>
          Get Started Now
        </Button>
      </section>
    </div>
  )
}

export default page

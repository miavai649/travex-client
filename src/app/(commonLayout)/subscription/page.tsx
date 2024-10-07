import SubscriptionCard from '@/src/components/ui/SubscriptionCard'
import Container from '@/src/components/ui/Container'

const subscriptionPlans = [
  {
    title: 'Free Plan',
    price: '0',
    features: [
      'Access to basic travel guides',
      'Create and view public content',
      'Community forum access'
    ],
    expiry: 'Never'
  },
  {
    title: 'Explorer Plan',
    price: '499',
    features: [
      'All Free Plan features',
      'Access to premium travel guides',
      'Create and view premium content',
      'Ad-free experience',
      'Personalized travel recommendations'
    ],
    expiry: '1 Month',
    recommended: true
  },
  {
    title: 'Globetrotter Plan',
    price: '999',
    features: [
      'All Explorer Plan features',
      'Priority support',
      'Exclusive travel webinars',
      'Early access to new features',
      'Discounts on partner hotels'
    ],
    expiry: '3 Months'
  }
]

const SubscriptionPage = () => {
  return (
    <Container>
      <h1 className='text-4xl md:text-5xl font-bold text-center text-primary mb-4'>
        Choose Your Travel Adventure
      </h1>
      <p className='text-xl text-center text-default-600 mb-12'>
        Unlock premium features and content to enhance your travel experience
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center'>
        {subscriptionPlans.map((plan, index) => (
          <SubscriptionCard
            key={index}
            title={plan.title}
            price={plan.price}
            features={plan.features}
            expiry={plan.expiry}
            recommended={plan.recommended}
          />
        ))}
      </div>
    </Container>
  )
}

export default SubscriptionPage

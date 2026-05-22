import { useNavigate, useOutletContext } from 'react-router-dom'
import HeroSection from '../components/home/HeroSection'
import WhyChoosingUs from '../components/home/WhyChoosingUs'
import DoctorsSection from '../components/home/DoctorsSection'
import { DOCTORS_HOME } from '../data/content'

type LayoutContext = {
  onBookingClick: () => void
}

const HomePage = () => {
  const navigate = useNavigate()
  const { onBookingClick } = useOutletContext<LayoutContext>()

  const handleDetailsClick = () => {
    navigate('/services')
  }

  return (
    <>
      <HeroSection
        onDetailsClick={handleDetailsClick}
        onBookingClick={onBookingClick}
      />
      <WhyChoosingUs />
      <DoctorsSection doctors={DOCTORS_HOME} compact />
    </>
  )
}

export default HomePage

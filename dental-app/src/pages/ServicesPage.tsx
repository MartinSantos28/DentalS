import { useOutletContext } from 'react-router-dom'
import ServicesContent from '../components/services/ServicesContent'

type LayoutContext = {
  onBookingClick: () => void
}

const ServicesPage = () => {
  const { onBookingClick } = useOutletContext<LayoutContext>()
  return <ServicesContent onBookingClick={onBookingClick} />
}

export default ServicesPage

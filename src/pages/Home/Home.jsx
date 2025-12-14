import CallToAction from '../../components/Home/CallToAction'
import CustomerTestimonials from '../../components/Home/CustomerTestimonials'
import Hero from '../../components/Home/Hero'
import ServiceCoverageMap from '../../components/Home/ServiceCoverageMap'
import Services from '../../components/Home/Services'
import TopDecorators from '../../components/Home/TopDecorators'
import WhyChooseUs from '../../components/Home/WhyChooseUs'

const Home = () => {
  return (
    <div>
      <Hero></Hero>
      <Services></Services>
      <TopDecorators></TopDecorators>
      <WhyChooseUs></WhyChooseUs>
      <CustomerTestimonials></CustomerTestimonials>
      <ServiceCoverageMap></ServiceCoverageMap>
      <CallToAction></CallToAction>
    </div>
  )
}

export default Home

import HeroSection from '@/components/HeroSection/HeroSection'
import HowItWorksSection from '@/components/HowItWorksSection/HowItWorksSection'
import WhyChooseSection from '@/components/WhyChooseSection/WhyChooseSection'
import { reset } from '@/Redux/Slice/AuthSlice'
import { showSuccessToast } from '@/Utlis/toastUtils'
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Home = () => {
  const { isLoginSuccess } = useSelector(state => state.user)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVisible, setIsVisible] = useState({})

  const dispatch = useDispatch()

  useEffect(() => {
    if (isLoginSuccess) {
      showSuccessToast('Login Successful')
      dispatch(reset())
    }
  }, [dispatch, isLoginSuccess])

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  // IntersectionObserver for reveal animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }))
        })
      },
      { threshold: 0.1 }
    )

    const sections = document.querySelectorAll('[data-animate]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <div className='min-h-screen bg-black text-white overflow-x-hidden'>
      <Helmet>
                <meta charSet="utf-8" />
                <title>Music Demo</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
      <ToastContainer/>
      <HeroSection
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <HowItWorksSection isVisible={isVisible} />
      <WhyChooseSection isVisible={isVisible} />

      {/* Footer */}
      <footer className='bg-black border-t border-gray-800 py-8'>
        <div className='container mx-auto px-4 text-center'>
          <div className='text-2xl font-bold bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent mb-4'>
            MusicHub
          </div>
          <p className='text-gray-500'>© 2025 MusicHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Home

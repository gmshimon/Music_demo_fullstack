import Navbar from '@/components/Navbar/Navbar'
import CurrentUser from '@/Utlis/CurrentUser'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

const Main = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  CurrentUser()
  return (
    <div>
      <Navbar
        isScrolled={isScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <Outlet />
    </div>
  )
}

export default Main

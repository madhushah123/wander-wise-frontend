import React from 'react'
import About from '@/components/landingComponents/About'
import Features from '@/components/landingComponents/Features'
import Hero from '@/components/landingComponents/Hero'
import Navbar from '@/components/landingComponents/Navbar'
import Testimonials from '@/components/landingComponents/Testimonals'
import Footer from '@/components/landingComponents/Footer'


const Landing = () => {
  return (
    <div>
        <Navbar />
        <Hero />
        <Features />
        <About />
        <Testimonials />
        <Footer />
    </div>
  )
}

export default Landing
import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Benefits from '../components/Benefits'
import LandingNav from '../components/LandingNav'

export default function LandingPage() {
  return (
    <>
      <LandingNav />  
      <Hero />
      <Features />
      <Benefits />
    </>
  )
}

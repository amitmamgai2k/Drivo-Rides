import React from 'react'
import Navbar from './Navbar'
import HeroSection from './HerSection'
import SuggestionsSection from './Suggestions'
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container">
        <HeroSection />
        <SuggestionsSection />
      </div>
    </div>
  )
}

export default Home

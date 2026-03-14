import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBeer, FaSearch, FaStar, FaUser, FaCar, FaShieldAlt } from 'react-icons/fa'
import { LanguageProvider } from './contexts/LanguageContext'
import HomePage from './pages/HomePage'
import BeerListPage from './pages/BeerListPage'
import BeerDetailPage from './pages/BeerDetailPage'
import Navigation from './components/Navigation'
import BeerFinder from './components/BeerFinder'
import RegionalBeerRating from './components/RegionalBeerRating'
import DrinkDriveSafety from './components/DrinkDriveSafety'

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-beer">
        <Navigation />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/beers" element={<BeerListPage />} />
            <Route path="/beer/:id" element={<BeerDetailPage />} />
            <Route path="/finder" element={<BeerFinder />} />
            <Route path="/rate" element={
              <RegionalBeerRating 
                onSubmit={(data) => console.log('Regional rating submitted:', data)}
              />
            } />
            <Route path="/safety" element={<DrinkDriveSafety />} />
          </Routes>
        </main>
        
        {/* Simple footer for other pages */}
        <footer className="py-6 border-t border-beer-amber/10">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-500 text-sm">
              © 2026 BeerApp • Drink Responsibly • Data from <a href="https://punkapi.com/" className="text-beer-amber hover:text-beer-yellow">Punk API</a>
            </p>
          </div>
        </footer>
      </div>
    </LanguageProvider>
  )
}

export default App
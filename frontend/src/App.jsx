import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaBeer, FaSearch, FaStar, FaUser, FaCar, FaShieldAlt } from 'react-icons/fa'
import HomePage from './pages/HomePage'
import BeerListPage from './pages/BeerListPage'
import BeerDetailPage from './pages/BeerDetailPage'
import Navigation from './components/Navigation'
import BeerFinder from './components/BeerFinder'
import DetailedRating from './components/DetailedRating'
import DrinkDriveSafety from './components/DrinkDriveSafety'

function App() {
  return (
    <div className="min-h-screen bg-gradient-beer">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/beers" element={<BeerListPage />} />
          <Route path="/beer/:id" element={<BeerDetailPage />} />
          <Route path="/finder" element={<BeerFinder />} />
          <Route path="/rate/:beerId" element={
            <DetailedRating 
              beerId={1} 
              beerName="Sample Beer" 
              onSubmit={(data) => console.log('Rating submitted:', data)}
            />
          } />
          <Route path="/safety" element={<DrinkDriveSafety />} />
        </Routes>
      </main>
      
      <footer className="mt-16 py-8 border-t border-beer-amber/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 mb-4"
              >
                <FaBeer className="text-2xl text-beer-yellow animate-bubble" />
                <span className="text-xl font-display font-bold text-gradient">BeerApp</span>
              </motion.div>
              <p className="text-gray-400 text-sm">
                Discover, rate, and enjoy beer responsibly.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-300">
                Features
              </h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <FaSearch className="text-beer-amber" />
                  <span>Beer Finder with advanced filters</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaStar className="text-beer-amber" />
                  <span>Detailed rating system</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaCar className="text-beer-amber" />
                  <span>Drink n Drive safety tools</span>
                </li>
                <li className="flex items-center gap-2">
                  <FaShieldAlt className="text-beer-amber" />
                  <span>Fake vote protection</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-300">
                Safety First
              </h4>
              <p className="text-gray-400 text-sm">
                <strong className="text-red-400">⚠️ IMPORTANT:</strong> Never drink and drive. 
                Always use designated drivers or alternative transportation.
                This app is for educational purposes only.
              </p>
            </div>
          </div>
          
          <div className="pt-8 border-t border-beer-amber/10 text-center text-gray-500 text-sm">
            <p>© 2026 BeerApp. All rights reserved. Drink responsibly.</p>
            <p className="mt-2">Data provided by <a href="https://punkapi.com/" className="text-beer-amber hover:text-beer-yellow">Punk API</a></p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
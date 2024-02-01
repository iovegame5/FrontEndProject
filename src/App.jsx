import { PokemonProvider } from './Context/PokemonContext';
import Home from './content/Home';
import PokemonDetail from './content/PokemonDetail';
import NotFound from './content/NotFound'; // Import the NotFound component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/NavbarCom';
import Footer from './components/Footer';
import Favourite from './content/Favourite';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className='App'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/pokemon/:pokemonId' element={<PokemonDetail />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/favorites" element={<Favourite/>}/>
          </Routes>
        
        </div>
        <Footer />
      </Router>
    </PokemonProvider>
  );
}

export default App;

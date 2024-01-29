
import { PokemonProvider } from './Context/PokemonContext'
// content
import Home from './content/Home'
import PokemonDetail from './content/PokemonDetail'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


function App() {
  return (
    <PokemonProvider>
      <Router>
        <div className='App'>

          <Routes>
            <Route path='/' element={<Home />}>
            </Route>
            <Route forcerefresh={true} path='/pokemon/:pokemonId' element={<PokemonDetail />}></Route>
          </Routes>

        </div>
      </Router>
    </PokemonProvider>

  );

}

export default App

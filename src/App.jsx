import { useState } from 'react'

// content
import Home from './content/Home'
import PokemonDetail from './content/PokemonDetail'
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom'


function App() {
  return (
    <Router>
    <div className='App'>

      <Routes>
      <Route path='/' element={<Home/>}>
      </Route>
      <Route path='/pokemon/:pokemonId' element={<PokemonDetail/>}></Route>
      </Routes>
    
    </div>
  </Router>
  );
  
}

export default App

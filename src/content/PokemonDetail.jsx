import { useState } from 'react'
import { useParams } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
function PokemonDetail() {
    const { pokemonId} = useParams();

  return (
   <h1 >Pokemon Detail id: {pokemonId} </h1>
  )
}

export default PokemonDetail

import { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {RotatingLines} from 'react-loader-spinner'
import axios from 'axios'
import PokeCard from '../components/PokeCard';
import '../App.css'

function Home() {
  const [pokes, setPokes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [displayCount, setDisplayCount] = useState(20);


  const loadData = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0.`)
      const { results } = response.data;
      const requests = results.map((result) => axios.get(result.url));
      const pokemonResponses = await Promise.all(requests);
      const pokemonData = pokemonResponses.map((pokemonRes) => pokemonRes.data);

      setPokes(pokemonData);
      setError('');

    }
    catch (error) {
      console.error(error)
      setError("มีบางอย่างผิดพลาด", error)
    }
    finally {
      setLoading(false)

    }
  }

  const handleShowMore = async () => {
    // Increase the count to display more pokemons
    await setDisplayCount(prevCount => prevCount + 20);

  };

  useEffect(() => {
    console.log("eiei")
    loadData();

  }, [])
  console.log(pokes)

  return (
 
    <Container  style={{ maxWidth:'1400px' }}>
      {loading ? (
     <RotatingLines
     visible={true}
     height="96"
     width="96"
     color="red"
     strokeWidth="5"
     animationDuration="0.75"
     ariaLabel="rotating-lines-loading"
     wrapperStyle={{}}
     wrapperClass=""
     strokeColor='red'
     />
      ):(    <Row className='my-3'>
       {pokes.slice(0, displayCount).map((pokemon) => (
          <Col className='my-3' key={pokemon.id} md={4} lg={3} sm={6}>
            <PokeCard pokemon={pokemon}></PokeCard>
           
          </Col>
        ))}
     
     <Button onClick={handleShowMore} variant="primary" type="button">
          Show More
        </Button>
      

      </Row>)}

    </Container>

  )


}
export default Home

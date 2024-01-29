import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../App.css'
import axios from 'axios';
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { RotatingLines } from 'react-loader-spinner';
import PokeCard from '../components/PokeCard';
import Image from 'react-bootstrap/Image';
function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokeDetail, setPokeDetail] = useState('')
  const [loading, setLoading] = useState(false)
  const [evoChain, setEvoChain] = useState([])

  const loadData = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      setPokeDetail(response.data)
      console.log(response.data)
      let specieData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.species.name}`)

      const chainUrl = specieData.data.evolution_chain.url;


      let evoChainData = await axios.get(chainUrl);
      let evo1 = evoChainData.data.chain.species.name;
      let evo2 = evoChainData.data.chain.evolves_to[0]?.species.name;
      let evo3 = evoChainData.data.chain.evolves_to[0]?.evolves_to[0]?.species.name;
      if (evo1) {

        let evoPokeData1 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo1}/`)
        // console.log(evoPokeData1.data)
        setEvoChain(prevArray => [...prevArray, evoPokeData1.data]);
      }
      if (evoChainData.data.chain.evolves_to[0].species.name) {
        let evoPokeData2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo2}/`)
        // console.log(evoPokeData2.data)
        setEvoChain(prevArray => [...prevArray, evoPokeData2.data]);
      }
      if (evo3) {
        let evoPokeData3 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${evo3}/`)
        // console.log(evoPokeData3.data)
        setEvoChain(prevArray => [...prevArray, evoPokeData3.data]);
      }






    }
    catch (error) {

      console.error(error)

    }
    finally {
      setLoading(false)

    }
  }
  useEffect(() => {
    loadData();

  }, [])
  useEffect(() => {

    console.log(evoChain)

  }, [evoChain])


  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });


  return (
    <animated.div style={fadeIn}>
      <Container>
        <Row>
          <Col>

            {loading ? (
              <div>
                <h1>loading</h1>
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color="red"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  strokeColor="blue"
                />
              </div>

            ) : (
              <div>
                <h1 style={{ color: 'white' }} >{pokeDetail.name} #{pokeDetail.id}</h1>
                {evoChain.length > 0 && (
                  <Container style={{ width: "70%", background: "red" }}>
                    <Row>
                      <Col md={6} lg={6} xl={6} className="my-3" style={{ background: "green" }} >
                        {/* Image */}
                        <Image style={{ width: "100%" }} src={
                          pokeDetail.sprites.other['official-artwork'].front_default ||
                          pokeDetail.sprites.front_default || "/imagePlaceholder.png"
                        } thumbnail />
                      </Col>
                      <Col md={6} lg={6} xl={6} className="my-3" style={{ background: "green" }} >
                        {/* Detail name abilities bla bla */}
                        Detail
                      </Col>
                      <Col md={6} lg={6} xl={6} className="my-3" style={{ background: "green" }} >
                        {/* Stats */}
                        Stats
                      </Col>
                      <Col md={6} lg={6} xl={6} className="my-3" style={{ background: "green" }} >
                        {/* Type and Weekness */}
                        Type
                      </Col>
                    </Row>
                    {evoChain.length == 1 && (<div>

                      <h1>{pokeDetail.name} doesn't have evolution</h1>

                    </div>)}
                    {evoChain.length == 2 && (<div>

                      <PokeCard pokemon={evoChain[0]} />
                      <PokeCard pokemon={evoChain[1]} />

                    </div>)}
                    {evoChain.length == 3 && (<div>

                      <PokeCard pokemon={evoChain[0]} />
                      <PokeCard pokemon={evoChain[1]} />
                      <PokeCard pokemon={evoChain[2]} />

                    </div>)}


                  </Container>

                )}

              </div>
            )}

          </Col>
        </Row>
      </Container>
    </animated.div>

  )
}

export default PokemonDetail

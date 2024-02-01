import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import '../App.css'
import axios from 'axios';
import { Card, Col, Container, Row, Button, Form, ModalHeader } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-bootstrap';
import { RotatingLines } from 'react-loader-spinner';
import PokeCard from '../components/PokeCard';
import Image from 'react-bootstrap/Image';
import StatGuage from '../components/StatGuage';
import { Modal } from 'react-bootstrap';
import PokemonType from '../components/PokeType';
function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokeDetail, setPokeDetail] = useState('')
  const [loading, setLoading] = useState(false)
  const [evoChain, setEvoChain] = useState([])
  const [weekness, setWeekness] = useState([]);
  const [showAbility, setShowAbility] = useState(false);
  const [abilityDetail, setAbilityDetail] = useState('');
  const loadData = async () => {
    try {
      setLoading(true)
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      setPokeDetail(response.data)



      //  get Evolution chain
      let specieData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${response.data.species.name}`)
      console.log("speciesData:", specieData)
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

      // get weekness type
      response.data.types.forEach(type => {
        console.log(type.type.name);
      });








    }
    catch (error) {

      console.error(error)

    }
    finally {
      setLoading(false)

    }
  }

  const getAbiInfo = async () => {
    let abilresponse = await axios.get(pokeDetail.abilities[0].ability.url)
    let selectEng = abilresponse.data.effect_entries.find(ability => ability.language.name === 'en')
    console.log(selectEng)
    setAbilityDetail(selectEng.effect)
  }
  useEffect(() => {
    loadData();

  }, [])
  useEffect(() => {
    getAbiInfo()
  }, [pokeDetail])
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
      <Container style={{ padding: "30px", textAlign: "center" }}>
        <Row>
          <Col>

            {loading ? (
              <div style={{ height: "80vh", justifyContent: "center", alignItems: "center", display: "flex" }}>
                <RotatingLines
                  visible={true}
                  height="96"
                  width="96"
                  color="red"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  strokeColor="white"
                />
              </div>

            ) : (
              <div style={{}}>
                <h1 style={{ color: 'white' }} >{pokeDetail.name} #{pokeDetail.id}</h1>
                {evoChain.length > 0 && (
                  <Container style={{ width: "80%", background: "none", borderRadius: "20px" }}>
                    <Row className="equal-height-row">
                      <Col md={12} xl={6} className="" style={{}} >
                        {/* Image */}
                        <Container className="detailBox" style={{ padding: "0" }}>
                          <Image style={{
                            borderColor: " rgba(81, 92, 255, 0.1)",
                            background: "none",
                            width: "100%"
                          }} src={
                            pokeDetail.sprites.other['official-artwork'].front_default ||
                            pokeDetail.sprites.front_default || "/imagePlaceholder.png"
                          } thumbnail />
                        </Container>
                      </Col>
                      <Col md={12} xl={6} className="" style={{}} >
                        {/* Detail name abilities bla bla */}
                        <Container className="detailBox">
                          {/* <h2 style={{ color: "white" }}>Detail</h2> */}
                          <Row className="equal-height-row">
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ opacity: 0.6 }}>Height </p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ opacity: 0.6 }}>Weight</p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ fontSize: "20px" }}> {pokeDetail.height * 10} Cm</p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ fontSize: "20px" }}> {pokeDetail.weight / 10} Kg</p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ opacity: 0.6 }}>Category</p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ opacity: 0.6 }}> Abilities</p>
                            </Col>
                            <Col xs="6">
                              <p className="pokeDetailTxt" style={{ fontSize: "20px" }}> {pokeDetail.height * 10} Cm</p>
                            </Col>
                            <Col xs="6" style={{ display: "flex" }}>
                              <p className="pokeDetailTxt" style={{ textTransform: "capitalize", fontSize: "20px" }}> {pokeDetail.abilities[0].ability.name}</p>
                              <div style={{
                                width: "25px", height: "25px", background: "white", borderRadius: "50%",
                                marginLeft: "10px", alignItems: "center", justifyContent: "center", display: "flex", cursor: "pointer"
                              }}>
                                <p style={{ margin: "auto", fontSize: "20px" }} onClick={() => { setShowAbility(true) }}>?</p>
                              </div>
                              <Modal show={showAbility} onHide={() => setShowAbility(false)}>
                                <Modal.Header closeButton>
                                  <Modal.Title>{pokeDetail.abilities[0].ability.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body style={{}}>{abilityDetail}</Modal.Body>

                              </Modal>
                            </Col>
                            <div style={{ paddingTop:"20px"}}>
                              <h3 style={{ color: "white" }}>Type</h3>
                              {pokeDetail.types.map((type, index) => (
                                <PokemonType key={index} type={type.type.name} />
                              ))}
                            </div>
                          </Row>
                          <Row>
                            <Col md={12} xl={12} className="" style={{paddingTop:"20px"}} >

                              {/* Stats */}

                              <h3 style={{ color: "white" }}>Base Stats</h3>
                              <Row style={{}}>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[0].base_stat} statName={pokeDetail.stats[0].stat.name} />
                                </Col>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[1].base_stat} statName={pokeDetail.stats[1].stat.name} />
                                </Col>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[2].base_stat} statName={pokeDetail.stats[2].stat.name} />
                                </Col>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[3].base_stat} statName={pokeDetail.stats[3].stat.name} />
                                </Col>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[4].base_stat} statName={pokeDetail.stats[4].stat.name} />
                                </Col>
                                <Col xs={4}>
                                  <StatGuage stat={pokeDetail.stats[5].base_stat} statName={pokeDetail.stats[5].stat.name} />
                                </Col>
                              </Row>




                            </Col>
                          </Row>

                        </Container>
                      </Col>


                      <Col md={12} xl={6} className="" style={{}} >
                        <Container className="detailBox"> Type</Container>
                        {/* Type and Weekness */}

                      </Col>
                    </Row>
                    <Container>
                      <h1>Evolutions</h1>

                      {evoChain.length == 1 && (<div>

                        <h1>{pokeDetail.name} doesn't have evolution</h1>

                      </div>)}
                      {evoChain.length == 2 && (<div>
                        <Col lg={4} sm={4} xs={4}>
                          <PokeCard pokemon={evoChain[0]} />
                          <PokeCard pokemon={evoChain[1]} />
                        </Col>
                      </div>)}
                      {evoChain.length == 3 && (

                        <Row>
                          <Col lg={4} sm={4} xs={4}>
                            <PokeCard pokemon={evoChain[0]} />
                          </Col>
                          <Col lg={4} sm={4} xs={4}>
                            <PokeCard pokemon={evoChain[1]} />
                          </Col>
                          <Col lg={4} sm={4} xs={4}>
                            <PokeCard pokemon={evoChain[2]} />
                          </Col>
                        </Row>

                      )}

                    </Container>
                    {/* {evoChain.length == 1 && (<div>

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
 */}

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

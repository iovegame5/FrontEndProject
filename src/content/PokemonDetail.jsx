import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal } from 'react-bootstrap';
import PokemonType from '../components/PokeType';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { usePokemonContext } from '../Context/PokemonContext';
import { Link } from 'react-router-dom';

function PokemonDetail() {
  const { pokemonId } = useParams();
  const [pokeDetail, setPokeDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [evoChain, setEvoChain] = useState([])

  const [showAbility, setShowAbility] = useState(false);
  const [abilityDetail, setAbilityDetail] = useState('');

  const { addFavorite, removeFavorite, favorites } = usePokemonContext();
  const [showConfirm, setShowConfirm] = useState(false);
  const [nextPokemon, setNextPokemon] = useState(null);
  const [previousPokemon, setPreviousPokemon] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNextPokemon = async () => {
      try {
        setLoading(true)
        if (pokemonId == 1) {
          const nextResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${+pokemonId + 1}`);
          const previousResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/1025`);
          setNextPokemon(nextResponse.data);
          setPreviousPokemon(previousResponse.data)
        }
        else if (pokemonId == 1025) {
          const nextResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/1`);
          const previousResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/1024`);
          setNextPokemon(nextResponse.data);
          setPreviousPokemon(previousResponse.data)
        }
        else {
          const nextResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${+pokemonId + 1}`);
          const previousResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${+pokemonId - 1}`);
          setNextPokemon(nextResponse.data);
          setPreviousPokemon(previousResponse.data)
        }


      } catch (error) {
        console.error(error);
        setError(error)
      }
      finally {
        setLoading(false)
      }
    };

    fetchNextPokemon();
  }, [pokemonId]);



  const loadData = async () => {
    try {
      setLoading(true)
      setEvoChain([])
      let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      setPokeDetail(response.data)

      // get weekness type
      response.data.types.forEach(type => {
        console.log(type.type.name);
      });

    }
    catch (error) {


      setError(error)
      console.error(error)

    }
    finally {
      setLoading(false)

    }
  }

  const getAbiInfo = async () => {
    try {
      setLoading(true)
      let abilresponse = await axios.get(pokeDetail.abilities[0].ability.url)
      let selectEng = abilresponse.data.effect_entries.find(ability => ability.language.name === 'en')
      console.log(selectEng)
      if (selectEng) {
        setAbilityDetail(selectEng.effect)
      }

    }
    catch (error) {
      console.error(error)
      setError(error)
    }
    finally {
      setLoading(false)
    }

  }
  const getEvoInfo = async () => {
    try {
      setLoading(true)
      //  get Evolution chain
      let specieData = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${pokeDetail.species.name}`)
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
    }
    catch (err) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  }
  const confirmRemoveFavorite = () => {
    removeFavorite(pokeDetail.id);
    setShowConfirm(false); // Close confirmation dialog after removing
  };
  useEffect(() => {
    loadData();
  }, [pokemonId]);

  useEffect(() => {
    if (pokeDetail) {
      getAbiInfo();
      getEvoInfo();
    }
  }, [pokeDetail]);


  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 800 },
  });

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isFavorite = favorites.some((p) => p.id === pokeDetail.id);
    if (isFavorite) {
      setShowConfirm(true); // Show confirmation dialog before removing
    } else {
      addFavorite(pokeDetail);
    }
  };





  return (
    <animated.div style={fadeIn}>
      <Container style={{ padding: "30px", textAlign: "center" }}>
        <Row>
          <Col>

            {loading && (
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

            )}
            {!loading && !error && (
              <div style={{}}>
                {pokeDetail && previousPokemon && nextPokemon && (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                      <Link to={`/pokemon/${previousPokemon.id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} onClick={() => setPreviousPokemon(null)}>
                        <div variant="primary" className='btn-sm'> &lt; {previousPokemon.name} #{previousPokemon.id}</div>
                      </Link>


                      <Link to={`/pokemon/${nextPokemon.id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} onClick={() => setNextPokemon(null)}>
                        <div variant="primary" className='btn-sm'>  {nextPokemon.name} #{nextPokemon.id} &gt;</div>
                      </Link>
                    </div>

                    <h1 style={{ color: 'white' }} >{pokeDetail.name} #{pokeDetail.id}</h1>
                  </>
                )}'
                {evoChain.length > 0 && (
                  <Container style={{ width: "80%", background: "none", borderRadius: "20px" }}>
                    <Row className="equal-height-row">
                      <Col md={12} xl={6} className="" style={{
                        position: "relative",
                        display: "flex"
                      }} >
                        {/* Image */}
                        <Container className="detailBox" style={{ padding: "0", justifyContent: "center", alignItems: "center", display: "flex" }}>
                          <Image style={{
                            margin: "auto",
                            border: "none",
                            background: "none",
                            width: "100%"
                          }} src={
                            pokeDetail.sprites.other['official-artwork'].front_default ||
                            pokeDetail.sprites.front_default || "/imagePlaceholder.png"
                          } thumbnail />
                          <div style={{ position: 'absolute', top: '5px', right: '5px', padding: "10px" }} onClick={handleFavoriteClick}>
                            <FontAwesomeIcon icon={faHeart} className='heart-icon' style={{ color: favorites.some((p) => p.id === pokeDetail.id) ? 'red' : 'grey', width: "40px", height: "40px", cursor: 'pointer', transition: 'color 0.3s ease-in-out' }} />
                          </div>
                          <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
                            <Modal.Header closeButton>
                              <Modal.Title>Alert</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>Are you sure you want to remove {pokeDetail.name} from favorites?</Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
                              <Button variant="danger" onClick={confirmRemoveFavorite}>Remove</Button>
                            </Modal.Footer>
                          </Modal>
                        </Container>
                      </Col>
                      <Col md={12} xl={6} sm={12} className="" style={{

                        position: "relative",
                        display: "flex"
                      }} >
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
                            <div style={{ paddingTop: "20px" }}>
                              <h3 style={{ color: "white" }}>Type</h3>
                              <div style={{ display: "flex", textAlign: "center" }}>
                                {pokeDetail.types.map((type, index) => (
                                  <PokemonType key={index} type={type.type.name} style={{ position: "relative" }} />
                                ))}
                              </div>
                            </div>
                          </Row>
                          <Row>
                            <Col md={12} xl={12} className="" style={{ paddingTop: "20px" }} >

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



                    </Row>
                    <Container className='detailBox' style={{ textAlign: "center", minHeight: "300px", justifyContent: "center", alignItems: "center", alignContent: "center" }}>

                      <h2 style={{ color: "white" }}>Evolutions</h2>

                      {evoChain.length == 1 && (<div>

                        <h3 style={{ color: "white", margin: "auto" }}>{pokeDetail.name} doesn't have evolution</h3>

                      </div>)}
                      {evoChain.length == 2 && (<div>
                        <div className="evoContainer">
                          <div className="evoCard">
                            <Image className="evoImage" src={
                              evoChain[0].sprites.other['official-artwork'].front_default ||
                              evoChain[0].sprites.front_default || "/imagePlaceholder.png"
                            } thumbnail />
                            <p style={{ color: "white" }}>#{evoChain[0].id} {evoChain[0].name}</p>
                            {evoChain[0].types.map((type, index) => (
                              <PokemonType key={index} type={type.type.name} />
                            ))}
                          </div>
                          <div className="arrow-right"></div>
                          <Link to={`/pokemon/${evoChain[1].id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} >
                            <div className="evoCard">
                              <Image className="evoImage" src={
                                evoChain[1].sprites.other['official-artwork'].front_default ||
                                evoChain[1].sprites.front_default || "/imagePlaceholder.png"
                              } thumbnail />
                              <p style={{ color: "white" }}>#{evoChain[1].id} {evoChain[1].name}</p>
                              {evoChain[1].types.map((type, index) => (
                                <PokemonType key={index} type={type.type.name} />
                              ))}
                            </div>
                          </Link>



                        </div>
                      </div>)}
                      {evoChain.length == 3 && (

                        <div className="evoContainer">
                          <Link to={`/pokemon/${evoChain[0].id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} >
                            <div className="evoCard">
                              <Image className="evoImage" src={
                                evoChain[0].sprites.other['official-artwork'].front_default ||
                                evoChain[0].sprites.front_default || "/imagePlaceholder.png"
                              } thumbnail />
                              <p style={{ color: "white" }}>#{evoChain[0].id} {evoChain[0].name}</p>
                              {evoChain[0].types.map((type, index) => (
                                <PokemonType key={index} type={type.type.name} />
                              ))}
                            </div>
                          </Link>
                          <div className="arrow-right"></div>

                          <Link to={`/pokemon/${evoChain[1].id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} >
                            <div className="evoCard">
                              <Image className="evoImage" src={
                                evoChain[1].sprites.other['official-artwork'].front_default ||
                                evoChain[1].sprites.front_default || "/imagePlaceholder.png"
                              } thumbnail />
                              <p style={{ color: "white" }}>#{evoChain[1].id} {evoChain[1].name}</p>
                              {evoChain[1].types.map((type, index) => (
                                <PokemonType key={index} type={type.type.name} />
                              ))}
                            </div>
                          </Link>
                          <div className="arrow-right"></div>
                          <Link to={`/pokemon/${evoChain[2].id}`} style={{ textDecoration: 'none', alignSelf: "flex-end" }} >
                            <div className="evoCard">
                              <Image className="evoImage" src={
                                evoChain[2].sprites.other['official-artwork'].front_default ||
                                evoChain[2].sprites.front_default || "/imagePlaceholder.png"
                              } thumbnail />
                              <p style={{ color: "white" }}>#{evoChain[2].id} {evoChain[2].name}</p>
                              {evoChain[2].types.map((type, index) => (
                                <PokemonType key={index} type={type.type.name} />
                              ))}
                            </div>
                          </Link>

                        </div>

                      )}

                    </Container>

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

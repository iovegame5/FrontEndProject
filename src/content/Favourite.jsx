import { useState, useEffect } from 'react'
import { Card, Col, Container, Row, Button, Form } from 'react-bootstrap';
import Select from 'react-select'
import 'bootstrap/dist/css/bootstrap.min.css';
import { RotatingLines } from 'react-loader-spinner'
import axios from 'axios'
import PokeCard from '../components/PokeCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../App.css'
import 'react-dropdown/style.css';
import { useSpring, animated } from 'react-spring';
import { usePokemonContext } from '../Context/PokemonContext';
function Favourite() {
    const [pokes, setPokes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [displayCount, setDisplayCount] = useState(16);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokes, setFilteredPokes] = useState([]);
    const [sortBy, setSortBy] = useState('lownum');
    const { favorites, addFavorite, removeFavorite } = usePokemonContext();
    ;
    const sortOptions = [
        { value: 'atoz', label: 'A - Z' },
        { value: 'ztoa', label: 'Z - A' },
        { value: 'lownum', label: 'Lowest Number (first)' },
        { value: 'highnum', label: 'Highest Number (First)' }
    ]

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 800 },
    });

    // select style
    const customStyles = {
        option: (defaultStyles, state) => ({
            ...defaultStyles,
            color: state.isSelected ? "#fff" : "#fff",
            backgroundColor: state.isSelected ? "#212529" : "midnightblue",
        }),

        control: (defaultStyles) => ({
            ...defaultStyles,

            padding: "10px",
            border: "none",
            boxShadow: "none",
            width: "100%",
            backgroundColor: "midnightblue",
            borderRadius: "20px"
        }),
        singleValue: (defaultStyles) => ({ ...defaultStyles, color: "#fff" }),
    };

    const loadData = async () => {
        try {
            setLoading(true)
            console.log(favorites)
            setPokes(favorites);
            setFilteredPokes(favorites)
  
            console.log("filteredPokes:", filteredPokes)
        }
        catch (error) {

            setError("มีบางอย่างผิดพลาด", error)

        }
        finally {
            setLoading(false)

        }
    }
    const filterPokemonData = () => {
        if (searchTerm.length == 0) {
            setFilteredPokes(pokes);
        }
        else {
            const filteredData = pokes.filter(
                (pokemon) =>
                    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    String(pokemon.id).includes(searchTerm)
            );
            setFilteredPokes(filteredData);
        }
    };

    const handleShowMore = async () => {
        await setDisplayCount((prevCount) => prevCount + 16);

    };
    const handleSortChange = (selectedOption) => {
        setSortBy(selectedOption.value);
        console.log(sortBy)
        setDisplayCount(16);
    };


    const sortPokes = () => {
        let sortedPokes = [...filteredPokes];

        switch (sortBy) {
            case 'atoz':
                sortedPokes.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'ztoa':
                sortedPokes.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'lownum':
                sortedPokes.sort((a, b) => a.id - b.id);
                break;
            case 'highnum':
                sortedPokes.sort((a, b) => b.id - a.id);
                break;
            default:
                break;
        }

        setFilteredPokes(sortedPokes);
    };

    useEffect(() => {

        loadData();

    }, [favorites])

    useEffect(() => {
        filterPokemonData();
        sortPokes();
    }, [searchTerm, sortBy]);

    return (
        <animated.div style={fadeIn}>
            <Container className="pokesContainer  my-3" >
                <Row style={{ justifyContent: "center" }}>
                    <Col md={6} lg={6} xl={6} className="my-3" >
                        <input
                            style={{ width: "100%", borderRadius: "20px", height: "50px", backgroundColor: "midnightblue", borderWidth: "0", padding: "5px", paddingLeft: "30px" }}
                            type="text"
                            placeholder="Search by name or ID"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setDisplayCount(16);
                                filterPokemonData();
                            }}
                        />
                    </Col>
                </Row>
                <Row style={{ alignItems: "center", textAlign: "center" }}>


                    {/* <select
          style={{
            marginTop:"50px",
            width:"250px",
            borderRadius: "20px",
            height: "40px",
            backgroundColor: "midnightblue",
            color: "white",
            borderWidth: "0",
          }}
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="atoz">A-Z</option>
          <option value="ztoa">Z-A</option>
          <option value="lownum">Lowest Number (First)</option>
          <option value="highnum">Highest Number (First)</option>
    
        </select> */}
                    <Col md={6} lg={4} xl={4} className="my-3" >
                        <Select options={sortOptions} onChange={handleSortChange} defaultValue={sortOptions.find(option => option.value === "lownum")} styles={customStyles} />
                    </Col>
                </Row>
                {loading ? (
                    <div
                        style={{
                            position: 'fixed',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',

                            minHeight: '100vh',
                            minWidth: '100vw',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
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
                        <Row className="my-3">
                            {filteredPokes.slice(0, displayCount).map((pokemon) => (
                                <Col key={pokemon.id} md={6} lg={4} xl={3} className="my-3">
                                    <PokeCard pokemon={pokemon}></PokeCard>
                                </Col>
                            ))}


                        </Row>
                        {filteredPokes.length > 16 && (
                            <div className="d-flex justify-content-center my-3">
                                <div className="showMoreBtn" variant="primary" onClick={handleShowMore}>
                                    Load more
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Container>
        </animated.div>

    )


}
export default Favourite

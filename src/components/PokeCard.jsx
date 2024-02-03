import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PokemonType from './PokeType';
import { usePokemonContext } from '../Context/PokemonContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useSpring, animated } from 'react-spring';

const getRandomDirection = () => {
  const directions = ['left', 'right', 'top', 'bottom'];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
};

const PokeCard = ({ pokemon }) => {
  const direction = getRandomDirection();
  const { addFavorite, removeFavorite, favorites } = usePokemonContext();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false); // State to control the confirmation dialog

  const goToDetail = (pokemonId) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isFavorite = favorites.some((p) => p.id === pokemon.id);
    if (isFavorite) {
      setShowConfirm(true); // Show confirmation dialog before removing
    } else {
      addFavorite(pokemon);
    }
  };

  const confirmRemoveFavorite = () => {
    removeFavorite(pokemon.id);
    setShowConfirm(false); // Close confirmation dialog after removing
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${direction === 'left' || direction === 'top' ? '-' : ''}50%)` },
    to: { opacity: 1, transform: 'translate(0)' },
    config: { duration: 300 },
  });

  return (
    <animated.div style={fadeIn}>
      {/* <a href={`/pokemon/${pokemon.id}`}> */}
        <Card onClick={()=>{goToDetail(pokemon.id)}} className="pokeCard" key={pokemon.id} style={{ transition: 'transform 0.2s', cursor: 'pointer', position: 'relative',    }}>
          <div style={{ height: "3rem", position: "relative" , justifyContent:"flex-start", alignItems:"flex-start"}}>
            <div style={{ position: 'absolute', top: '5px', left: '5px', padding: "10px", color: 'grey', fontSize: "20px" }}>#{pokemon.id}</div>
            <div style={{ position: 'absolute', top: '5px', right: '5px', padding: "10px" }} onClick={handleFavoriteClick}>
              <FontAwesomeIcon icon={faHeart} className='heart-icon' style={{ color: favorites.some((p) => p.id === pokemon.id) ? 'red' : 'grey', width: "25px", height: "25px", cursor: 'pointer', transition: 'color 0.3s ease-in-out' }} />
            </div>
          </div>
          <div style={{ textTransform: 'capitalize', padding: "10px", color: 'white', fontSize: "24px" }}>{pokemon.name}</div>
          <Card.Img variant="top" style={{ paddingTop: "20px",  position:"relative", width:"60%", alignItems:"center", alignSelf:"center" }} src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default || "/imagePlaceholder.png"} />
          <Card.Body>
            <Card.Text style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
              <span style={{ marginRight: "20px" }}>Type</span>
              {pokemon.types.map((type, index) => (
                <PokemonType key={index} type={type.type.name} />
              ))}
            </Card.Text>
          </Card.Body>
        </Card>
      {/* </a> */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to remove {pokemon.name} from favorites?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmRemoveFavorite}>Remove</Button>
        </Modal.Footer>
      </Modal>
    </animated.div>
  );
};

export default PokeCard;

import React from 'react';
import { Card, Button } from 'react-bootstrap';
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

  const goToDetail = (pokemonId) => {
    // ไปหน้า Detail แล้ว ข้อมูล fetch ไม่ครบ
    navigate(`/pokemon/${pokemonId}`);
  };


  const handleFavoriteClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    // Favorites ยัง
    const isFavorite = favorites.some((p) => p.id === pokemon.id);

    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };


  const fadeIn = useSpring({
    from: { opacity: 0, transform: `translate${direction === 'left' || direction === 'right' ? 'X' : 'Y'}(${direction === 'left' || direction === 'top' ? '-' : ''}50%)` },
    to: { opacity: 1, transform: 'translate(0)' },
    
  });


  return (
    <animated.div style={fadeIn}>
      <a href={`/pokemon/${pokemon.id}`}>
        <Card
          className="pokeCard"
          key={pokemon.id}
          style={{ transition: 'transform 0.2s', cursor: 'pointer', position: 'relative' }}

        // onClick={() => goToDetail(pokemon.id)}
        >
          <div style={{ height: "3rem", position: "relative", }}>
    
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '5px',
                padding: "10px",
                color: 'grey',
                fontSize: "20px"
              }}
            >
              #{pokemon.id}
            </div>


            <div
              style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                padding: "10px"
              }}
              onClick={handleFavoriteClick}
            >

              <FontAwesomeIcon
                icon={faHeart}
                className='heart-icon'
                style={{
                  color: favorites.some((p) => p.id === pokemon.id) ? 'red' : 'grey',
                  width: "25px",
                  height: "25px",
                  cursor: 'pointer',
                  transition: 'color 0.3s ease-in-out', // Move the transition property here
                }}

              />


            </div>

          </div>
          <div
            style={{
              textTransform: 'capitalize',
              padding: "10px",
              color: 'white',
              fontSize: "24px"
            }}
          >
            {pokemon.name}
          </div>

          <Card.Img variant="top" style={{ height: "350px", paddingTop: "20px" }} src={
            pokemon.sprites.other['official-artwork'].front_default ||
            pokemon.sprites.front_default || "/imagePlaceholder.png"
          } />
          <Card.Body>

            <Card.Text style={{ color: 'white', display: 'flex', justifyContent: 'center' }}>
              <span style={{ marginRight: "20px" }}>Type</span>
              {pokemon.types.map((type, index) => (
                <PokemonType key={index} type={type.type.name} />
              ))}
            </Card.Text>

          </Card.Body>
        </Card>
      </a>
    </animated.div>

  );
};

export default PokeCard;

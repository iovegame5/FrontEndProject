import React from 'react';

const PokemonType = ({ type }) => {
  const getGradientColor = (type) => {
    switch (type) {
      case 'normal':
        return 'linear-gradient(90deg, #A8A878, #C0C0A8)'; // Normal
      case 'fire':
        return 'linear-gradient(90deg, #F08030, #F5AC78)'; // Fire
      case 'water':
        return 'linear-gradient(90deg, #6890F0, #9DB7F5)'; // Water
      case 'electric':
        return 'linear-gradient(90deg, #F8D030, #FADA5E)'; // Electric
      case 'grass':
        return 'linear-gradient(90deg, #78C850, #A4E57E)'; // Grass
      case 'ice':
        return 'linear-gradient(90deg, #98D8D8, #BCE6E6)'; // Ice
      case 'fighting':
        return 'linear-gradient(90deg, #C03028, #D67873)'; // Fighting
      case 'poison':
        return 'linear-gradient(90deg, #A040A0, #C183C1)'; // Poison
      case 'ground':
        return 'linear-gradient(90deg, #E0C068, #EBD69D)'; // Ground
      case 'flying':
        return 'linear-gradient(90deg, #A890F0, #C9C0F8)'; // Flying
      case 'psychic':
        return 'linear-gradient(90deg, #F85888, #FAB8B8)'; // Psychic
      case 'bug':
        return 'linear-gradient(90deg, #A8B820, #C0D860)'; // Bug
      case 'rock':
        return 'linear-gradient(90deg, #B8A038, #D1C17D)'; // Rock
      case 'ghost':
        return 'linear-gradient(90deg, #705898, #A292BC)'; // Ghost
      case 'dark':
        return 'linear-gradient(90deg, #705848, #A29288)'; // Dark
      case 'dragon':
        return 'linear-gradient(90deg, #7038F8, #8C88FF)'; // Dragon
      case 'steel':
        return 'linear-gradient(90deg, #B8B8D0, #D1D1E0)'; // Steel
      case 'fairy':
        return 'linear-gradient(90deg, #EE99AC, #F4BDC9)'; // Fairy

      default:
        return 'linear-gradient(90deg, #A8A878, #C0C0A8)'; // Default gradient
    }
  };

  const badgeStyle = {
    background: getGradientColor(type),
    color: 'white',
    padding: '4px 8px',
    borderRadius: '4px',
    textTransform: 'capitalize',
    marginLeft: '10px',
    marginRight: '10px',
    width: '75px',
  };

  return (
    <span style={badgeStyle}>
      {type}
    </span>
  );
};

export default PokemonType;

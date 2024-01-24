import { Card, Col, Container, Row, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import PokemonType from './PokeType';
const PokeCard = ({pokemon}) =>{
    return(
      <Card className="pokeCard"  key={pokemon.id}>
      <Card.Img style={{}}variant="top" src={pokemon.sprites.other['official-artwork'].front_default} />
      <Card.Body>
        <Card.Title style={{color:'white'}}>{pokemon.name}</Card.Title>
        <Card.Text style={{ color: 'white', display: 'flex', justifyContent:"center"}}>
          {pokemon.types.map((type, index) => (
            <PokemonType key={index} type={type.type.name}  />
          ))}
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
    )
}
export default PokeCard;
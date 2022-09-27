import React from 'react';
import { Link } from 'react-router-dom';
import '../css/pokCard.css';
import * as allTypesJPG from '../imgs/PokTypes/exportTypes.js';

const PokCard = (props) => {
  return (
    <div className={props.classSearch ? `card ${props.classSearch}` : 'card'}>
      <Link className="LinkPokCard" to={`/pokemons/${props.id}`}>
        <div className="cardTitle">{props.name}</div>

        <img className="mainImg" src={props.img} alt={props.name} />
        <div className="detailTypes">
          {props.types
            .map((el) => {
              el = el.charAt(0) + el.slice(1);
              return el;
            })
            .map((el) => (
              <img
                key={el}
                className={`${el} eachCardType`}
                src={allTypesJPG[el]}
              />
            ))}
        </div>
      </Link>
    </div>
  );
};

export default PokCard;

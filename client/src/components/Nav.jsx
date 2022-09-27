import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import pokeBall from '../imgs/pokeballWhite.png';
import '../css/nav.css';

export default class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="menu">
          <Link className="linkIMG" to="/">
            <img className="pokeBallNav" alt="Landing" src={pokeBall} />
          </Link>
          <Link className="link span" to="/pokemons">
            First Generation!
          </Link>
          <Link className="link span" to="/pokemons/create">
            Create New Pokemon!
          </Link>
          <Link className="link span aboutMe" to="/about">About Me</Link>
        </div>
      </nav>
    );
  }
}

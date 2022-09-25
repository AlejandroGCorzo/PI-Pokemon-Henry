import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import landingPokemonLogo from '../imgs/landing-pokemon-logo.png';
import '../css/landing.css';
import linkedinLogo from '../imgs/subNav-linkedin.png';
import gitHubLogo from '../imgs/subNav-gitHub.png';
import { getAllPok, getTypes } from '../redux/actions/actions';

export default function Landing() {
  const allPok = useSelector((state) => state.allPok);
  const pokTypes = useSelector((state) => state.pokTypes);
  const dispatch = useDispatch();
  useEffect(() => {
    if (pokTypes.length === 0) dispatch(getTypes());
    if (allPok.length === 0) dispatch(getAllPok());
  }, [dispatch]);
  return (
    <div className="landing">
      <img className="landingPokemonLogo" src={landingPokemonLogo} />
      <Link to="/pokemons">
        {/* <img className="landingPokCatch" src={landingPokCatch} /> */}
        <button className="landing-btton">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Gotta catch them all!
        </button>
      </Link>
      <div className="subLanding">
        <span className="subLandingSpan">Developed By</span>
        <span className="subLandingSpan">Alejandro Gabriel Corzo</span>
        <div className="landingIcons">
          <a
            href="https://www.linkedin.com/in/alejandro-gabriel-corzo/"
            target="_blank"
          >
            <img className="landingLinkedinLogo" src={linkedinLogo} />
          </a>
          <a href="https://github.com/AlejandroGCorzo" target="_blank">
            <img className="landingGitHubLogo" src={gitHubLogo} />
          </a>
        </div>
        <span className="subLandingSpan email">
          alejandro.g.corzo@gmail.com
        </span>
      </div>
    </div>
  );
}

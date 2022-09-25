import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav.jsx';
import Home from './components/Home.jsx';
import PokDetails from './components/PokDetails.jsx';
import CreatePokemon from './components/CreatePokemon.jsx';
import Landing from './components/Landing.jsx';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Route path="/pokemons" component={Nav} />
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/pokemons" component={Home} />
          <Route path="/pokemons/create" component={CreatePokemon} />
          <Route path="/pokemons/:id" component={PokDetails} />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </React.Fragment>
    </div>
  );
}

export default App;

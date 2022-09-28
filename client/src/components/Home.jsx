import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPok,
  getPokeByName,
  clear,
  getTypes,
  sortAction,
  holdSettings,
  waitingOn,
  getPokeByNameFromAPI,
} from '../redux/actions/actions';
import '../css/home.css';
import TypeOptions from './TypeOptions.jsx';
import PokCard from './PokCard.jsx';
import rightArrow from '../imgs/right-arrow.png';
import leftArrow from '../imgs/left-arrow.png';
import waitingGif from '../imgs/waitingGif.gif';
import sideduck from '../imgs/sideduck.png';
// // // // // // // // // // // //
export default function Home() {
  const allPok = useSelector((state) => state.allPok);
  const sortedPok = useSelector((state) => state.sortedPok);
  const pokByName = useSelector((state) => state.pokByName);
  const pokTypes = useSelector((state) => state.pokTypes);
  const waiting = useSelector((state) => state.waiting);
  // // // // // //
  const [search, setSearch] = useState('');
  const [searched, setSearched] = useState(false);
  // // // // // //

  const selectorDefault = 'Select Option';
  // const [sortAlph, setSortAlph] = useState(selectorDefault);
  // const [sortAttack, setSortAttack] = useState(selectorDefault);
  // const [sortType, setSortType] = useState(selectorDefault);
  // const [sortFROM, setSortFROM] = useState(selectorDefault);
  // // // // // //
  const settings = useSelector((state) => state.settings);
  // const [page, setPage] = useState(storePage);
  // // // // // //
  const dispatch = useDispatch();
  // // // // // //
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearched(true);
    if (allPok.find((el) => el.name === search)) {
      dispatch(getPokeByName(search));
    } else {
      dispatch(waitingOn());
      dispatch(getPokeByNameFromAPI(search));
      // setTimeout(() => {
      //   if (pokByName.length) return setSearched(true), 1000;
      // });
    }
    setSearch('');
    dispatch(holdSettings({ page: 1 }));
  };
  // // // // // //
  const handleClear = (e) => {
    e.preventDefault();
    dispatch(clear());
    // setSortAlph(selectorDefault);
    // setSortAttack(selectorDefault);
    // setSortType(selectorDefault);
    // setSortFROM(selectorDefault);
    setSearched(false);
    setSearch('');
    dispatch(
      holdSettings({
        page: 1,
        sortAlph: selectorDefault,
        sortAttack: selectorDefault,
        sortType: selectorDefault,
        sortFROM: selectorDefault,
      })
    );
    setSortedWith({
      from: false,
      type: false,
      alphOrAttack: false,
    });
  };
  // // // // // //
  const rend = () => {
    if (pokByName.length && Array.isArray(pokByName) && searched) {
      return pokByName.map((el) => (
        <PokCard
          // key={el.id}
          classSearch="TheOne"
          id={el.id}
          name={el.name}
          img={el.img}
          types={el.types}
        />
      ));
    }

    if (searched || typeof pokByName === 'string')
      return (
        <div className="searchNotFound">
          <span>Pokemon not found!</span>
          <img src={sideduck} />
        </div>
      );

    return sortedPok
      ?.slice(0 + settings.page * 12 - 12, settings.page * 12)
      .map((el) => (
        <PokCard
          key={el.id}
          id={el.id}
          name={el.name}
          img={el.img}
          types={el.types}
        />
      ));
  };
  // // // // // //
  let maxPages = Math.ceil(sortedPok.length / 12);
  const paging = () => {
    return (
      <div className="paginado">
        <img
          alt="Left Arrow"
          className="leftArrow"
          onClick={handleLeftArrowClick}
          name="-1"
          src={leftArrow}
        />
        <input
          className="pagingInput"
          name="paging"
          value={settings.page}
          onChange={handlePaging}
          type="number"
        ></input>
        <p className="maxPages">/</p>
        <p className="maxPages">{`${pokByName.length ? 1 : maxPages}`}</p>
        <img
          alt="Right Arrow"
          className="rightArrow"
          name="1"
          onClick={handleRightArrowClick}
          src={rightArrow}
        />
      </div>
    );
  };
  // // // // // //
  const handlePaging = (e) => {
    e.preventDefault();
    if (e.target.value <= maxPages && e.target.value > 0) {
      dispatch(
        holdSettings({
          page: e.target.value,
        })
      );
    }
    if (e.target.value === '') dispatch(holdSettings({ page: e.target.value }));
  };
  // // // // // //
  const handleLeftArrowClick = (e) => {
    e.preventDefault();
    if (settings.page > 1)
      dispatch(
        holdSettings({ page: Number(settings.page) + Number(e.target.name) })
      );
  };
  // // // // // //
  const handleRightArrowClick = (e) => {
    e.preventDefault();
    if (settings.page < maxPages)
      dispatch(
        holdSettings({ page: Number(settings.page) + Number(e.target.name) })
      );
  };
  // // // // // //
  useEffect(() => {
    if (pokTypes.length === 0) dispatch(getTypes());
    if (allPok.length === 0) {
      dispatch(getAllPok());
      dispatch(waitingOn());
    }
  }, [dispatch]);
  // // // // // //
  const [sortedWith, setSortedWith] = useState({
    from: false,
    type: false,
    alphOrAttack: false,
  });
  // // // // // //
  const handleSort = (e) => {
    e.preventDefault();
    // console.log(e.target.name, e.target.value);
    dispatch(sortAction({ ...sortedWith, [e.target.name]: e.target.value }));
    setSortedWith({ ...sortedWith, [e.target.name]: e.target.value });
    if (e.target.value === 'A' || e.target.value === 'Z') {
      dispatch(holdSettings({ sortAlph: e.target.value }));
      dispatch(holdSettings({ sortAttack: selectorDefault }));
    }
    if (e.target.value === 'Max' || e.target.value === 'Min') {
      dispatch(holdSettings({ sortAttack: e.target.value }));
      dispatch(holdSettings({ sortAlph: selectorDefault }));
    }
    if (e.target.name === 'type')
      dispatch(holdSettings({ sortType: e.target.value }));
    if (e.target.value === 'api' || e.target.value === 'db')
      dispatch(holdSettings({ sortFROM: e.target.value }));
    dispatch(holdSettings({ page: 1 }));
  };
  // // // // // //
  return (
    <div className="all">
      {!waiting ? (
        <div className="allOp">
          <form onSubmit={handleSubmit}>
            <div className="searchBar">
              <input
                className="searchInput"
                type="text"
                name="search"
                placeholder="Search a Pokemon!"
                value={search}
                autoComplete="off"
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                className="searchClear"
                disabled={search.length === 0}
                type="submit"
              >
                Search
              </button>
              <button className="searchClear" onClick={handleClear}>
                Reset All
              </button>
            </div>
          </form>
          <div className="allSelectors">
            <div className="selectors">
              <select
                className="selectorsSelect"
                onChange={handleSort}
                name="alphOrAttack"
                value={settings.sortAlph}
              >
                <option
                  className="selectorDisabled"
                  disabled
                  value="Select Option"
                >
                  Select Option
                </option>
                <option value="A">A - Z</option>
                <option value="Z">Z - A</option>
              </select>
              <span className="selectorsSpan">Order Alphabetically</span>
            </div>

            <div className="selectors">
              <select
                className="selectorsSelect"
                onChange={handleSort}
                name="alphOrAttack"
                value={settings.sortAttack}
              >
                <option
                  className="selectorDisabled"
                  disabled
                  value="Select Option"
                >
                  Select Option
                </option>
                <option value="Max">Max Attack</option>
                <option value="Min">Min Attack</option>
              </select>
              <span className="selectorsSpan">Order by Attack Rate</span>
            </div>
            {paging()}
            <div className="selectors">
              <select
                className="selectorsSelect"
                onChange={handleSort}
                name="type"
                value={settings.sortType}
                // onFocus={(e) =>console.log(e)}
              >
                <option
                  className="selectorDisabled"
                  disabled
                  name="Select Option"
                >
                  Select Option
                </option>
                {pokTypes?.map((el) => (
                  <TypeOptions key={el} str={el} />
                ))}
              </select>
              <span className="selectorsSpan">Filter by Pokemon Type</span>
            </div>

            <div className="selectors">
              <select
                className="selectorsSelect"
                onChange={handleSort}
                name="from"
                value={settings.sortFROM}
              >
                <option
                  className="selectorDisabled"
                  disabled
                  value="Select Option"
                >
                  Select Option
                </option>
                <option value="api">API</option>
                <option value="db">Data Base</option>
              </select>
              <span className="selectorsSpan">Filter by API or DB</span>
            </div>
          </div>
        </div>
      ) : null}
      <div className="center">
        <div className="pokeCardcitas">
          {waiting ? <img className="waitingGif" src={waitingGif} /> : rend()}
        </div>
      </div>
    </div>
  );
}

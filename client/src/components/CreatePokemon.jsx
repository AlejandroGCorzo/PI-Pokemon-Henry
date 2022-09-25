import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/createPokemon.css';
import { createPokemon, getAllPok, getTypes } from '../redux/actions/actions';
import TypeOptions from './TypeOptions.jsx';

const CreatePokemon = () => {
  const dispatch = useDispatch();
  const pokTypes = useSelector((state) => state.pokTypes);
  const allPok = useSelector((state) => state.allPok);
  //
  const selectorDefault = '--Select one--';
  const selectorAnother = '--Select any other type?--';
  const alreadySelected = '--Already selected!--';
  const twoTypesSelected = '--Already 2 types selected!--';
  //
  const [typeOptions, setTypeOptions] = useState(selectorDefault);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [errorName, setErrorName] = useState('');
  const [errorNumber, setErrorNumber] = useState({});
  //
  const handleCickType = (e) => {
    e.preventDefault();
    if (selectedTypes.length === 1) setTypeOptions(selectorDefault);
    if (selectedTypes.length === 2) setTypeOptions(selectorAnother);
    if (selectedTypes[0] === e.target.value) {
      setSelectedTypes((el) => {
        el.shift();
        return el;
      });
      setValues({
        ...values,
        type: values.type.length > 1 ? [...[values.type[1]]] : [],
      });
    } else {
      setSelectedTypes((el) => {
        el.pop();
        return el;
      });
      setValues({
        ...values,
        type: values.type.length > 1 ? [...[values.type[0]]] : [],
      });
    }
  };
  //
  const initialValues = {
    name: '',
    hp: '',
    attack: '',
    special_attack: '',
    defense: '',
    special_defense: '',
    speed: '',
    height: '',
    weight: '',
    img: '',
    type: [],
  };
  const [values, setValues] = useState(initialValues);
  //
  const handleInputChange = function (e) {
    e.preventDefault();
    console.log(selectedTypes);
    if (!/^(^$|[ a-z ])+$/i.test(e.target.value)) setErrorName('Only letters!');
    else setErrorName('');
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //
  const handleInputChangeNumbers = (e) => {
    e.preventDefault();
    if (e.target.value > 99 || e.target.value < 1)
      setErrorNumber({
        ...errorNumber,
        [e.target.name]: 'Between 1 and 99!',
      });
    else setErrorNumber({ ...errorNumber, [e.target.name]: undefined });
    setValues({ ...values, [e.target.name]: Number(e.target.value) });
  };
  //
  const handleTypeSelector = (e) => {
    e.preventDefault();
    const find = selectedTypes.find((el) => el === e.target.value);
    setTypeOptions(selectorAnother);
    if (selectedTypes.length > 0) setTypeOptions(twoTypesSelected);
    if (selectedTypes.length > 1) return;
    find
      ? setTypeOptions(alreadySelected)
      : setSelectedTypes((el) => [...el, e.target.value]);
    setValues({
      ...values,
      [e.target.name]: [...values[e.target.name], ...[e.target.value]],
    });
  };
  //
  const submit = (e) => {
    e.preventDefault();
    console.log(values);
    dispatch(createPokemon(values));
    setValues(initialValues);
    setSelectedTypes([]);
    setTimeout(() => dispatch(getAllPok()), 1000);
  };
  //
  const clear = (e) => {
    e.preventDefault();
    setTypeOptions(selectorDefault);
    setSelectedTypes([]);
    setValues(initialValues);
  };
  //
  useEffect(() => {
    if (pokTypes.length === 0) dispatch(getTypes());
    if (allPok.length === 0) dispatch(getAllPok());
  }, [dispatch, pokTypes.length, allPok.length]);
  //
  return (
    <div className="createPokemon">
      <form className="form" onSubmit={submit}>
        <div className="options">
          <div>
            <div className="eachform">
              <span>Name:</span>
              <input
                placeholder="--Enter a name!--"
                value={values.name}
                onChange={handleInputChange}
                autoComplete="off"
                type="text"
                name="name"
              />
              {<span>{errorName}</span>}
            </div>
            <div className="eachform">
              <span>Attack:</span>
              <input
                placeholder="--Attack rating!--"
                value={values.attack}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="attack"
              />
              {errorNumber.attack && <span>{errorNumber.attack}</span>}
            </div>
            <div className="eachform">
              <span>Special Attack:</span>
              <input
                placeholder="--Special Attack!--"
                value={values.special_attack}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="special_attack"
              />
              {errorNumber.special_attack && (
                <span>{errorNumber.special_attack}</span>
              )}
            </div>
            <div className="eachform">
              <span>Height:</span>
              <input
                placeholder="--Height!--"
                value={values.height}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="height"
              />
              {errorNumber.height && <span>{errorNumber.height}</span>}
            </div>
            <div className="eachform">
              <span>Type or types:</span>
              <select
                disabled={selectedTypes.length === 2}
                onChange={handleTypeSelector}
                name="type"
                value={typeOptions}
              >
                {pokTypes?.map((el) => (
                  <TypeOptions key={el} str={el} />
                ))}
                <option disabled name="--Select one--">
                  --Select one--
                </option>
                <option disabled name="--Select any other type?--">
                  --Select any other type?--
                </option>
                <option disabled name="--Already selected!--">
                  --Already selected!--
                </option>
                <option disabled name="--Already 2 types selected!--">
                  --Already 2 types selected!--
                </option>
              </select>
              <div>
                {selectedTypes.length ? (
                  selectedTypes.map((el) => (
                    <button onClick={handleCickType} key={el} value={el}>
                      {el}
                    </button>
                  ))
                ) : (
                  <span>No types selected yet!</span>
                )}
              </div>
            </div>
          </div>
          <div>
            <div className="eachform">
              <span>Hp:</span>
              <input
                placeholder="--HP!--"
                value={values.hp}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="hp"
              />
              {errorNumber.hp && <span>{errorNumber.hp}</span>}
            </div>
            <div className="eachform">
              <span>Defense:</span>
              <input
                placeholder="--Defense!--"
                value={values.defense}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="defense"
              />
              {errorNumber.defense && <span>{errorNumber.defense}</span>}
            </div>
            <div className="eachform">
              <span>Special Defense:</span>
              <input
                placeholder="--Special Defense!--"
                value={values.special_defense}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="special_defense"
              />
              {errorNumber.special_defense && (
                <span>{errorNumber.special_defense}</span>
              )}
            </div>
            <div className="eachform">
              <span>Speed:</span>
              <input
                placeholder="--Speed!--"
                value={values.speed}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="speed"
              />
              {errorNumber.speed && <span>{errorNumber.speed}</span>}
            </div>
            <div className="eachform">
              <span>Weight:</span>
              <input
                placeholder="--Weight!--"
                value={values.weight}
                onChange={handleInputChangeNumbers}
                autoComplete="off"
                type="number"
                name="weight"
              />
              {errorNumber.weight && <span>{errorNumber.weight}</span>}
            </div>
            <div className="eachform">
              <span>Img:</span>
              <input
                placeholder="--Image URL!--"
                value={values.img}
                onChange={handleInputChange}
                autoComplete="off"
                type="url"
                name="img"
              />
            </div>
          </div>
        </div>
        <div className="buttonForm">
          <button
            type="submit"
            disabled={
              values.name.length === 0 ||
              errorName ||
              !Object.values(errorNumber).every((el) => el === undefined) ||
              !values.attack ||
              !values.special_attack ||
              !values.defense ||
              !values.special_defense ||
              !values.height ||
              !values.weight ||
              !values.hp ||
              // !values.special_defense ||
              !values.speed ||
              values.type.length === 0
            }
          >
            Create Pokemon
          </button>
          <button onClick={clear}>Clear</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePokemon;

/* <form onSubmit={submit} className="form">
        <div>
          <div className="eachform">
            <label>Name: </label>
            <input
                placeholder="..."
                value={values.name} onChange={handleInputChange}
              type="text"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="eachform">
            <label>ReleaseYear: </label>
            <input
                placeholder="..."
                value={values.name} onChange={handleInputChange}
              name="releaseYear"
              type="number"
              value={values.releaseYear}
              onChange={handleInputChange}
            />
          </div>
          <div className="eachform">
            <label>Description: </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="eachform">
            <label>Director: </label>
            <input
                placeholder="..."
                value={values.name} onChange={handleInputChange}
              type="text"
              name="director"
              value={values.director}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="buttonForm eachform">
          <button type="submit">Create Movie</button>
        </div>
      </form> */

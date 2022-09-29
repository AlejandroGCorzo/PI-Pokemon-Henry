import axios from 'axios';

export const CREATE_POKEMON = 'CREATE_POKEMON';
export const GET_ALL_POKEMON = 'GET_ALL_POKEMON';
export const GET_POK_BY_ID = 'GET_POK_BY_ID';
export const GET_POK_BY_ID_FROM_API = 'GET_POK_BY_ID_FROM_API';
export const GET_POK_BY_NAME = 'GET_POK_BY_NAME';
export const GET_POK_BY_NAME_FROM_API = 'GET_POK_BY_NAME_FROM_API';
export const GET_TYPES = 'GET_TYPES';
// export const DELETE_POKEMON = 'DELETE_POKEMON';
export const CLEAR = 'CLEAR';
export const SORT = 'SORT';
export const HOLD_SETTINGS = 'HOLD_SETTINGS';
export const WAITING_ON = 'WAITING_ON';
export const CLEAR_DETAILS = 'CLEAR_DETAILS';

export const getAllPok = () => async (dispatch) => {
  // const info = await axios.get(`/pokemons`);
  // // console.log(info.data);
  // dispatch({ type: GET_ALL_POKEMON, payload: info.data });
  await axios
    .get(`/pokemons`)
    .then((el) => dispatch({ type: GET_ALL_POKEMON, payload: el.data }));
};

// export const getPokDetail = (id) => async (dispatch) => {
//   const info = await axios.get(`http://localhost:3001/pokemons/${id}`);
//   console.log(info.data);
//   dispatch({ type: GET_POK_BY_ID, payload: info.data });
// };

export const getPokDetailFromSTORE = (id) => {
  return { type: GET_POK_BY_ID, id };
};

export const getPokByIdFromAPI = (id) => async (dispatch) => {
  // const info = await axios.get(`/pokemons/${id}`);
  // // console.log(info.data);
  // dispatch({ type: GET_POK_BY_ID_FROM_API, payload: info.data });
  axios
    .get(`/pokemons/${id}`)
    .then((data) =>
      dispatch({ type: GET_POK_BY_ID_FROM_API, payload: data.data })
    );
};

export const getTypes = () => async (dispatch) => {
  // const info = await axios.get(`/types`);
  // // console.log(info.data);
  // dispatch({ type: GET_TYPES, payload: info.data });
  axios
    .get('/types')
    .then((el) => dispatch({ type: GET_TYPES, payload: el.data }));
};

export const createPokemon = (el) => async (dispatch) => {
  // console.log(el);
  await axios.post(`/pokemons`, el);
  dispatch({ type: CREATE_POKEMON, el });
};

export const deletePokemon = (id) => async (dispatch) => {
  // console.log(id);
  await axios.delete(`/pokemons/${id}`);
};

export const getPokeByName = (str) => {
  return {
    type: GET_POK_BY_NAME,
    str,
  };
};

export const getPokeByNameFromAPI = (str) => async (dispatch) => {
  const info = await axios.get(`/pokemons?name=${str}`);
  // console.log(info.data);
  dispatch({ type: GET_POK_BY_NAME_FROM_API, payload: info.data });
};

export const clear = () => {
  return {
    type: CLEAR,
    payload: [],
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS,
  };
};

export const sortAction = (sortedWith) => {
  return { type: SORT, sortedWith };
};

export const holdSettings = (settings) => {
  return { type: HOLD_SETTINGS, settings };
};

export const waitingOn = () => {
  return { type: WAITING_ON };
};

// // // // // // // // // // // // // //

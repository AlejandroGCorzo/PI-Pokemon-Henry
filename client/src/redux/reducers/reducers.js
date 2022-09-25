import {
  CREATE_POKEMON,
  GET_ALL_POKEMON,
  GET_POK_BY_ID,
  GET_POK_BY_ID_FROM_API,
  GET_POK_BY_NAME,
  GET_TYPES,
  // DELETE_POKEMON,
  CLEAR,
  SORT,
  HOLD_SETTINGS,
} from '../actions/actions';

const initialState = {
  allPok: [],
  sortedPok: [],
  pokDetail: {},
  pokByName: [],
  createdPoks: {},
  pokTypes: [],
  settings: {
    page: 1,
    sortAlph: 'Select Option',
    sortAttack: 'Select Option',
    sortType: 'Select Option',
    sortFROM: 'Select Option',
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_POKEMON:
      return {
        ...state,
        allPok: [...action.payload],
        sortedPok: [...action.payload],
        sortByNameOrAttack: [...action.payload],
        sortByType: [...action.payload],
        sortByFrom: [...action.payload],
      };

    case GET_POK_BY_ID:
      return {
        ...state,
        pokDetail: {
          ...state.allPok.filter((el) => el.id.toString() === action.id)[0],
        },
      };

    case GET_POK_BY_ID_FROM_API:
      return { ...state, pokDetail: { ...action.payload } };

    case GET_POK_BY_NAME:
      return {
        ...state,
        pokByName: state.allPok.filter(
          (el) => el.name?.toLowerCase() === action.str?.toLowerCase()
        ),
      };

    case CLEAR:
      return {
        ...state,
        sortedPok: [...state.allPok],
        sortByNameOrAttack: [...state.allPok],
        sortByType: [...state.allPok],
        sortByFrom: [...state.allPok],
        pokByName: [],
      };

    case GET_TYPES:
      return { ...state, pokTypes: action.payload };

    case CREATE_POKEMON:
      return {
        ...state,
        createdPoks: { ...state.createdPoks, ...action.el },
      };

    case SORT: {
      let sorted;
      if (action.sortedWith.alphOrAttack === 'A') {
        sorted = [...state.allPok].sort((a, b) => (a.name < b.name ? -1 : 1));
      }
      if (action.sortedWith.alphOrAttack === 'Z') {
        sorted = [...state.allPok].sort((a, b) => (a.name < b.name ? 1 : -1));
      }
      if (action.sortedWith.alphOrAttack === 'Max') {
        sorted = [...state.allPok].sort((a, b) =>
          a.attack < b.attack ? 1 : -1
        );
      }
      if (action.sortedWith.alphOrAttack === 'Min') {
        sorted = [...state.allPok].sort((a, b) =>
          a.attack < b.attack ? -1 : 1
        );
      }
      if (!action.sortedWith.alphOrAttack) {
        sorted = [...state.allPok];
      }
      if (action.sortedWith.from)
        sorted =
          action.sortedWith.from === 'api'
            ? sorted.filter((el) => typeof el.id === 'number')
            : sorted.filter((el) => typeof el.id === 'string');

      if (action.sortedWith.type)
        sorted = sorted.filter((el) =>
          el.types.includes(action.sortedWith.type)
        );

      return { ...state, sortedPok: [...sorted] };
    }

    case HOLD_SETTINGS:
      return {
        ...state,
        settings: { ...state.settings, ...action.settings },
      };

    // // // // // // // // // // // // // // // // // // // //
    // aca para abajo esta improvisado

    default:
      return { ...state };
  }
};

export default rootReducer;

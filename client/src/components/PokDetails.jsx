import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllPok,
  getPokDetailFromSTORE,
  getPokByIdFromAPI,
  deletePokemon,
  waitingOn,
  clearDetails,
} from '../redux/actions/actions.js';
import '../css/pokDetails.css';
import { useHistory } from 'react-router-dom';
// import {
//   Chart as ChartJS,
//   RadialLinearScale,
//   PointElement,
//   LineElement,
//   Filler,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import { Radar } from 'react-chartjs-2';
import * as allTypesJPG from '../imgs/PokTypes/exportTypes.js';
import waitingGif from '../imgs/waitingGif.gif';
import sideduck from '../imgs/sideduck.png';

export default function PokDetails(props) {
  const allPok = useSelector((state) => state.allPok);
  const pokDetail = useSelector((state) => state.pokDetail);
  const waiting = useSelector((state) => state.waiting);
  const [deleteVerification, setDeleteVerification] = useState(false);
  // // // // // // // // //
  const dispatch = useDispatch();
  const history = useHistory();
  // // // // // // // // //
  useEffect(() => {
    if (allPok.length === 0) {
      dispatch(getAllPok());
      dispatch(waitingOn());
      dispatch(getPokByIdFromAPI(props.match.params.id));
    } else if (allPok.find((el) => el.id === props.match.params.id))
      dispatch(getPokDetailFromSTORE(props.match.params.id));
    else {
      dispatch(waitingOn());
      dispatch(getPokByIdFromAPI(props.match.params.id));
    }
    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch]);

  // ChartJS.register(
  //   RadialLinearScale,
  //   PointElement,
  //   LineElement,
  //   Filler,
  //   Tooltip,
  //   Legend
  // );

  // const colours = {
  //   normal: '129, 129, 129',
  //   fire: '229, 97, 62',
  //   water: '48, 154, 226',
  //   electric: '224, 189, 40',
  //   grass: '67, 153, 55',
  //   ice: '71, 201, 201',
  //   fighting: '234, 148, 33',
  //   poison: '148, 84, 204',
  //   ground: '163, 113, 58',
  //   flying: '116, 171, 209',
  //   psychic: '234, 108, 141',
  //   bug: '160, 160, 40',
  //   rock: '170, 165, 129',
  //   ghost: '111, 69, 112',
  //   dragon: '87, 111, 189',
  //   dark: '79, 71, 71',
  //   steel: '107, 173, 201',
  //   fairy: '226, 141, 226',
  //   shadow: '255, 255, 255',
  //   unknown: '104, 160, 144',
  // };

  // const data = {
  //   labels: [
  //     `HP: ${pokDetail.hp}`,
  //     `Atk.: ${pokDetail.attack}`,
  //     `Def.: ${pokDetail.defense}`,
  //     `Speed: ${pokDetail.speed}`,
  //     `S.Def.: ${pokDetail.special_defense}`,
  //     `S.Atk.: ${pokDetail.special_attack}`,
  //   ],
  //   datasets: [
  //     {
  //       // label: 'Value',
  //       data: [
  //         pokDetail.hp,
  //         pokDetail.attack,
  //         pokDetail.defense,
  //         pokDetail.speed,
  //         pokDetail.special_defense,
  //         pokDetail.special_attack,
  //       ],
  //       backgroundColor: `rgba(${
  //         pokDetail.types && colours[pokDetail.types[0]]
  //       }, 0.7)`,
  //       borderColor: `rgba(${
  //         pokDetail.types && colours[pokDetail.types[0]]
  //       }, 1)`,
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
  //   // backgroundColor: ,
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //   },
  //   scales: {
  //     r: {
  //       ticks: {
  //         display: false,
  //         // color: 'rgba(255, 255, 255, 1)'
  //       },
  //       angleLines: { color: 'rgba(255, 255, 255, 1)' },
  //       min: 0,
  //       max: 160,
  //       grid: {
  //         color: 'rgba(255, 255, 255, 1)',
  //         // tickColor: 'rgba(255, 255, 255, 1)',
  //       },
  //       pointLabels: {
  //         font: { size: 12 },
  //         color: 'rgba(255, 255, 255, 1)',
  //         // centerPointLabels: false,
  //       },
  //     },
  //   },
  // };

  const destroy = (e) => {
    e.preventDefault();
    dispatch(deletePokemon(pokDetail.id));
    setTimeout(() => {
      dispatch(getAllPok());
    }, 1000);
    history.push('/pokemons');
  };
  // // // // // // // // // // // // // // // // // // // // //
  const rend = () => {
    if (pokDetail.id)
      return (
        <div className="pokdetailAll">
          <div className="pokdetailName">
            <span>{pokDetail.name && pokDetail.name}</span>
          </div>
          <div className="pokdetailRadImg">
            <div className="pokdetailHW">
              <img
                className={`${
                  typeof pokDetail.id === 'string'
                    ? 'pokDetailIMGAPI'
                    : 'pokDetailIMG'
                }`}
                src={pokDetail.img}
                alt={props.name}
              />
            </div>
            {/* <div className="statsRadar">
        <Radar data={data} options={options} />
      </div> */}
            <div className="statsSpans">
              <span>{`Hp: ${pokDetail.hp}`}</span>
              <span>{`Attack: ${pokDetail.attack}`}</span>
              <span>{`Special Attack: ${pokDetail.special_attack}`}</span>
              <span>{`Defense: ${pokDetail.defense}`}</span>
              <span>{`Special Defense: ${pokDetail.special_defense}`}</span>
              <span>{`Speed: ${pokDetail.speed}`}</span>
            </div>
          </div>
          <div className="pokedetailSpan">
            <span>{`Height: ${pokDetail.height / 10} m`}</span>
            <span>{`Weight: ${pokDetail.weight / 10} kg`}</span>
          </div>
          <div className="pokDetailTypesIMGContainer">
            {pokDetail.types
              ?.map((el) => {
                el = el.charAt(0) + el.slice(1);
                return el;
              })
              .map((el) => (
                <img
                  key={el}
                  className="pokDetailTypesIMG"
                  src={allTypesJPG[el]}
                />
              ))}
          </div>
          <div className="pokDetailButton">
            {typeof pokDetail.id === 'string' ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDeleteVerification(true);
                }}
              >
                Delete Pokemon!
              </button>
            ) : null}
          </div>
        </div>
      );

    if (waiting)
      return (
        <div className="pokeDetailWaitingGifContainer">
          <img className="pokeDetailWaitingGif" src={waitingGif} />
        </div>
      );

    return (
      <div className="idNotFound">
        <span>Pokemon not found!</span>
        <img src={sideduck} />
      </div>
    );
  };
  // // // // // // // // // // // // // // // // // // // //
  return (
    <div>
      {rend()}
      {deleteVerification && (
        <div className="deleteVerificationBox">
          <span>Are you sure you want to delete this Pokemon?</span>
          <div>
            <button onClick={destroy} className="deleteVerificationBoxConfirm">
              Yes, delete!
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setDeleteVerification(false);
              }}
              className="deleteVerificationBoxBack"
            >
              No, take me back!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* <span>{`Hp: ${pokDetail.hp}`}</span>
          <span>{`Attack: ${pokDetail.attack}`}</span>
          <span>{`Special Attack: ${pokDetail.special_attack}`}</span>
          <span>{`Defense: ${pokDetail.defense}`}</span>
          <span>{`Special Defense: ${pokDetail.special_defense}`}</span>
          <span>{`Speed: ${pokDetail.speed}`}</span> */
}
{
  /* <span>{`${
            pokDetail.types &&
            pokDetail.types
              .map((el) => {
                el = el.charAt(0).toUpperCase() + el.slice(1);
                return el;
              })
              .join(' / ')
          }`}</span> */
}

// class PokDetails extends Component {
//   componentDidMount() {
//     this.props.getPokDetail(this.props.match.params.id);
//   }

//   render() {
//     return (
//       <div className="pokDetail">
//         <p>{this.props.pokDetail.name}</p>
//         {/* <p>{selectedProduct.director}</p>
//       <p>{selectedProduct.description}</p>
//       <p>{selectedProduct.releaseYear}</p> */}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     pokDetail: state.pokDetail,
//   };
// };

// const mapDispatchToProps = { getPokDetail: actions.getPokDetail };

// export default connect(mapStateToProps, mapDispatchToProps)(PokDetails);

import { APIKEY } from "../../constants/key/Apikey.js";
import { baseUrl } from "../../constants/baseurl/baseUrl";


/*****  Fetch Begin action generatorr func *****/

const fetchMoviesStart = () => ({
    type: "FETCH_MOVIES_START"
});



/*****  Fetch Finish action generatorr func *****/

const fetchMoviesFinish = (movies = []) => ({
    type: "FETCH_MOVIES_FINISH",
    movies
});

/*****  Fetch Fail action generatorr func *****/

const fetchMoviesFail = ( error = "") => ({
    type: "FETCH_MOVIES_FAIL",
    error
});


/*******  Action of Fetching  ******/
/* the Base url used for all movies categories */

const lang = "&language=en-US&page=1";

const categoryObj = {
  "top-rated": "top_rated?api_key=",
  "upcoming": "upcoming?api_key=",
  "now-playing": "now_playing?api_key="
}

const makeUrl = category => baseUrl + categoryObj[category] + APIKEY + lang;

export function fetchMovies(cat) {

  const url = makeUrl(cat);

  return async dispatch => {
      dispatch(fetchMoviesStart());
      try {
        const res = await fetch(url);
        const data = await res.json();
        dispatch(fetchMoviesFinish(data.results));
      } catch (error) {
        dispatch(fetchMoviesFail(error));
      }

  }
}





/* All Movies Reducers */

const allMoviesInitialState = {
    movies: [],
    loading: false,
    error: null
}

export const allMoviesReducer = (state = allMoviesInitialState, action) => {
    switch (action.type) {
        case "FETCH_MOVIES_BIGIN":
            return {
                ...state,
                loading: true,
                error: null
            };
        case "FETCH_MOVIES_FINISH":
            return {
                ...state,
                movies: [...action.movies],
                loading: false,
                error: null
            };
        case "FETCH_MOVIES_FAIL":
            return {
                ...state,
                movies: [],
                loading: false,
                error: action.error
            };
        default:
            return state;
    }
};
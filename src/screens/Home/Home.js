import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import Spinner from 'react-bootstrap/Spinner';
import {fetchMovies} from "../../shared/redux/ducks/movies";
import getVisibleMovieList from "../../shared/redux/selectorForSearch/visibleMovies";
import Movie from "../../components/Movie";
import Search from "../../components/Search";
import Filter from "../../components/Filter";

/* Home Component */

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "top-rated",
            movieAdded: false,
            text: ""
        }
    }
    componentDidMount() {
        // to solve re-rendering of component
        if ( this.props.movies.length === 0) {
            this.props.dispatch(fetchMovies(this.state.filter));  
        }
        this.props.dispatch(fetchMovies("top-rated"));
        this.props.history.push("/");
    }
    handleAddToFavClick = (movieToFavId) => {

        let favMoviesArrayString;
        let favMoviesArraySaved;

        // get the clicked movie obj
        const chosedMovie = this.props.movies.filter(movie => {
            return movie.id === parseInt(movieToFavId);
        });
        // get local storage array data
        const localStorageLength = localStorage.length;
        if ( localStorageLength === 0) {
            favMoviesArrayString = JSON.stringify(chosedMovie);
            favMoviesArraySaved = localStorage.setItem("fav_movies", favMoviesArrayString);
        } else if ( localStorageLength > 0 ) {
            // get array of objects exists in local store
            const locStorArray = JSON.parse(localStorage.getItem("fav_movies"));

            // get array of ids exists in local store
            const locStorIds = locStorArray.map(arr => arr.id);

            if ( !locStorIds.includes(parseInt(movieToFavId)) ) {
                const newLocStorArray = locStorArray.concat(chosedMovie);
                favMoviesArrayString = JSON.stringify(newLocStorArray);
                favMoviesArraySaved = localStorage.setItem("fav_movies", favMoviesArrayString);
            } else {
                favMoviesArrayString = JSON.stringify(locStorArray);
                favMoviesArraySaved = localStorage.setItem("fav_movies", favMoviesArrayString);
            }
        }
    }

    render() {

        const { movies, loading, error } = this.props;
        const  visibleMovieList = getVisibleMovieList(movies, this.state.text);

        if (error) {
            return <div className="fetch_error">There is No Data Available </div>
        } else if (loading) {
            return  (
                <div>
                    <Filter />
                    <Search />
                    <div className="loading_page">
                        <Spinner animation="border" children />
                        <FontAwesomeIcon icon={faFilm} size="1x"/>
                    </div>
                </div>
            )
        }

        return (
            <div>
                <Filter that={this} props={this.props} filter={this.state.filter}/>
                <Search 
                    hanldeChangeInput={(text) => {
                            this.setState(() => ({ text }));
                        }
                    }
                />
                <section className="movies">
                    <div>
                        {
                            visibleMovieList.length > 0 ?
                            visibleMovieList.map((movie,index) => 
                            <Movie 
                                key={index}
                                id={movie.id}
                                poster={movie.poster_path}
                                title={movie.title}
                                desc={movie.overview}
                                vote={movie.vote_average * 10}
                                handleAddToFavClick={this.handleAddToFavClick}
                            />
                            ) : 
                            (<p className="not_found_search">No Result Found !!...</p>)
                        }
                    </div>
                </section>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies,
        loading: state.movies.loading,
        error: state.movies.error,
        filter: state.filters.text
    }
};

export default connect(mapStateToProps)(Home);
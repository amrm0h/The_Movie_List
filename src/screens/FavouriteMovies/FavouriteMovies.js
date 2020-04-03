import React from "react";
import Movie from "../../components/Movie";

/* FavotiteMovies Component */
class FavouriteMovies extends React.Component {
    state = {
        favMovies: []
    };

    componentDidMount() {
        const json = localStorage.getItem("fav_movies");

        if (json) {

            // get array of favs movies in local storage
            const myFavMovies = JSON.parse(json);

            this.setState((prevState) => ({
                favMovies: prevState.favMovies.concat(myFavMovies)
            }));
        }
    }
    componentDidUpdate() {
        const json = localStorage.getItem("fav_movies");
        let arr = JSON.parse(json);

        if ( arr ) {
            arr = this.state.favMovies;
            const newArr = JSON.stringify(arr);
            const updatedLocStorage = localStorage.setItem("fav_movies", newArr);
        }
    }
    handleRemoveFromFavClick = (movieToRemId) => {
        this.setState((prevState) => ({
            favMovies: prevState.favMovies.filter(movie => {
                return parseInt(movieToRemId, 10) !== movie.id;
            })
        }));
    }
    render() {
        const favMoviesLength = this.state.favMovies.length;
        return (
            <section className="movies fav">
                { favMoviesLength > 0 && 
                    <h1>
                        Your Favourite Movies
                        <button
                            onClick={() => {
                                this.setState( () => ({ favMovies: [] }) )
                                }
                            }
                        >Remove All</button>
                    </h1>}

                <div>
                    {
                        favMoviesLength > 0 ? 
                        this.state.favMovies.map(fav => (
                            <Movie
                                key={fav.id}
                                id={fav.id}
                                title={fav.title}
                                poster={fav.poster_path}
                                desc={fav.overview}
                                vote={fav.vote_average * 10}
                                isFaved={true}
                                handleRemoveFromFavClick={this.handleRemoveFromFavClick}
                            />
                        )) :
                        <p className="no_fav">No Favourite Movies Yet ...</p>
                    }
                </div>
            </section>
        );
    }
}

export default FavouriteMovies;
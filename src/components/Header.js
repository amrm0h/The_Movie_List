import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovies } from "../shared/redux/ducks/movies";

/* Header */

const Header = (props) => {

    const onPath = (match, location, paths) => {
        return paths.includes(location.pathname);
    };

    return (
        <header>
            <div className="container d-flex">
                <h1
                    style={{cursor: "pointer"}}
                    onClick={() => {
                            if ( window.location.pathname === "/favourites" ) {
                                props.dispatch(fetchMovies("top-rated"));
                            }
                        }
                    }
                >
                <Link to="/">Movies</Link>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                to="/" 
                                activeClassName="selected" 
                                exact
                                isActive={ 
                                    () => 
                                    onPath(window.match, window.location, ["/", "/movie/upcoming", "/movie/now-playing"])
                                    }
                            >
                                <span>Home</span>
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to="/favourites" activeClassName="selected">
                                <span>Favourites</span>
                            </NavLink>
                        </li>

                    </ul>
                </nav>
            </div>
        </header>
    );
}


const mapStateToProps = (state) => {
    return {
        movies: state.movies.movies
    }
};


export default connect(mapStateToProps)(Header);
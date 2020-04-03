import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { fetchMovies } from "../shared/redux/ducks/movies";

const Filter = (props) => (
    <section className="filter" >
        <label>Filter <FontAwesomeIcon icon={faFilter} /></label>
        <select 
            onChange={(e) => {
                const target = e.target.value;
                if ( target === "top-rated" ) {
                    props.props.history.push("/");
                } else {
                    props.props.history.push("/movie/" + target);
                }
                props.props.dispatch(fetchMovies(target));
                props.that.setState(() => ({ filter: target}));
            }}
            value={props.filter}
        >
            <option value="top-rated">Top Rated</option>
            <option value="upcoming">Upcoming</option>
            <option value="now-playing">Now Playing</option>
        </select>
    </section>
);

export default Filter;
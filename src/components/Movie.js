import React from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';

const Movie = (props) => {
    const baseUrl = "https://image.tmdb.org/t/p/w220_and_h330_face";
    return (
        <div className="movie_card">
            <img src={baseUrl + props.poster} alt="" />
            <article>
                <h4>{props.title}</h4>
                <div> 
                    <ProgressBar 
                        striped 
                        animated 
                        variant="success"
                        now={props.vote}  
                        label={`${props.vote} %`} 
                    />
                </div>
            </article>
            <div>
                <p>About:</p>
                <p>{props.desc.slice(0,100)}</p>
                <button
                    id={props.id}
                    onClick={
                        (e) => {
                            const text = e.target.textContent;
                            const id = e.target.id;
                            if (text === "Add To Favourites") {
                                props.handleAddToFavClick(id);
                                e.target.textContent = "Added";
                            } else if (text === "Remove") {
                                props.handleRemoveFromFavClick(id);
                            }
                        }
                    }
                >
                {!props.isFaved ? "Add To Favourites" : "Remove"}
                </button>
            </div>
        </div>
    );
};

export default Movie;





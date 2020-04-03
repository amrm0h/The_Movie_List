


/* Function run to search for movies and filter them  */

const getVisibleMovieList = (movies, text) => {

    return movies.filter(mov => {
        
        const title = mov.title.toLowerCase().includes(text.toLowerCase());

        return title;

    });    
};


export default getVisibleMovieList;



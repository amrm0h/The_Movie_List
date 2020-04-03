
/* Filters Reducer */

const filtersInitialState = {
    text: "",
    category: "ALL" // "top-rated" - "upcoming" - "now-playing"
};

export const filtersReducer = (state = filtersInitialState, action) => {
    switch (action.type) {
        case "SET_TEXT_FILTER":
            return {
                ...state,
                text: action.text
            };
        default:
        return state;
    }
};

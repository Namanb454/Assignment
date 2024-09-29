import { FETCH_PRODUCTS_SUCCESS, FETCH_CATEGORIES_SUCCESS, SET_SELECTED_CATEGORY, SET_SEARCH } from './actions';

const initialProductState = {
    products: [],
    search: '',
    category: '',
};

export const productReducer = (state = initialProductState, action) => {
    switch (action.type) {
        case FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: [...state.products, ...action.payload],
            };
        case SET_SEARCH:
            return {
                ...state,
                search: action.payload,
                products: [],
            };
        case SET_SELECTED_CATEGORY:
            return {
                ...state,
                category: action.payload,
                products: [],
            };
        default:
            return state;
    }
};

export const categoryReducer = (state = [], action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_SUCCESS:
            return action.payload;
        default:
            return state;
    }
};

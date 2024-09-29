import axios from 'axios';

export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const SET_SELECTED_CATEGORY = 'SET_SELECTED_CATEGORY';
export const SET_SEARCH_TERM = 'SET_SEARCH_TERM';

export const fetchProducts = (category = '', search = '', skip = 0, limit = 10) => {
    return async (dispatch) => {
        let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
        if (category) url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
        if (search) url = `https://dummyjson.com/products/search?q=${search}&limit=${limit}&skip=${skip}`;

        const { data } = await axios.get(url);
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: data.products });
    };
};

export const fetchCategories = () => {
    return async (dispatch) => {
        const { data } = await axios.get('https://dummyjson.com/products/categories');
        dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: data });
    };
};

export const setSelectedCategory = (category) => ({
    type: SET_SELECTED_CATEGORY,
    payload: category,
});

export const setSearchTerm = (term) => ({
    type: SET_SEARCH_TERM,
    payload: term,
});

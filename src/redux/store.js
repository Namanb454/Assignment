import { configureStore } from '@reduxjs/toolkit'
import { productReducer, categoryReducer } from './reducers';


export const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoryReducer,
    },
})
import { createSlice } from '@reduxjs/toolkit';
import { Product } from './product.request';
import { fetchProducts } from './product.request';
import { getUniqueCategories } from '../store.utils';
import productData from './product.data';


const initialState = {
	products: productData as Product[],
	status: 'idle' as 'idle' | 'success' | 'failed',
	categories: getUniqueCategories(productData) as Array<Product['category']>,
};

const productSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.products = action.payload;
			state.status = 'success';
			state.categories = getUniqueCategories(action.payload);
		});
	},
	selectors: {
		selectCategories: (state) => state.categories,
		selectProducts: (state) => state.products,
		selectProductsStatus: (state) => state.status,
	},
});

export const { selectProducts, selectCategories, selectProductsStatus } =
	productSlice.selectors;

export default productSlice.reducer;

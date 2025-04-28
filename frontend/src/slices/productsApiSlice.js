import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all products (HomeScreen)
    getProducts: builder.query({
      query: ({ keyword, pageNumber = '' }) => ({
        url: `${PRODUCTS_URL}`,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
    }),

    // Get a single product
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    // Create new product (Brand only)
    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),

    // Update product (Brand only)
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    // Upload product image
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    // Delete product (Brand only)
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Create a new review
    createReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
      invalidatesTags: ['Product'],
    }),

    // Delete a review
    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    // Get Top Products (Carousel)
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),

    // 🚀 Get MY products (brand owner's products only)
    getMyProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/myproducts`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useDeleteReviewMutation,
  useGetTopProductsQuery,
  useGetMyProductsQuery,  // ✅ Added for brand owner dashboard
} = productsApiSlice;

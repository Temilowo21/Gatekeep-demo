import { PRODUCTS_URL, UPLOAD_URL } from '../constants';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber = '' }) => ({
        url: `${PRODUCTS_URL}`,
        params: { pageNumber, keyword },
      }),
      keepUnusedDataFor: 5,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (product) => ({
        url: PRODUCTS_URL,
        method: 'POST',
        body: product,
      }),
      invalidatesTags: ['Product'],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data._id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Product'],
    }),

    // ✅ Only keep ONE correct uploadProductImage
    uploadProductImage: builder.mutation({
      query: (formData) => ({
        url: `${UPLOAD_URL}`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    createReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews`,
        method: 'POST',
        body: { rating, comment },
      }),
      invalidatesTags: ['Product'],
    }),

    deleteReview: builder.mutation({
      query: ({ productId, reviewId }) => ({
        url: `${PRODUCTS_URL}/${productId}/reviews/${reviewId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),

    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),

    getMyProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/myproducts`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

// ✅ Exports
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
  useGetMyProductsQuery,
} = productsApiSlice;

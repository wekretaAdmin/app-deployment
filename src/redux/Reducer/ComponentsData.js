import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const accessKey = 'c79999bf-c4ae-11ee-abf7-02feba6da81d';

// 'c7c11d33-c0f0-11ee-8f56-02feba6da81d';

//   'cb910d4a-bf60-11ed-814d-0252190a7100'; // maati
export const ComponetsData = createApi({
  reducerPath: 'ComponetsData',
  baseQuery: fetchBaseQuery({
    //   baseUrl: 'https://storeapi.wekreta.in/api/v4/',
    baseUrl: 'https://storestaging.krenai.in/api/v4/',
  }),
  endpoints: builder => ({
    // getAppTemplate: builder.query({
    //   query: () => `/configuration/store-front-design?accessKey=${accessKey}`,
    // transformResponse: (response) => {
    //   // const sortedConfigData = [...response.object].sort(
    //   //   (a, b) => parseFloat(a.section.value) - parseFloat(b.section.value)
    //   // );
    //   const filteredConfigData = response.object.filter(
    //     (section) => parseFloat(section.section.value) > 0
    //   );
    //   const sortedConfigData = [...filteredConfigData].sort(
    //     (a, b) => parseFloat(a.section.value) - parseFloat(b.section.value)
    //   );
    //   return sortedConfigData;
    // },
    // }),

    getCategoryWiseProducts: builder.query({
      query: itemsPerPage =>
        `product/public/catagory-wise?accessKey=${accessKey}&itemsPerCategory=${itemsPerPage}&secondaryKey=`,
      transformResponse: response => {
        const categories = Object.keys(response.object || {});
        const temp = categories.map(category => ({
          category,
          products: response.object[category]?.products || [],
          totalItems: response.object[category]?.totalItems || 0,
        }));
        return temp;
      },
    }),

    getCollections: builder.query({
      query: () => {
        const queryString = `collection/abstract/app?search=&searchBy=&currentPage=1&itemsPerPage=10&accessKey=${accessKey}`;
        console.log('Query being hit:', queryString); // Log the query
        return queryString;
      },
      transformResponse: response => {
        const transformedData = response.object.map(item => ({
          mediaUrl: item.mediaUrl,
          name: item.name,
          description: item.description,
        }));
        return transformedData;
      },
    }),

    getProductDetails: builder.query({
      query: ({productId, sizeChartPreference}) =>
        `product/detail?accessKey=${accessKey}&productId=${productId}&sizeChartPreference=&categoryName=`,
      transformResponse: response => {
        const ProductDetail =
          response && response.object ? response.object : null;
        return ProductDetail;
      },
    }),

    getSimilarProducts: builder.query({
      query: ({productId, currentPage}) =>
        `product/similar?accessKey=${accessKey}&productId=${productId}&secondaryKey=&itemsPerPage=6`,
      transformResponse: response => {
        const SimilarProducts =
          response && response.object ? response.object : null;

        return SimilarProducts;
      },
    }),

    getProductList: builder.query({
      // query: () =>
      //   `product/customer?id=0&productName=&categoryName=&subCategoryName=&subSubCategoryName=Western-Clothes&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&accessKey=${accessKey}`,
      query: (subSubCategoryName, subCategoryName) => {
        const queryString = `product/customer?id=0&productName=&categoryName=&subCategoryName=${subCategoryName}&subSubCategoryName=${subSubCategoryName}&brandName=&isFeatured=0&search=&currentPage=1&itemsPerPage=27&sortBy=createdDate&sortOrder=desc&isFetchListing=0&searchTag=&accessKey=${accessKey}`;
        console.log('Request URL:', queryString);
        return queryString;
      },
      transformResponse: response => {
        // console.log('response', reponse);
        const transformedData = response.object.map(item => ({
          id: item.id,
          name: item.name,
          subCategories: item.subCategories,
          mediaUrl: item.mediaUrl,
          description: item.description,
          mobileBannerUrl: item.mobileBannerUrl,
          variants: item.variants[0],
          promotionalTag: item.promotionalTag,
        }));
        return transformedData;
      },
    }),
  }),
});
export const {
  useGetCategoryWiseProductsQuery,
  useGetCollectionsQuery,
  useGetProductDetailsQuery,
  useGetSimilarProductsQuery,
  useGetProductListQuery,
} = ComponetsData;
export default ComponetsData;

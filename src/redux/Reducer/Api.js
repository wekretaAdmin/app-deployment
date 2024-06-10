import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const accessKey = 'c79999bf-c4ae-11ee-abf7-02feba6da81d';
// staging
// 'c7c11d33-c0f0-11ee-8f56-02feba6da81d';
// maati
// 'cb910d4a-bf60-11ed-814d-0252190a7100';
// const accessKey = 'fb9c0080-b5bf-11ee-807b-02d24e9436bf';
const AccountStore = 'https://accountstaging.krenai.in/api/v4';
// 'https://accountapi.wekreta.in/api/v4';

export const Api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: AccountStore}),
  endpoints: builder => ({
    getAppTemplate: builder.query({
      query: () => `/configuration/store-front-design?accessKey=${accessKey}`,
      transformResponse: response => {
        const filteredConfigData = response.object.filter(
          section => parseFloat(section.section.value) > 0,
        );
        const sortedConfigData = [...filteredConfigData].sort(
          (a, b) => parseFloat(a.section.value) - parseFloat(b.section.value),
        );
        return sortedConfigData;
      },
    }),
    getProductStyles: builder.query({
      query: () => `/configuration/store-front-design?accessKey=${accessKey}`,
      transformResponse: response => {
        const ProductDetail = response;
        return ProductDetail;
      },
    }),

    getMobileOtp: builder.query({
      query: phone => {
        const queryString = `customer/otp?accessKey=${accessKey}&phone=${phone}`;
        console.log('Query being hit final:', queryString); // Log the query
        return queryString;
      },
      transformResponse: response => {
        const transformedData =
          response && response.object ? response.object : null;

        return transformedData;
      },
    }),

    getMobileVerification: builder.query({
      query: (phone, otp) => {
        const queryString = `customer/login?accessKey=${accessKey}&phone=${phone}&otp${otp}`;
        console.log('Query being hit final:', queryString); // Log the query
        return queryString;
      },
      transformResponse: response => {
        // console.log('response', reponse);
        const transformedData =
          response && response.object ? response.object : null;

        return transformedData;
      },
    }),

    // getComponentsData: builder.query({
    //   // Customizing baseQuery for this endpoint
    //   baseQuery: fetchBaseQuery({ baseUrl: 'https://storestaging.krenai.in' }),
    //   query: () => `/banner/customer?accessKey=${accessKey}`,
    // }),
    // getUserProfile : builder.query({
    // query:() => `/banner/customer?accessKey=${accessKey}`
    // }),
  }),
});
export const {
  useGetAppTemplateQuery,
  useGetProductStylesQuery,
  useGetMobileOtpQuery,
  useGetMobileVerificationQuery,
} = Api;
export default Api;

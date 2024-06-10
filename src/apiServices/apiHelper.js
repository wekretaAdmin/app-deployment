// staging
export const StoreManager = 'https://storestaging.krenai.in/api/v4/';
export const AccountManager = 'https://accountstaging.krenai.in/api/v4/';
export const accessKey = 'c79999bf-c4ae-11ee-abf7-02feba6da81d';

//maati

// export const accessKey = 'cb910d4a-bf60-11ed-814d-0252190a7100';

// inchpaper;
// export const StoreManager = 'https://storeapi.wekreta.in/api/v4/';
// export const AccountManager = 'https://accountapi.wekreta.in/api/v4/';

// export const accessKey = '384d75e3-da9b-11ed-a04d-0ac4f9bac0be';

// homePageUrl categoryListing
export const HomePageCategoryListing = () =>
  `${StoreManager}category/abstract?accessKey=${accessKey}&isWeb=0`;

// subCategoryWiseList
export const subCategoryWiseList = categoryId =>
  `${StoreManager}product/public/app/sub-category-wise?accessKey=${accessKey}&categoryId=${categoryId}&itemsPerPage=6`;

//   productListing
export const ProductListApi = (
  subCategoryName,
  subSubCategoryName,
  categoryName,
  currentPage,
  itemsPerPage,
  search = '',
  sortBy = '',
  sortOrder = '',
  brandName = '',
) =>
  `${StoreManager}product/customer?id=0&productName=&categoryName=${categoryName}&subCategoryName=${subCategoryName}&subSubCategoryName=${subSubCategoryName}&brandName=${brandName}&isFeatured=0&search=&currentPage=${currentPage}&itemsPerPage=${itemsPerPage}&sortBy=${sortBy}&sortOrder=${sortOrder}&isFetchListing=0&searchTag=${search}&accessKey=${accessKey}`;

// productDetailApi
export const ProductDetailApi = productId =>
  `${StoreManager}product/detail?accessKey=${accessKey}&productId=${productId}&sizeChartPreference=&categoryName=`;

// SimilarProducts
export const SimilarProductsDetailScreen = productId =>
  `${StoreManager}product/similar?accessKey=${accessKey}&productId=${productId}&secondaryKey=&itemsPerPage=6`;

export const AddToCart = () =>
  `${StoreManager}provisional-cart/public/customer/add?accessKey=${accessKey}`;

export const GetCard = (
  secondaryKey = '',
  couponCode = '',
  paymentServiceId = '',
  deliveryCharges = '',
) =>
  `${StoreManager}provisional-cart/public/customer/get?couponCode=${couponCode}&giftWrap=0&message=&flag=0&giftCardCode=&deliveryCharges=${deliveryCharges}&specialDeliveryLocationCharges=0&accessKey=${accessKey}&paymentServiceId=${paymentServiceId}&secondaryKey=${secondaryKey}`;

// mergeCart
export const MergeCart = secondaryKey =>
  `${StoreManager}provisional-cart/merge?accessKey=${accessKey}&secondaryKey=${secondaryKey}`;

//address
export const CreateAddress = () =>
  `${AccountManager}customer-address/create?accessKey=${accessKey}`;

export const fetchAddress = () =>
  `${AccountManager}customer-address/get?accessKey=${accessKey}`;

export const setAddress = (shipTo, billTo) =>
  `${StoreManager}provisional-cart/address?accessKey=${accessKey}&shipTo=${shipTo}&billTo=${billTo}&reset=`;

//couponList
export const couponList = () =>
  `${StoreManager}coupon/customer?accessKey=${accessKey}&itemsPerPage=10&currentPage=1`;

// Wishlist
export const AddWishlist = productId =>
  `${StoreManager}wishlist?productId=${productId}&accessKey=${accessKey}`;

export const GetWishlist = () =>
  `${StoreManager}wishlist?accessKey=${accessKey}&itemsPerPage=10&currentPage=1`;

//refereshToken
export const RefreshToken = (refreshToken, idToken) =>
  `${AccountManager}user/refresh/access/token?refreshToken=${refreshToken}&idToken=${idToken}`;

//openSearch
export const OpenSearch = tags =>
  `${StoreManager}product/public/tags?tags=${tags}&accessKey=${accessKey}`;

export const brand = () =>
  `${StoreManager}brand/public?storeUuid=${accessKey}&itemsPerPage=10&currentPage=1&search=&searchBy=`;

// move wishlist to cart
export const moveCart = () =>
  `${StoreManager}wishlist/add?accessKey=${accessKey}`;

//remove from cart
export const RemovefromCart = (secondaryKey, skuCode) =>
  `${StoreManager}provisional-cart/public/customer/remove-cart-product?secondaryKey=${secondaryKey}&accessKey=${accessKey}&skuCode=${skuCode}`;

// get Payment Method
export const GetPayment = () =>
  `${AccountManager}payment/customer/service?accessKey=${accessKey}`;

// get verifyPayment
export const verifyPayment = paymentServiceId =>
  `${StoreManager}provisional-cart/customer/verify?paymentServiceId=${paymentServiceId}`;

//initiatePayment
export const InitiatePayment = paymentSource =>
  `${StoreManager}provisional-cart/initiate-payment?paymentMode=OFFLINE&paymentSource=${paymentSource}&deviceType=mobile&os=android&orderSource=APP&accessKey=${accessKey}`;

//checkOUT api

export const Checkoutcart = () => `${StoreManager}cart/customer/checkout`;

//incoice
export const OrderSuccesDetail = cartId =>
  `${StoreManager}cart/customer/invoice?cartId=${cartId}`;

//editAddress

export const EditAddress = AddressId =>
  `${AccountManager}customer-address/update/${AddressId}?accessKey=${accessKey}`;

//getCustomer
export const GetCustomer = () =>
  `${AccountManager}customer/get-customer?accessKey=${accessKey}`;

export const updateCustomer = () =>
  `${AccountManager}customer/update?accessKey=${accessKey}`;

//address Delete
export const DeleteAddress = addressId =>
  `${AccountManager}customer-address/delete/${addressId}?accessKey=${accessKey}`;

//orderLISTING

export const OrderListing = () =>
  `${StoreManager}cart/customer/order?statusId=0&itemsPerPage=10&currentPage=1&getAll=0&sortBy=orderDate&sortOrder=desc&id=0&searchBy=id&search=&accessKey=${accessKey}`;

//orderDetail
export const OrderDetailApi = orderId =>
  `${StoreManager}cart/customer/order/id?orderId=${orderId}`;

//get GiftCard
export const GetGiftCard = () =>
  `${StoreManager}gift-card/customer?search=&searchBy=code&currentPage=1&itemsPerPage=10&sortBy=createdDate&sortOrder=desc&accessKey=${accessKey}`;

//prodct-review
export const ProductReview = () =>
  `${StoreManager}product-review?accessKey=${accessKey}`;

//collection
export const CollectionApi = () =>
  `${StoreManager}collection/abstract/app?search=&searchBy=&currentPage=1&itemsPerPage=10&accessKey=${accessKey}`;

//categoryWise Product
export const HomeCategoryProduct = () =>
  `${StoreManager}product/public/catagory-wise?accessKey=${accessKey}&itemsPerCategory=6&secondaryKey=`;

// getwallet
export const getMainWallet = () =>
  `${AccountManager}wallet/customer?itemsPerPage=20&currentPage=1&accessKey=${accessKey}`;

//getPromoWallet
export const getPromoWallet = () =>
  `${AccountManager}wallet/customer/promo?itemsPerPage=10&currentPage=1&accessKey=${accessKey}`;

//walletSection
export const WalletPaymentInitiate = () =>
  `${StoreManager}webhook/helper?accessKey=${accessKey}`;

//walletPayemntsuccess
export const WalletCheckout = () =>
  `${AccountManager}wallet?accessKey=${accessKey}`;

//redeemgftcard
export const ReedemGiftCard = giftCardCode =>
  `${StoreManager}gift-card/credit-wallet?giftCardCode=${giftCardCode}&accessKey=${accessKey}`;

//wallet otp
export const walletSendOtp = amount =>
  `${AccountManager}wallet/customer/transaction/otp?amount=${amount}&accessKey=${accessKey}`;

//walletVerifyOTP

export const walletVerifyOtp = otp =>
  `${AccountManager}wallet/customer/verify/${otp}?accessKey=${accessKey}`;

//public Contact
export const ContactPublic = () =>
  `${StoreManager}contact/public?accessKey=${accessKey}`;

//storedetail
export const StoreDetail = () =>
  `${AccountManager}store/detail?accessKey=${accessKey}`;

//trackOrder
export const TrackOrder = orderId =>
  `${StoreManager}cart/activity/log/all?orderId=${orderId}&accessKey=${accessKey}&isApp=1`;

//editVarientinCart
export const editVarientInCart = () =>
  `${StoreManager}provisional-cart/public/customer/replace-variant?accessKey=${accessKey}`;

// configuration Store
export const ConfigurationStore = () =>
  `${AccountManager}configuration/store-front-design?accessKey=${accessKey}`;

//chatUpdatecount
export const ChatUpdate = () =>
  `${StoreManager}chat/update-count?accessKey=${accessKey}`;

import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { clearErrors, getProductDetails, getSimilarProducts } from '../../actions/productAction';
import { NextBtn, PreviousBtn } from '../Home/Banner/Banner';
import Loader from '../Layouts/Loader';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import { addToCart } from '../../actions/cartAction';
import { getDeliveryDate, getDiscount } from '../../utils/functions';
import MinCategory from '../Layouts/MinCategory';
import MetaData from '../Layouts/MetaData';

const ProductDetails = () => {

    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();    

    const { product, loading, error } = useSelector((state) => state.productDetails);
    const { cartItems } = useSelector((state) => state.cart);

    const settings = {
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const productId = params.id;

    const addToCartHandler = () => {
        dispatch(addToCart(productId));
        enqueueSnackbar("Product Added To Cart", { variant: "success" });
    }

    // const handleDialogClose = () => {
    //     setOpen(!open);
    // }

    const itemInCart = cartItems.some((i) => i.product === productId);

    const goToCart = () => {
        navigate('/cart');
    }

    const buyNow = () => {
        addToCartHandler();
        navigate('/shipping');
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(productId));
        // eslint-disable-next-line
    }, [dispatch, productId, error, enqueueSnackbar]);

    useEffect(() => {
        dispatch(getSimilarProducts(product?.category));
    }, [dispatch, product, product.category]);

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title={product.name} />
                    <MinCategory />
                    <main className="mt-12 sm:mt-0">

                        {/* <!-- product image & description container --> */}
                        <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">

                            {/* <!-- image wrapper --> */}
                            <div className="w-full sm:w-3/6 sm:sticky top-16 sm:h-screen">
                                {/* <!-- imgbox --> */}
                                <div className="flex flex-col gap-3 m-3">
                                    <div className="w-full h-full pb-6 border relative">
                                        <Slider {...settings}>
                                            {product.images && product.images.map((item, i) => (
                                                <img draggable="false" className="w-full h-96 object-contain" src={item.url} alt={product.name} key={i} />
                                            ))}
                                        </Slider>
    
                                    </div>

                                    <div className="w-full flex gap-3">
                                        {/* <!-- add to cart btn --> */}
                                        {product.stock > 0 && (
                                            <button onClick={itemInCart ? goToCart : addToCartHandler} className="p-4 w-1/4 flex items-center justify-center gap-2 text-white bg-green-300 rounded-sm shadow hover:shadow-lg">
                                                <ShoppingCartIcon />
                                                {itemInCart ? "GO TO CART" : "ADD TO CART"}
                                            </button>
                                        )}
                                        <button onClick={buyNow} disabled={product.stock < 1 ? true : false} className={product.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-100 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-4 w-1/4 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                                            <FlashOnIcon />
                                            {product.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                        </button>
                                        {/* <!-- add to cart btn --> */}
                                    </div>

                                </div>
                                {/* <!-- imgbox --> */}
                            </div>
                            {/* <!-- image wrapper --> */}

                            {/* <!-- product desc wrapper --> */}
                            <div className="flex-1 py-2 px-3">

                                {/* <!-- whole product description --> */}
                                <div className="flex flex-col gap-2 mb-4">

                                    <h2 className="text-xl">{product.name}</h2>
                                    {/* <!-- rating badge --> */}
                                    {/* <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                        <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{product.ratings && product.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} /></span>
                                        <span>{product.numOfReviews} Reviews</span>
                                    </span> */}
                                    {/* <!-- rating badge --> */}

                                    {/* <!-- price desc --> */}
                                    <span className="text-primary-green text-sm font-medium">Special Price</span>
                                    <div className="flex items-baseline gap-2 text-3xl font-medium">
                                        <span className="text-gray-800">${product.price/10?.toLocaleString()}</span>
                                        {/* <span className="text-base text-gray-500 line-through">${product.cuttedPrice/10?.toLocaleString()}</span> */}
                                        <span className="text-base text-primary-green">{getDiscount(product.price, product.cuttedPrice)}%&nbsp;off</span>
                                    </div>
                                    {product.stock <= 10 && product.stock > 0 && (
                                        <span className="text-red-500 text-sm font-medium">Hurry, Only {product.stock} left!</span>
                                    )}
                                    {/* <!-- price desc --> */}


                                    {/* <!-- delivery details --> */}
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-gray-500">Delivery</p>
                                        <span>Delivery by {getDeliveryDate()}</span>
                                    </div>
                                    {/* <!-- delivery details --> */}

                                    {/* <!-- highlights & services details --> */}
                                    <div className="flex flex-col sm:flex-row justify-between">
                                        {/* <!-- highlights details --> */}
                                        <div className="flex gap-16 mt-4 items-stretch text-sm">
                                            <p className="text-gray-500 font-medium">Highlights</p>

                                            <ul className="list-disc flex flex-col gap-2 w-64">
                                                {product.highlights?.map((highlight, i) => (
                                                    <li key={i}>
                                                        <p>{highlight}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        {/* <!-- highlights details --> */}

                                        
                                    </div>
                                    {/* <!-- highlights & services details --> */}

                                    {/* <!-- seller details --> */}
                                    <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                        <p className="text-gray-500">Seller</p>
                                        <div className="font-medium text-primary-black ml-3" >{product.brand && product.brand.name}</div>
                                    </div>
                                    {/* <!-- seller details --> */}

                                    {/* <!-- description details --> */}
                                    <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Description</p>
                                        <span>{product.description}</span>
                                    </div>
                                    {/* <!-- description details --> */}

                                    {/* <!-- border box --> */}
                                    <div className="w-full mt-6 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Product Description</h1>
                                        <div className="p-6">
                                            <p className="text-sm">{product.description}</p>
                                        </div>
                                    </div>
                                    {/* <!-- border box --> */}

                                    {/* <!-- specifications border box --> */}
                                    <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                                        <h1 className="px-6 py-4 border-b text-2xl font-medium">Specifications</h1>
                                        <h1 className="px-6 py-3 text-lg">General</h1>

                                        {/* <!-- specs list --> */}
                                        {product.specifications?.map((spec, i) => (
                                            <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                                <p className="text-gray-500 w-3/12">{spec.title}</p>
                                                <p className="flex-1">{spec.description}</p>
                                            </div>
                                        ))}
                                        {/* <!-- specs list --> */}

                                    </div>
                                    {/* <!-- specifications border box --> */}

                                    
                                </div>

                            </div>
                            {/* <!-- product desc wrapper --> */}

                        </div>

                    </main>
                </>
            )}
        </>
    );
};

export default ProductDetails;

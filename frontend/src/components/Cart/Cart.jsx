import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import MetaData from '../Layouts/MetaData';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import PriceSidebar from './PriceSidebar';

const Cart = () => {

    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const placeOrderHandler = () => {
        navigate('/login?redirect=shipping');
    }

    return (
        <>
            <MetaData title="Shopping Cart" />
            <main className="w-full mt-20">

                {/* <!-- row --> */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7">

                    {/* <!-- cart column --> */}
                    <div className="flex-1">

                        {/* <!-- cart items container --> */}
                        <div className="flex flex-col shadow bg-white">
                            <span className="font-medium text-lg px-2 sm:px-8 py-4 border-b">My Cart</span>

                            {cartItems && cartItems.length === 0 ? (
                                <EmptyCart />
                            ) : (
                                <>
                                    {cartItems.map((item) => (
                                        <CartItem {...item} inCart={true} />
                                    ))}
                                    <div className="flex justify-start">
                                        <button 
                                            onClick={placeOrderHandler} 
                                            className="bg-gradient-to-r from-green-400 to-blue-500 animate-pulse w-full sm:w-1/3 mx-2 sm:mx-6 my-4 py-3 font-medium text-white shadow hover:shadow-lg transition duration-200 transform hover:scale-105 rounded-sm"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                    </div>

                    <PriceSidebar cartItems={cartItems} />
                </div>

            </main>
        </>
    );
};

export default Cart;

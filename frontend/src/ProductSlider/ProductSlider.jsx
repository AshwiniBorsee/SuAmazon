import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRandomProductsByCategory } from '../../../utils/functions';
import Product from './Product';
import { categories } from '../../../utils/constants';

const ProductSlider = ({ title, tagline, category }) => {

    const { loading, products } = useSelector((state) => state.products);

    return (
        <section className="bg-white w-full shadow overflow-hidden">
            {/* <!-- header --> */}
            <div className="flex px-6 py-4 justify-between items-center">
                <div className="title flex flex-col gap-0.5">
                    <h1 className="text-xl font-medium text--600">{title}</h1>
                    <p className="text-sm text-grey-500">{tagline}</p>
                </div>
                <Link to="/products" className="bg-pink-500 text-xs font-medium text-white px-5 py-2.5 rounded shadow-lg uppercase">view all</Link>
            </div>
            <hr />
            {!loading && 
                <div className="grid grid-cols-5 gap-6 p-6 border border-pink-500 rounded"> {/* Adjust the number of columns as needed */}
                    {products && getRandomProductsByCategory(products, 10, category).map((product) => ( // Adjust the number of products as needed
                        <div className="border border-pink-500 rounded transform transition duration-500 hover:scale-105">
                            <Product {...product} key={product._id} />
                        </div>
                    ))}
                </div>
            }
        </section>
    );
};

export default ProductSlider;

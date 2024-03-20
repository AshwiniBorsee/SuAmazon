import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {getSimilarProducts} from '../../actions/productAction';
const categories = [
    "Electronics",
    "Mobiles",
    "Laptops",
    "Fashion",
    "Home & Furniture",
    "Others",
    "Offer Zone",
]

const MinCategory = () => {
    const dispatch = useDispatch();

    const handleCategoryClick = (category) => {
        dispatch(getSimilarProducts(category));
    };

    return (
        <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
            <div className="flex items-center justify-between p-0.5">
                {categories.map((el, i) => (
                    <Link 
                        to={`/products/${el}`} 
                        key={i} 
                        className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group"
                        onClick={() => handleCategoryClick(el)}
                    >
                        {el} 
                        <span className="text-gray-400 group-hover:text-primary-blue">
                            <ExpandMoreIcon sx={{ fontSize: "16px" }} />
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default MinCategory;

import { useEffect } from 'react';
import Banner from './Banner/Banner';
import ProductSlider from './ProductSlider/ProductSlider';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getSliderProducts } from '../../actions/productAction';
import { useSnackbar } from 'notistack';
import MetaData from '../Layouts/MetaData';
import MinCategory from '../Layouts/MinCategory';
const headerStyle = {
  background: 'linear-gradient(to right, pink, white)'
};

const Home = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      console.log('There is an error', error)
      enqueueSnackbar(error, { variant: "error" });
      dispatch(clearErrors());
    }
    dispatch(getSliderProducts());
  }, [dispatch, error, enqueueSnackbar]);

  return (
    <>
      <MetaData style={headerStyle} title="Fashion Ecommerce" />
      <MinCategory />
      <main className="flex flex-col gap-3 px-2 mt-16 sm:mt-2">
        <Banner />
        {!loading && <ProductSlider title={"Clothing & Fashion Wear"} tagline={"Inspired by your order"} category={'Fashion'}/>}
        {!loading && <ProductSlider title={"Mobiles"} tagline={"Based on Your Activity"}  category={'Mobiles'}/>}
       
        {!loading && <ProductSlider title={"Laptops"} tagline={"Based on Your Interest"} category={'Laptops'}/>}
        
        {!loading && <ProductSlider title={"Home & Appliances"} tagline={"Inspired by your order"} category={'Appliances'}/>}
      
      </main>
    </>
  );
};

export default Home;

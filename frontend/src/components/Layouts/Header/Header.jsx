import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Searchbar from './Searchbar';
import PrimaryDropDownMenu from './PrimaryDropDownMenu';
import SecondaryDropDownMenu from './SecondaryDropDownMenu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Header = () => {

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const { cartItems } = useSelector(state => state.cart);

  const [togglePrimaryDropDown, setTogglePrimaryDropDown] = useState(false);
  const [toggleSecondaryDropDown, setToggleSecondaryDropDown] = useState(false);

  const headerStyle = {
    background: 'linear-gradient(to right, pink, white)'
  };

  const titleStyle = {
    fontFamily: 'Pacifico',
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'left',
    color: 'white', // Change text color to dark blue
    fontStyle: 'italic', // Make the text italic
    paddingLeft: '20px',
  
};



  return (
    <header style={headerStyle} className="fixed flex top-0 py-2.5 w-full z-10">
        <div>
          <Link style={titleStyle} className="h-7 " to="/">
            SuAmazon
          </Link></div>
      <div className="w-full sm:w-9/12 px-1 sm:px-20 m-auto flex justify-between items-center relative">
        <div className="flex items-center flex-1 text-gray-800">
          {/* <Link style={titleStyle} className="h-7 ml sm:mr-30" to="/">
            SUamzon
          </Link> */}
          <Searchbar />
        </div>
        <div className="flex items-center justify-between ml-1 sm:ml-0 gap-0.5 sm:gap-7 relative">

          {isAuthenticated === false ?
            <Link to="/login" className="px-3 sm:px-9 py-0.5 text-grey bg-pink border font-medium rounded-sm cursor-pointer">Login</Link>
            :
            (
              <span className="userDropDown flex items-center text-grey font-medium gap-1 cursor-pointer" onClick={() => setTogglePrimaryDropDown(!togglePrimaryDropDown)}>{user.name && user.name.split(" ", 1)}
                <span>{togglePrimaryDropDown ? <ExpandLessIcon sx={{ fontSize: "16px" }} /> : <ExpandMoreIcon sx={{ fontSize: "16px" }} />}</span>
              </span>
            )
          }

          {togglePrimaryDropDown && <PrimaryDropDownMenu setTogglePrimaryDropDown={setTogglePrimaryDropDown} user={user} />}

          {toggleSecondaryDropDown && <SecondaryDropDownMenu />}

          <Link to="/cart" className="flex items-center left-10 text-grey font-medium gap-2 relative">
            <span><ShoppingCartIcon /></span>
            {cartItems.length > 0 &&
              <div className="w-5 h-5 p-2 bg-red-500 text-xs rounded-full absolute -top-2 left-3 flex justify-center items-center border">
                {cartItems.length}
              </div>
            }
            Cart
          </Link>
        </div>
        {/* <!-- right navs --> */}

      </div>
      {/* <!-- navbar container --> */}
    </header>
  )
};

export default Header;

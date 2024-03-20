import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../actions/userAction';
import { useSnackbar } from 'notistack';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser(email, password));
    }

    const redirect = location.search ? location.search.split('=')[1] : 'account';

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate(`/${redirect}`);
        }
    }, [dispatch, error, isAuthenticated, redirect, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Login | Ecommerce" />

            {loading && <BackdropLoader />}
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg justify-center">
                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden max-w-md mx-auto">

                        {/* <!-- edit info container --> */}
                        <div className="text-left py-10 px-4 sm:px-14">
                            {/* <!-- input container --> */}
                            <form onSubmit={handleLogin} className="bg-grey shadow-md rounded px-10 pt-10 pb-8 mb-10">
                            <Typography variant="h5" component="h2" marginBottom={2} color="#FF69B4"> 
                                    Login
                                </Typography>
                                <div className="mb-8 pt-6">
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* <!-- button container --> */}
                                <div className="flex items-center justify-between">
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ bgcolor: '#FF69B4', color: '#fff', '&:hover': { bgcolor: '#FF69B4' } }}
                                    >
                                        Login
                                    </Button>
                                </div>

                            </form>

                            <Link to="/register" className="font-medium text-sm text-grey">
                                New Customer? Create an account
                            </Link>
                        </div>

                    </div>
                </div>

            </main>
        </>
    );
};

export default Login;

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, signUpUser } from '../../actions/userAction';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { loading, isAuthenticated, error } = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: '',
        password: '',
        cpassword: '',
    });

    const { name, email, gender, password, cpassword } = user;

    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            enqueueSnackbar('Password length must be at least 8 characters', { variant: 'warning' });
            return;
        }
        if (password !== cpassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('gender', gender);
        formData.set('password', password);

        dispatch(signUpUser(formData));
    };

    const handleDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/');
        }
    }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Register | Ecommerce" />
            {loading && <BackdropLoader />}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#fff" // White background
            >
                <Box
                    component="form"
                    onSubmit={handleRegister}
                    noValidate
                    width={400} // Set width
                    p={3} // Add padding
                    boxShadow={3} // Add shadow
                    borderRadius={2} // Add border-radius
                >
                    <Typography variant="h5" component="h2" marginBottom={2} color="#FF69B4"> {/* Pink color */}
                        Sign Up
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        value={name}
                        onChange={handleDataChange}
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleDataChange}
                        autoComplete="email"
                    />
                    <RadioGroup
                        row
                        name="gender"
                        value={gender}
                        onChange={handleDataChange}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        <FormControlLabel value="male" control={<Radio required />} label="Male" />
                        <FormControlLabel value="female" control={<Radio required />} label="Female" />
                    </RadioGroup>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleDataChange}
                        autoComplete="new-password"
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="cpassword"
                        label="Confirm Password"
                        type="password"
                        id="confirm-password"
                        value={cpassword}
                        onChange={handleDataChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#FF69B4',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#FF69B4', // Keep the same color on hover
                            },
                            marginTop: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        Sign Up
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Link to="/login" style={{ textDecoration: 'none' }}>
                            <Button >Existing Customer? Login here</Button>
                        </Link>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Register;

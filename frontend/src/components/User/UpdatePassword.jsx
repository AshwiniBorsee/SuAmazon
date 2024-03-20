import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loadUser, changePassword } from '../../actions/userAction';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';
import { useNavigate } from 'react-router-dom';


const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const updatePasswordSubmitHandler = (e) => {
        e.preventDefault();

        if (newPassword.length < 8) {
            enqueueSnackbar('Password length must be at least 8 characters', { variant: 'warning' });
            return;
        }
        if (newPassword !== confirmPassword) {
            enqueueSnackbar("Passwords don't match", { variant: 'error' });
            return;
        }

        dispatch(changePassword({ oldPassword, newPassword, confirmPassword }));
    };

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar('Password Updated Successfully', { variant: 'success' });
            dispatch(loadUser());
            navigate('/account');

            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, isUpdated, navigate, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Password Update | Ecommerce" />
            {loading && <BackdropLoader />}
            <Box
                sx={{
                    mt: { xs: 12, sm: 20 },
                    mb: 7,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Box
                    sx={{
                        width: { sm: '33%' },
                        mt: { sm: 4 },
                        mb: 7,
                        bgcolor: 'background.paper',
                        boxShadow: '1',
                        overflow: 'hidden',
                    }}
                >
                    <Typography variant="h4" sx={{ my: 1,  textAlign: 'center', fontWeight: 'medium' }}>
                        Update Password
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={updatePasswordSubmitHandler}
                        sx={{ p: { xs: 2, sm: 4 } }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            fullWidth
                            label="Current Password"
                            type="password"
                            margin="normal"
                            name="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="New Password"
                            type="password"
                            margin="normal"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type="password"
                            margin="normal"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        
                        <Button
                            type="submit"
                            width="60%"
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#e60073', '&:hover': { bgcolor: '#e60073' } }}
                        >
                            Update
                        </Button>
                        <Button
                            display='flex'
                            component={RouterLink}
                            to="/account"
                            variant="outlined" // For an outlined button look
                            width="60%"
                            sx={{ mb: 2, mt: 3, ml:2, color: 'grey', borderColor: 'darkgrey', '&:hover': { borderColor: 'darkgrey', backgroundColor: 'rgba(255,165,0,0.1)' } }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default UpdatePassword;

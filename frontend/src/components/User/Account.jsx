import React, { useEffect } from 'react';
import Sidebar from './Sidebar'; // Adapt this component to MUI separately if needed
import { useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Loader from '../Layouts/Loader'; // Adapt this component to MUI separately if needed
import MinCategory from '../Layouts/MinCategory'; // Adapt this component to MUI separately if needed
import MetaData from '../Layouts/MetaData'; // Adapt this component to MUI separately if needed
import { Box, Grid, Typography, TextField, FormControlLabel, Radio, RadioGroup, Link, Paper } from '@mui/material';

const Account = () => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useSelector(state => state.user);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated, navigate]);

    const getLastName = () => {
        const nameArray = user.name.split(" ");
        return nameArray[nameArray.length - 1];
    };

    return (
        <>
            <MetaData title="My Profile" />
            {loading ? <Loader /> : (
                <>
                    <MinCategory />
                    <Box component="main" sx={{ mt: { xs: 12, sm: 0 } }}>
                        <Grid container spacing={3.5} justifyContent="center" sx={{ mt: { sm: 4 }, mb: 7 }}>
                            <Sidebar activeTab={"profile"} />
                            <Grid item xs={12} sm={8}>
                                <Paper elevation={0} sx={{ overflow: 'hidden', boxShadow: 1, p: { xs: 2, sm: 3 } }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                        
                                        {/* Personal Information Section */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                                Personal Information
                                                <Link component={RouterLink} to="/account/update" sx={{ ml: 2, typography: 'body2' }}>
                                                    Edit
                                                </Link>
                                            </Typography>
                                            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
                                                <TextField
                                                    label="First Name"
                                                    variant="outlined"
                                                    value={user.name.split(" ", 1)}
                                                    InputProps={{ readOnly: true }}
                                                    fullWidth
                                                />
                                                <TextField
                                                    label="Last Name"
                                                    variant="outlined"
                                                    value={getLastName()}
                                                    InputProps={{ readOnly: true }}
                                                    fullWidth
                                                />
                                            </Box>
                                        </Box>

                                        {/* Gender Selection Section */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Typography>Your Gender</Typography>
                                            <RadioGroup row name="gender" value={user.gender}>
                                                <FormControlLabel value="male" control={<Radio />} label="Male" disabled />
                                                <FormControlLabel value="female" control={<Radio />} label="Female" disabled />
                                            </RadioGroup>
                                        </Box>

                                        {/* Email Address Section */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Typography variant="h6">
                                                Email Address
                                                <Link component={RouterLink} to="/account/update" sx={{ ml: 2, typography: 'body2' }}>Edit</Link>
                                                <Link component={RouterLink} to="/password/update" sx={{ ml: 2, typography: 'body2' }}>Change Password</Link>
                                            </Typography>
                                            <TextField
                                                label="Email Address"
                                                variant="outlined"
                                                value={user.email}
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                            />
                                        </Box>

                                        {/* Mobile Number Section */}
                                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                            <Typography variant="h6">
                                                Mobile Number
                                                <Link component={RouterLink} to="/account/update" sx={{ ml: 2, typography: 'body2' }}>Edit</Link>
                                            </Typography>
                                            <TextField
                                                label="Mobile Number"
                                                variant="outlined"
                                                value="+919876543210"
                                                InputProps={{ readOnly: true }}
                                                fullWidth
                                            />
                                        </Box>

                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Box>
                </>
            )}
        </>
    );
};

export default Account;

import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useSnackbar } from 'notistack';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getUserInfo, updateUser } from '../../actions/userAction';
import { UPDATE_USER_RESET, REMOVE_USER_DETAILS } from '../../constants/userConstants';
import BackdropLoader from '../Layouts/BackdropLoader';
import MetaData from '../Layouts/MetaData';

const UpdateUser = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();
    const navigate = useNavigate();

    const { user, error, loading } = useSelector((state) => state.userDetails);
    const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [role, setRole] = useState("");

    const userId = params.id;

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("role", role);

        dispatch(updateUser(userId, formData));
    }

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserInfo(userId));
        } else {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setRole(user.role);
        }
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        if (updateError) {
            enqueueSnackbar(updateError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (isUpdated) {
            enqueueSnackbar("User Updates Successfully", { variant: "success" });
            dispatch({ type: UPDATE_USER_RESET });
            dispatch({ type: REMOVE_USER_DETAILS });
            navigate("/admin/users");
        }
    }, [dispatch, error, userId, user, navigate, isUpdated, updateError, enqueueSnackbar]);

    return (
        <>
            <MetaData title="Admin: Update User | Ecommerce" />

            {updateLoading && <BackdropLoader />}

            {loading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="flex flex-col bg-white shadow-lg rounded-lg mx-auto w-lg max-w-xl">
                        <h2 className="text-center text-2xl font-medium mt-6 text-gray-800">Update Profile</h2>

                        <form
                            onSubmit={updateUserSubmitHandler}
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-3 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male" checked={gender === "male"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" checked={gender === "female"} onChange={(e) => setGender(e.target.value)} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        label="Role"
                                        select
                                        fullWidth
                                        variant="outlined"
                                        required
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <MenuItem value={"user"}>User</MenuItem>
                                        <MenuItem value={"admin"}>Admin</MenuItem>
                                    </TextField>
                                </div>

                                <button type="submit" className="text-white py-3 w-full bg-pink-600 shadow hover:shadow-lg rounded-sm font-medium" >Update</button>
                                <Link className="hover:bg-gray-100 text-grey text-center py-3 w-full shadow border rounded-sm font-medium" to="/admin/users">Cancel</Link>
                            </div>

                        </form>

                    </div>
                </>
            )}
        </>
    );
};

export default UpdateUser;

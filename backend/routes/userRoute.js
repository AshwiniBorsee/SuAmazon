const express = require('express');
const { signUpUser, loginUser, logoutUser, getUserInfo, changePassword, changeProfile, fetchAllUsers, getUser, updateUserRole, deleteUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

const router = express.Router();

router.route('/register').post(signUpUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/me').get(isAuthenticatedUser, getUserInfo);


router.route('/password/update').put(isAuthenticatedUser, changePassword);

router.route('/me/update').put(isAuthenticatedUser, changeProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), fetchAllUsers);

router.route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;
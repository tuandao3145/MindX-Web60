var express = require("express");
var router = express.Router();

const {
	registerUser,
	authLogin,
	getUserProfile,
	updateUserProfile,
	getAllUsers,
	deleteUser,
	getUserByID,
	updateUserByID,
} = require("../controller/userControllers");

const { protect, checkIsAdmin } = require("../middleware/authMiddleware");

// 1. register a new user
// @desc: Register a new user
// @route: POST /api/users
// @access: Public - return token

router.post("/", registerUser);

// 2. Login
// @desc: User can login to the system
// @route: POST /api/users/login
// @access: Public - return token
router.post("/login", authLogin);

// 3. Get user's profile
// @desc: Get an user's profile
// @route: GET /api/users/profile
// @access: Private - user token
router.get("/profile", protect, getUserProfile);

// 4. Update user's profile
// @desc: Update an user's profile
// @route: PUT /api/users/profile
// @access: Private - user token
router.put("/profile", protect, updateUserProfile);

// 5. Get all users
// @desc: Get all users
// @route: GET /api/users/
// @access: Private/admin
router.get("/users", protect, checkIsAdmin, getAllUsers);

// 6. Delete user
// @desc: Delete a user
// @route: DELETE /api/users/:id
// @access: Private/admin
router.delete("/:id", protect, checkIsAdmin, deleteUser);

// 7. Get a user's profile by ID
// @desc: Get all users
// @route: GET /api/users/:id
// @access: Private/admin
router.get("/:id", protect, checkIsAdmin, getUserByID);

// 8. Update a user's profile by ID
// @desc: Get all users
// @route: PUT /api/users/:id
// @access: Private/admin
router.put("/:id", protect, checkIsAdmin, updateUserByID);

// export
module.exports = router;

const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/users.js");

router
    .route("/signup")
    .get( userController.renderSignUp)
    .post( wrapAsync (userController.signUp));


router
    .route("/login")
    .get( userController.renderLogIn)
    .post( 
        saveRedirectUrl,
        passport.authenticate("local", { failureRedirect: "/login", failureFlash: true }) ,
        wrapAsync(userController.logIn)
    );

router.get("/logout", userController.logOut);

module.exports = router;
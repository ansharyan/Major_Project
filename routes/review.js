const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateReview, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controller/reviews.js");
//create review
router.post("/",isLoggedIn,validateReview ,wrapAsync(reviewController.createReview));
  
  //delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.destroyReview));

module.exports = router;
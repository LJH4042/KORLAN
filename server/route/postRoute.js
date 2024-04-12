const express = require("express");
const router = express.Router();
const {
  getPost,
  addPost,
  detailPost,
  deletePost,
  updatePost,
} = require("../controller/postController");

router.route("/post").get(getPost);
router.route("/post/add").post(addPost);
router.route("/post/:id").get(detailPost).delete(deletePost);
router.route("/post/:id/update").put(updatePost);

module.exports = router;

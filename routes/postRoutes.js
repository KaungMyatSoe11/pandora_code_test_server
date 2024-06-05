const { Router } = require("express");
const {
  getAllPost,
  getPost,
  updatePost,
  createPost,
  deletePost,
} = require("../controllers/postController");

const router = Router();

router.route("/").get(getAllPost).post(createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;

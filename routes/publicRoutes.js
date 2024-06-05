const { Router } = require("express");
const { getAllPost, getPost } = require("../controllers/postController");

const router = Router();

router.route("/").get(getAllPost);
router.get("/:id", getPost);

module.exports = router;

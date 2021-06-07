const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtbyId,
  createThought,
  addReaction,
  updateThought,
  deleteThought,
  deleteReaction,
} = require("../../controllers/thought-controller");

router.route("/").get(getAllThoughts).post(createThought);

router
  .route("/:id")
  .get(getThoughtbyId)
  .put(updateThought)
  .delete(deleteThought);
router.route("/:thoughtId/reactions").post(addReaction);
router.route("/:thoughtId/:reactionId").delete(deleteReaction);

module.exports = router;

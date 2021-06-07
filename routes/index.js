const router = require("express").Router();

const apiRoutes = require("./api");
// use the api routes
router.use("/api", apiRoutes);

// responds with error code, displays on front end (if there was one)
router.use((req, res) => {
  res.status(404).send("<h1>ERROR 404 SOMETHING NOT FOUND</h1>");
});

module.exports = router;

const router = require("express").Router();
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// use userRoutes
router.use("/users", userRoutes);
// use thought routes
router.use("/thoughts", thoughtRoutes);

// exports router
module.exports = router;

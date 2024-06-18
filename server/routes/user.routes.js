const express = require("express");
const router = express.Router(); 

const userController = require("../controllers/userController");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUser);
router.post("/", userController.createUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.patch("/block/:id", userController.toggleBlock); 
module.exports = router; 

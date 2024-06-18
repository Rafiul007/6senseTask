const User = require("../models/user.model.js");

//create a user
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: savedUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
//get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
//get a single user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
//delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: deletedUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};
//block a user
exports.toggleBlock = async (req, res) => {
  try {
    // Find the user by ID
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Toggle the block status
    user.block = !user.block;
    // Save the updated user
    await user.save();
    res.status(200).json({
      success: true,
      message: `User ${user.block ? "blocked" : "unblocked"} successfully`,
      data: user,
    });
  } catch (error) {
      res.status(400).send(error);
  }
};

//update a user
exports.updateUser = async (req, res) => {
  try {
    // Ensure email cannot be updated
    if (req.body.email) {
      delete req.body.email;
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

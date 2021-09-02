const User = require("../models/user.model");

exports.register = async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

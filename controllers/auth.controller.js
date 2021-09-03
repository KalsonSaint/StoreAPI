const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
require("dotenv/config");

const { TOKEN_KEY } = process.env;
const secret = TOKEN_KEY;

// Register User Logic
exports.register = async (req, res) => {
  try {
    //   Get user input
    const { firstName, lastName, email, password, accountType, agreement } =
      req.body;

    if (!agreement) {
      return res.status(400).send({
        message: "User must accept terms and conditions",
        status: "error",
        data: null,
      });
    }

    // Validate User Input
    if (!(email && password && firstName && lastName && accountType)) {
      return res.status(400).send({
        message: "All Input Data is required",
        status: "error",
      });
    }

    // Check if User exist
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("Email is already taken.");
    }

    const user = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: bcrypt.hashSync(password, 10), // Encrypt Password
      accountType,
      agreement,
    };

    // Create User in DB
    const newUser = await User.create(user);

    //  Create Token
    const token = jwt.sign(
      {
        id: newUser._id,
        email,
      },
      secret,
      { expiresIn: "1h" }
    );

    const userRes = {
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      accountType: newUser.accountType,
    };

    return res.status(201).send({
      message: "User registration successful",
      status: "success",
      data: {
        user: userRes,
        accessToken: token,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

exports.login = async (req, res) => {
  try {
    // Get User Input
    const { email, password } = req.body;
    const insensitiveEmail = new RegExp(["^", email, "$"].join(""), "i");
    let user;

    if (email) {
      user = await User.findOne({
        $and: [{ email: insensitiveEmail }, { email: { $ne: null } }],
      });
    }
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!user || !passwordIsValid) {
      return res.status(404).send({
        message: "Invalid email or password",
        status: "error",
        data: null,
      });
    }

    // Create Token
    const token = jwt.sign({ id: user._id }, secret, { expiresIn: "1h" });

    return res.status(200).send({
      message: "User retrieved successfully",
      status: "success",
      data: {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          accountType: user.accountType,
        },
      },
      accessToken: token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      message: err.message,
      status: "error",
      data: null,
    });
  }
};

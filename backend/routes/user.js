const express = require("express");
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const router = express.Router();

const signupSchema = zod.object({
  username: zod.string().email(),
  firstName: zod.string().min(3, "Name is required"),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(200).json({
      message: "Email is already taken / Incorrect input",
      token: jwt,
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET,
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signInSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signInSchema.safeParse(req.body);

  if (!success) {
    return res.status(200).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign({
        userId: user._id,
    }, JWT_SECRET)

    return res.status(200).json({
      message: "Login successfully",
      token: token
    });
  }

  if(!user){
    return res.status(411).json({
        message: 'Error while loggin in'
    })
  }


});

module.exports = router;

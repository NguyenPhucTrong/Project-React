import bcryptjs from "bcryptjs";
import User from "../models/User";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 12);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save().then(() => {
      res.status(201).json({ message: "User created successfully" });
    });
  } catch (error) {
    next(error);
  }
};

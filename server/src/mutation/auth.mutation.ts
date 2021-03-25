import jwt from "jsonwebtoken";
import User from "../models/User.model";

export const login = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const username: String = args.username as String;
  const password: String = args.password as String;
  let token: String = "";
  const user = await User.findOne({ username, password });
  if (!user) throw Error("User not found");
  if (user) {
    token = jwt.sign(
      { userId: user._id, name: user?.get("name") },
      process.env.SECRET || "shadow",
      { expiresIn: "7days" }
    );
  }
  return {
    _id: user?.get("_id"),
    jwt: token,
    usernameme: user?.get("name"),
  };
};

export const register = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const username: String = args.username as String;
  const checkUser = await User.findOne({ username: args.username });
  // console.log(checkUser)
  if (checkUser) throw new Error("username already exit");
  return User.create(args);
};

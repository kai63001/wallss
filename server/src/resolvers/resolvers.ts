import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";
import jwt from "jsonwebtoken";

import { me ,users, user } from "../query/auth.query";
import { wallpapers } from "../query/wallpaper.query";

const resolvers = {
  Query: {
    me,
    users,
    user,
    wallpapers
  },
  Mutation: {
    login: async (parent: any, args: any, context: any, info: any) => {
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
    },
    addWallpaper: (parent: any, args: any, context: any, info: any) => {
      // console.log(context);
      console.log("addwallpaper");
      if (!context.user) throw new Error("Please login");
      const userId = context.user.userId || "";
      const date = Date.now();
      return Wallpaper.create({ ...args, date: date, user: userId });
    },
    register: async (parent: any, args: any, context: any, info: any) => {
      const username: String = args.username as String;
      const checkUser = await User.findOne({ username: args.username });
      // console.log(checkUser)
      if (checkUser) throw new Error("username already exit");
      return User.create(args);
    },
  },
};

export default resolvers;

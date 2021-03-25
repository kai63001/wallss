import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";
import jwt from "jsonwebtoken";

// Query
import { me ,users, user } from "../query/auth.query";
import { wallpapers,wallpaper } from "../query/wallpaper.query";

// Mutaiton
import { login, register } from "../mutation/auth.mutation"
import { addWallpaper } from "../mutation/wallpaper.mutation"


const resolvers = {
  Query: {
    me,
    users,
    user,
    wallpapers,
    wallpaper
  },
  Mutation: {
    login,
    register,
    addWallpaper
  },
};

export default resolvers;

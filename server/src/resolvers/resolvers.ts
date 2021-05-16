import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";
import jwt from "jsonwebtoken";

// Query
import { me ,users, user } from "../query/auth.query";
import { wallpapers,wallpaper } from "../query/wallpaper.query";
import { categoryPage } from "../query/category.query";

// Mutaiton
import { login, register } from "../mutation/auth.mutation"
import { addWallpaper } from "../mutation/wallpaper.mutation"
import { addCategory ,findCategory } from "../mutation/category.mutation"


const resolvers = {
  Query: {
    me,
    users,
    user,
    wallpapers,
    wallpaper,
    categoryPage
  },
  Mutation: {
    login,
    register,
    addWallpaper,
    addCategory,
    findCategory
  },
};

export default resolvers;

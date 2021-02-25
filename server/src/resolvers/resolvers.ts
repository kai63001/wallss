import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";


const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any, info: any) => User.find({}),
    
    users: (parent: any, args: any, context: any, info: any) => User.find({}),
    wallpapers: () => {
      return Wallpaper.find().populate('users')
    },
    user: (parent: any, args: { _id: any; } ,context: any, info: any) => {
      const id = args._id;
      const user = User.findById(id);

      return user;
    },
  },
  Mutation: {
    addWallpaper: (parent: any, args: any, context: any, info: any) => {
      return Wallpaper.create(args);
    },
  },
};

export default resolvers;

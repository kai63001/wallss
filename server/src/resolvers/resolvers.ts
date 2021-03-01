import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";
import jwt from "jsonwebtoken";

const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any, info: any) => User.find({}),
    
    users: (parent: any, args: any, context: any, info: any) => User.find({}),
    wallpapers: () => {
      return Wallpaper.find({}).populate('user')
    },
    user: (parent: any, args: { _id: any; } ,context: any, info: any) => {
      const id = args._id;
      const user = User.findById(id);

      return user;
    },
    login: async (parent: any, args: any, context: any, info: any) => {
      const username: String = args.username as String;
      const password: String = args.password as String;
      let token:String = "";
      const user = await User.findOne({username,password});
      if (!user) throw Error("User not found");
      if (user){
        token = jwt.sign({userId: user._id,name: user?.get("name")},process.env.SECRET || 'shadow', {expiresIn: '7days'});
      }
      return {_id:user?.get("_id"),jwt:token,usernameme:user?.get("name")};
    }
  },
  Mutation: {
    addWallpaper: (parent: any, args: any, context: any, info: any) => {
      console.log(context);
      if (!context.user) throw new Error("Please login");
      const userId = context.user.userId || '';
      return Wallpaper.create({...args, user: userId});
    },
    // addUser: (parent: any, args: any, context: any, info: any) => {
    //   return User.create(args);
    // }
  },
};

export default resolvers;

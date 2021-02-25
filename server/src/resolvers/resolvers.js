import User from "../models/User.model";
import Wallpaper from "../models/Wallpaper.model";

const user = UserId => {
  return User.findById(UserId)
    .then(u => {
      return { ...u._doc, id: u.id}
    })
    .catch(err => {
      throw err;
    })
}


const resolvers = {
  Query: {
    me: (parent, args, context, info) => User.find({}),
    
    users: (parent, args, context, info) => User.find({}),
    wallpapers: () => {
      // return Wallpaper.find()
      //   .populate('users')
      //   .then(walls => {
      //     return walls.map(wall => {
      //       return {
      //         ...wall._doc,
      //         usr: user.bind(this, ...wall._doc.users)
      //       }
      //     })
      //   })
      return Wallpaper.find().populate('users')
    },
    user: (parent, args ,context, info) => {
      const id = args._id;
      const user = User.findById(id);

      return user;
    },
  },
  Mutation: {
    addWallpaper: (parent, args, context, info) => {
      return Wallpaper.create(args);
    },
  },
};

export default resolvers;

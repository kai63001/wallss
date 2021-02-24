import Wallpaper from '../models/Wallpaper.model'

// Fake Database
const users = [
  {
    id: 1,
    name: "romeo",
  },
  {
    id: 2,
    name: "romeo2",
  },
  {
    id: 3,
    name: "romeo3",
  },
];

const me = users[0];

const resolvers = {
  Query: {
    me: (parent: any, args: any, context: any, info: any) => me,
    user: (parent: any, args: any, context: any, info: any) => {
      const id = args.id;
      const user = users.find((u) => u.id == id);

      return user;
    },
    users: (parent: any, args: any, context: any, info: any) => users,
  },
  Mutation : {
    addWallpaper: (parent: any, args: any, context: any, info: any) => {
      return Wallpaper.create(args);
    }
  }
};

export default resolvers;
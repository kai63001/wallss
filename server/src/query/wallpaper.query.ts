import Wallpaper from "../models/Wallpaper.model";

export const wallpapers = (parent: any, args: any, context: any, info: any) => {
  return Wallpaper.find({})
    .populate("user")
    .limit(args.limit || 9);
};

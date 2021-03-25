import Wallpaper from "../models/Wallpaper.model";

export const wallpapers = (parent: any, args: any, context: any, info: any) => {
  return Wallpaper.find({})
    .populate("user")
    .sort("-date")
    .limit(args.limit || 9);
};

export const wallpaper = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  const wall = Wallpaper.findById(args._id).populate("user");

  return wall;
};


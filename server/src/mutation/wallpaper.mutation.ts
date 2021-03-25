import Wallpaper from "../models/Wallpaper.model";

export const addWallpaper = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // console.log(context);
  console.log("addwallpaper");
  if (!context.user) throw new Error("Please login");
  const userId = context.user.userId || "";
  const date = Date.now();
  return Wallpaper.create({ ...args, date: date, user: userId });
};

import Wallpaper from "../models/Wallpaper.model";

export const addWallpaper = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // console.log(context);
  console.log("addwallpaper");
  if (!context.user) throw new Error("Please login"); //! auth
  const userId = context.user.userId || "";
  const date = Date.now();
  const {image,name,tags,author,resolution,categoly}  = args;
  const tagsData = tags.split(',')
  return Wallpaper.create({ image,name,tags:tagsData,author,resolution,categoly, date: date, user: userId });
};

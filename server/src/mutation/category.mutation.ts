import Category from "../models/Category.model";

export const addCategory = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // console.log(context);
  console.log("addcategory");
  if (!context.user) throw new Error("Please login"); //! auth
  const {name}  = args;
  const findCat = await Category.find({name}).lean()
  console.log(findCat)
  if(findCat.length > 0)
    return findCat
  return Category.create({ name });
};

export const findCategory = async (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
    
    const {name} = args;
    console.log("name:",name)
    return Category.find({name: {$regex: name, $options: 'i'}}).lean();
};
import Category from "../models/Category.model";

export const addCategory = (
  parent: any,
  args: any,
  context: any,
  info: any
) => {
  // console.log(context);
  console.log("addcategory");
  if (!context.user) throw new Error("Please login"); //! auth
  const {name}  = args;
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
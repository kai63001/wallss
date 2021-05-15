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
  const findCat = await Category.findOne({name: {$regex: "^"+name+"$", $options: 'i'}}).lean()
  console.log(await findCat)
  if(findCat){
    console.log('return findCat')
    return findCat
  }
  const addCat = Category.create({ name });

  return { _id: '609ff58b502eb62338a312cf', name: name, __v: 0 };
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
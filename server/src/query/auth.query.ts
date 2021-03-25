import User from "../models/User.model";

export const me = (parent: any, args: any, context: any, info: any) =>
  User.find({});

export const users = (parent: any, args: any, context: any, info: any) =>
  User.find({});

export const user = (
  parent: any,
  args: { _id: any },
  context: any,
  info: any
) => {
  const id = args._id;
  const user = User.findById(id);

  return user;
};

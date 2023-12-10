import { TOrders, TUser } from "./user.interface";
import { UserModel } from "./user.model";

// user service functions
const createUserInDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  if (await UserModel.isUserExists(userId)) {
    const result = await UserModel.findOne({ userId });
    return result;
  } else {
    throw new Error();
  }  
};

const updateSingleUserFromDB = async (userId: number, UserData: TUser) => {
  const result = await UserModel.updateOne(
    { userId: userId },
    {
      $set: UserData,
    }
  );
  return result;
};

const deleteSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

//Order service functions //

const createOrderInDB = async (id: string, order: TOrders) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: { orders: order },
    }
  );
  return result;
};

const getAllOrderFromDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id }).select({
    orders: 1,
    _id: 0,
  });
  return result;
};

const getTotalPriceFromDB = async (id: string) => {
  const result = await UserModel.findOne({ userId: id }).select({
    orders: 1,
    _id: 0,
  });
  const data: any = result;
  const totalPrice = data?.orders.reduce(
    (acc: number, order: TOrders) => acc + order.price * order.quantity,
    0
  );
  return {
    totalPrice: totalPrice,
  };
};

export const UserService = {
  createUserInDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  createOrderInDB,
  getAllOrderFromDB,
  getTotalPriceFromDB,
};

import { TOrders, TUser } from "./user.interface";
import { UserModel } from "./user.model";

// user service functions
const createUserInDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await UserModel.find().select({
    userId: 0,
    isActive: 0,
    hobbies: 0,
  });
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    const result = await UserModel.findOne({ userId });
    return result;
  }
};

const updateSingleUserFromDB = async (userId: number, UserData: TUser) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    await UserModel.findOneAndUpdate({ userId }, { $set: UserData });
    const result = await UserModel.findOne({ userId });
    return result;
  }
};

const deleteSingleUserFromDB = async (userId: number) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    const result = await UserModel.deleteOne({ userId });
    return result;
  }
};
//Order service functions //

const createOrderInDB = async (userId: number, order: TOrders) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    const result = await UserModel.updateOne(
      { userId },
      {
        $push: { orders: order },
      }
    );
    return result;
  }
};

const getAllOrderFromDB = async (userId: number) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    const result = await UserModel.findOne({ userId }).select({
      orders: 1,
      _id: 0,
    });
    return result;
  }
};

const getTotalPriceFromDB = async (userId: number) => {
  const existingUser = await UserModel.isUserExists(userId);
  if (!existingUser) {
    throw new Error();
  } else {
    const result = await UserModel.findOne({ userId }).select({
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
  }
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

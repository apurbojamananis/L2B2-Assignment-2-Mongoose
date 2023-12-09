import { TOrders, TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUserInDB = async (user: TUser) => {
  const result = await UserModel.create(user);
  return result;
};

const getUserFromDB = async () => {
  const result = await UserModel.find();
  return result;
};

const getSingleUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId });
  return result;
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
  const result = await UserModel.updateOne({ userId }, { isDeleted: true });
  return result;
};

//

const createOrderInDB = async (id: string, order: TOrders) => {
  const result = await UserModel.updateOne(
    { userId: id },
    {
      $push: { orders: order },
    }
  );
  return result;
};

export const UserService = {
  createUserInDB,
  getUserFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  createOrderInDB,
};

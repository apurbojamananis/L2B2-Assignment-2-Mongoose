import { Request, Response } from "express";
import { UserService } from "./user.service";

const CreateUser = async (req: Request, res: Response) => {
  try {
    // const { user: UserData } = req.body;
    const UserData = req.body;
    const result = await UserService.createUserInDB(UserData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const UserData = req.body;
    const result = await UserService.updateSingleUserFromDB(
      parseInt(userId),
      UserData
    );
    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

// Oder Controller

const createOder = async (req: Request, res: Response) => {
  try {
    // const { user: UserData } = req.body;
    const { userId } = req.params;
    const orderData = req.body;

    const result = await UserService.createOrderInDB(userId, orderData);

    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userControllers = {
  CreateUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createOder,
};

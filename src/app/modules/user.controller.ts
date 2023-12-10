import { Request, Response } from "express";
import { UserService } from "./user.service";
import userValidationSchema from "./user.zodValidation";

// createUser controller
const CreateUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body;
    const zodValidationData = userValidationSchema.parse(UserData);
    const result = await UserService.createUserInDB(zodValidationData);
    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// Get All user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserFromDB();
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// Get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// update user
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// delete user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.deleteSingleUserFromDB(parseInt(userId));
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// Oder Controller //
// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orderData = req.body;
    const result = await UserService.createOrderInDB(userId, orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// get all order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getAllOrderFromDB(userId);
    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

// get total price
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await UserService.getTotalPriceFromDB(userId);

    res.status(200).json({
      success: true,
      message: "Order fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "something went wrong",
      error: error,
    });
  }
};

export const userControllers = {
  CreateUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createOrder,
  getAllOrder,
  getTotalPrice,
};

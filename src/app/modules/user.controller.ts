import { Request, Response } from "express";
import { UserService } from "./user.service";

const CreateUser = async (req: Request, res: Response) => {
  try {
    const { user: UserData } = req.body;

    const result = await UserService.createUserDB(UserData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

export const userControllers = {
  CreateUser,
};

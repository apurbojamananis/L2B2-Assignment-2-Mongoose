/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { UserService } from './user.service'
import userValidationSchema from './user.zodValidation'

// createUser controller
const CreateUser = async (req: Request, res: Response) => {
  try {
    const UserData = req.body
    const zodValidationData = userValidationSchema.parse(UserData)
    const result = await UserService.createUserInDB(zodValidationData)
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

// Get All user
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getUserFromDB()
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

// Get single user
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserService.getSingleUserFromDB(parseInt(userId))
    res.status(200).json({
      success: true,
      message: 'User fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// update user
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const UserData = req.body
    const zodValidationData = userValidationSchema.parse(UserData)
    const result = await UserService.updateSingleUserFromDB(
      parseInt(userId),
      zodValidationData,
    )
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// delete user
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    await UserService.deleteSingleUserFromDB(parseInt(userId))
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// Oder Controller //
// create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const orderData = req.body
    await UserService.createOrderInDB(parseInt(userId), orderData)
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

// get all order
const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserService.getAllOrderFromDB(parseInt(userId))
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

// get total price
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params
    const result = await UserService.getTotalPriceFromDB(parseInt(userId))

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    })
  }
}

export const userControllers = {
  CreateUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  createOrder,
  getAllOrder,
  getTotalPrice,
}

import express from "express";
import { userControllers } from "./user.controller";
const router = express.Router();

// User APIs

router.post("/", userControllers.CreateUser);
router.get("/", userControllers.getAllUser);
router.get("/:userId", userControllers.getSingleUser);
router.put("/:userId", userControllers.updateSingleUser);
router.delete("/:userId", userControllers.deleteSingleUser);

// Product APIs
router.put("/:userId/orders", userControllers.createOrder);
router.get("/:userId/orders", userControllers.getAllOrder);
router.get("/:userId/orders/total-price", userControllers.getTotalPrice);

export const userRoutes = router;

import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {
    processBuyNowPayment,
    getBuyNowPaymentStatus
} from "../controllers/buyNowPayment.controller.js";

const buyNowPaymentRouter = Router();

// All routes require authentication
buyNowPaymentRouter.use(auth);

// Process buy now payment
buyNowPaymentRouter.post("/process", processBuyNowPayment);

// Get payment status
buyNowPaymentRouter.get("/status/:auctionId", getBuyNowPaymentStatus);

export default buyNowPaymentRouter;
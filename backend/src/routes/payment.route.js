import { Router } from "express";
import express from "express";
import {
  createWonAuctionPayment,
  getAuctionPaymentStatus,
  handleStripeWebhook,
} from "../controllers/payment.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const paymentRouter = Router();

// Protected routes
paymentRouter.use(auth);
paymentRouter.post("/create-won-auction-payment", createWonAuctionPayment);
paymentRouter.get("/auction/:auctionId/status", getAuctionPaymentStatus);

// Webhook route (no auth)
paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook,
);

export default paymentRouter;

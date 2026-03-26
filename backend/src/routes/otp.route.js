import generateOtp from "../utils/generateOTP.js";
import Otp from "../models/otp.model.js";
import { sendOTP, verifyOTP } from "../services/smsService.js";
import { Router } from "express";
import User from "../models/user.model.js";

const otpRouter = Router();

// otpRouter.post("/send", async (req, res) => {
//   try {
//     const { phone } = req.body;

//     // Check if phone already exists in User collection
//     const existingUser = await User.findOne({ phone });
//     if (existingUser) {
//       return res.status(409).json({
//         error: "Phone number already registered. Please use a different number or login."
//       });
//     }

//     const otp = generateOtp();

//     await Otp.create({
//       phone,
//       otp,
//       expiresAt: Date.now() + 5 * 60 * 1000
//     });

//     // await sendOTP(phone, otp);
//     console.log('OTP sent:', otp);

//     res.json({ success: true });

//   } catch (error) {
//     res.status(500).json({ error: "Failed to send OTP" });
//   }
// });

otpRouter.post("/send", async (req, res) => {
  try {
    const { phone } = req.body;

    // Validate phone number
    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    // Check if phone already exists in User collection
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return res.status(409).json({
        error:
          "Phone number already registered. Please use a different number or login.",
      });
    }

    // Send OTP using Twilio Verify
    const result = await sendOTP(phone);

    // Send response back to client
    res.json(result);
  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: error.message || "Failed to send OTP" });
  }
});

// otpRouter.post("/verify", async (req, res) => {
//   const { phone, otp } = req.body;

//   const record = await Otp.findOne({
//     phone,
//     otp
//   });

//   if (!record) {
//     return res.status(400).json({ error: "Invalid OTP" });
//   }

//   if (record.expiresAt < Date.now()) {
//     return res.status(400).json({ error: "OTP expired" });
//   }

//   await User.findOneAndUpdate({phone: phone}, {isVerified: true}, {new: true});

//   await Otp.deleteMany({ phone });

//   res.json({ success: true });
// });

otpRouter.post("/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;

    // Validate input
    if (!phone || !otp) {
      return res
        .status(400)
        .json({ error: "Phone number and OTP are required" });
    }

    // Verify OTP using Twilio Verify
    const result = await verifyOTP(phone, otp);

    // If verification failed
    if (!result.success) {
      return res.status(400).json({ success: false, error: result.message });
    }

    // Update user as verified
    const updatedUser = await User.findOneAndUpdate(
      { phone: phone },
      { isVerified: true },
      { new: true },
    );

    // Send success response
    res.json({
      success: true,
      message: "Phone number verified successfully",
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: error.message || "Failed to verify OTP" });
  }
});

export default otpRouter;

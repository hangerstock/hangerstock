import { Telnyx } from "telnyx";

const telnyx = new Telnyx(process.env.TELNYX_API_KEY);

const sendOTP = async (phone, otp) => {
  try {
    await telnyx.messages.create({
      from: process.env.TELNYX_PHONE_NUMBER,
      to: phone,
      text: `Your verification code is ${otp}`,
    });
  } catch (error) {
    throw new Error(`Send OTP error: ${error.message}`);
  }
};

export default sendOTP;
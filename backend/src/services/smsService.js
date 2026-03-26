import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

export const sendOTP = async (phone) => {
  if (!phone) {
    throw new Error("Phone number is required");
  }

  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to: phone,
        channel: 'sms'
      });

    // Return the verification data instead of sending response
    return {
      success: true,
      status: verification.status,
      message: `Verification code sent to ${phone}`
    };
  } catch (error) {
    console.error('Error sending verification:', error);
    throw new Error(error.message);
  }
};

export const verifyOTP = async (phone, code) => {
  if (!phone || !code) {
    throw new Error('Phone number and code are required');
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to: phone,
        code: code
      });

    const isApproved = verificationCheck.status === 'approved';

    // Return the verification result
    return {
      success: isApproved,
      status: verificationCheck.status,
      message: isApproved ? 'Phone number verified successfully!' : 'Invalid verification code'
    };
  } catch (error) {
    console.error('Error verifying code:', error);
    throw new Error(error.message);
  }
};
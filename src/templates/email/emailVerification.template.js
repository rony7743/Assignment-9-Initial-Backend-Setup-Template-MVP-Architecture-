const { getBaseLayout } = require("./baseLayout");

/**
 * Email verification template (OTP)
 */
const getEmailVerificationTemplate = (otp) => {
  const content = `
    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #111827;">
      Verify your email address
    </h3>

    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Hi,
    </p>

    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Thank you for signing up. Please use the verification code below to verify your email address:
    </p>

    <!-- Code Box -->
    <div style="background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 6px; padding: 16px; text-align: center; margin: 24px 0;">
      <span style="font-size: 28px; font-weight: 700; letter-spacing: 6px; color: #111827; font-family: 'Courier New', Courier, monospace;">
        ${otp}
      </span>
    </div>

    <p style="margin: 0 0 12px 0; font-size: 13px; line-height: 20px; color: #6b7280;">
      This code is valid for 10 minutes.
    </p>

    <p style="margin: 0 0 20px 0; font-size: 13px; line-height: 20px; color: #6b7280;">
      If you did not request this, please ignore this email.
    </p>

    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Thanks,<br>
      <strong>NEXMO TAG Team</strong>
    </p>
  `;

  return getBaseLayout({
    title: "Verify your email - NEXMO TAG",
    content,
  });
};

module.exports = { getEmailVerificationTemplate };

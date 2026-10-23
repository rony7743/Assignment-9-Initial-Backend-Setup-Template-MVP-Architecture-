const { getBaseLayout } = require("./baseLayout");

/**
 * Verification link template
 */
const getVerificationLinkTemplate = (verificationUrl) => {
  const content = `
    <h3 style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #111827;">
      Confirm your email address
    </h3>

    <p style="margin: 0 0 16px 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Hi,
    </p>

    <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Please click the button below to verify your email address and activate your account:
    </p>

    <!-- Button -->
    <div style="margin: 24px 0;">
      <a href="${verificationUrl}" style="background-color: #2563eb; color: #ffffff; padding: 11px 22px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 6px; display: inline-block;">
        Verify Email Address
      </a>
    </div>

    <p style="margin: 0 0 8px 0; font-size: 13px; line-height: 20px; color: #6b7280;">
      This link is valid for 24 hours.
    </p>

    <p style="margin: 0 0 20px 0; font-size: 12px; line-height: 18px; color: #9ca3af; word-break: break-all;">
      If the button above does not work, copy and paste this URL into your browser:<br>
      <a href="${verificationUrl}" style="color: #2563eb; text-decoration: underline;">${verificationUrl}</a>
    </p>

    <p style="margin: 0; font-size: 14px; line-height: 22px; color: #4b5563;">
      Thanks,<br>
      <strong>NEXMO TAG Team</strong>
    </p>
  `;

  return getBaseLayout({
    title: "Confirm your email - NEXMO TAG",
    content,
  });
};

module.exports = { getVerificationLinkTemplate };

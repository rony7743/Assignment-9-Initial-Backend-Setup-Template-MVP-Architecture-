const fs = require("fs");
const path = require("path");
const emailService = require("../src/services/email.service");
const {
  getEmailVerificationTemplate,
  getResetPasswordTemplate,
  getVerificationLinkTemplate,
} = require("../src/templates/email");
const config = require("../src/config/config");

const run = async () => {
  const recipient = process.argv[2] || config.email.from || "mahfujalamrony07@gmail.com";
  console.log("=========================================");
  console.log("  Testing Email Templates & Sending");
  console.log(`  Recipient: ${recipient}`);
  console.log("=========================================\n");

  // 1. Generate HTML previews for inspection / screenshots
  const previewDir = path.join(__dirname, "../email-previews");
  if (!fs.existsSync(previewDir)) {
    fs.mkdirSync(previewDir, { recursive: true });
  }

  const sampleOtp = "849201";
  const sampleToken = "sample-secure-jwt-token-xyz-123456";

  const verificationHtml = getEmailVerificationTemplate(sampleOtp, {
    brandName: "NEXMO TAG",
    supportEmail: config.email.from,
  });
  const resetPasswordHtml = getResetPasswordTemplate(sampleOtp, {
    brandName: "NEXMO TAG",
    supportEmail: config.email.from,
  });
  const verificationLinkHtml = getVerificationLinkTemplate(
    `http://localhost:3000/api/v1/auth/verify-email?token=${sampleToken}`,
    {
      brandName: "NEXMO TAG",
      supportEmail: config.email.from,
    }
  );

  fs.writeFileSync(path.join(previewDir, "1-email-verification.html"), verificationHtml);
  fs.writeFileSync(path.join(previewDir, "2-reset-password.html"), resetPasswordHtml);
  fs.writeFileSync(path.join(previewDir, "3-verification-link.html"), verificationLinkHtml);

  console.log(`[✔] Preview files saved in: ${previewDir}`);
  console.log("    - 1-email-verification.html");
  console.log("    - 2-reset-password.html");
  console.log("    - 3-verification-link.html\n");

  // 2. Test live email sending via Nodemailer / SMTP
  console.log("[...] Sending Test 1: Email Verification OTP...");
  try {
    await emailService.sendEmailVerification(recipient, sampleOtp);
    console.log("[✔] Test 1 SENT successfully!");
  } catch (err) {
    console.error("[✖] Test 1 FAILED:", err.message);
  }

  console.log("[...] Sending Test 2: Reset Password OTP...");
  try {
    await emailService.sendResetPasswordEmail(recipient, sampleOtp);
    console.log("[✔] Test 2 SENT successfully!");
  } catch (err) {
    console.error("[✖] Test 2 FAILED:", err.message);
  }

  console.log("[...] Sending Test 3: Email Verification Link...");
  try {
    await emailService.sendVerificationEmail(recipient, sampleToken);
    console.log("[✔] Test 3 SENT successfully!");
  } catch (err) {
    console.error("[✖] Test 3 FAILED:", err.message);
  }

  console.log("\n=========================================");
  console.log("  All email tests completed!");
  console.log("=========================================");
  process.exit(0);
};

run().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});


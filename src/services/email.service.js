const nodemailer = require("nodemailer");
const config = require("../config/config");
const logger = require("../config/logger");
const {
  getEmailVerificationTemplate,
  getResetPasswordTemplate,
  getVerificationLinkTemplate,
} = require("../templates/email");

const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
if (config.env !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch((err) =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} html
 * @param {string} [text]
 * @returns {Promise}
 */
const sendEmail = async (to, subject, html, text) => {
  const msg = {
    from: config.email.from,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
  };
  await transport.sendMail(msg);
};

/**
 * Send email verification code (OTP)
 * @param {string} to
 * @param {string|number} otp
 * @returns {Promise}
 */
const sendEmailVerification = async (to, otp) => {
  logger.info(`Sending email verification code to ${to}`);
  const subject = "Verify Your Email - NEXMO TAG";
  const html = getEmailVerificationTemplate(otp);
  await sendEmail(to, subject, html);
};

/**
 * Send reset password email (OTP)
 * @param {string} to
 * @param {string|number} otp
 * @returns {Promise}
 */
const sendResetPasswordEmail = async (to, otp) => {
  logger.info(`Sending reset password code to ${to}`);
  const subject = "Password Reset Request - NEXMO TAG";
  const html = getResetPasswordTemplate(otp);
  await sendEmail(to, subject, html);
};

/**
 * Send email verification link
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async (to, token) => {
  logger.info(`Sending email verification link to ${to}`);
  const subject = "Confirm Your Email - NEXMO TAG";
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`;
  const html = getVerificationLinkTemplate(verificationEmailUrl);
  const text = `Hi,\n\nPlease verify your email by clicking this link:\n${verificationEmailUrl}\n\nIf you did not create an account, you can ignore this email.\n\nThanks,\nNEXMO TAG Team`;
  await sendEmail(to, subject, html, text);
};

module.exports = {
  transport,
  sendEmail,
  sendResetPasswordEmail,
  sendVerificationEmail,
  sendEmailVerification,
};

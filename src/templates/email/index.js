const { getBaseLayout } = require("./baseLayout");
const { getEmailVerificationTemplate } = require("./emailVerification.template");
const { getResetPasswordTemplate } = require("./resetPassword.template");
const { getVerificationLinkTemplate } = require("./verificationLink.template");

module.exports = {
  getBaseLayout,
  getEmailVerificationTemplate,
  getResetPasswordTemplate,
  getVerificationLinkTemplate,
};


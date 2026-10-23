/**
 * Base layout for email templates
 * Clean, simple, and responsive HTML wrapper
 */
const getBaseLayout = ({ title = "Notification", content = "" }) => {
  const currentYear = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f5f7; padding: 40px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 500px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="padding: 24px 32px 16px 32px; border-bottom: 1px solid #f3f4f6;">
              <h2 style="margin: 0; font-size: 18px; font-weight: 700; color: #111827;">
                NEXMO TAG
              </h2>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; background-color: #f9fafb; border-top: 1px solid #f3f4f6; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #9ca3af; line-height: 18px;">
                &copy; ${currentYear} NEXMO TAG. All rights reserved.<br>
                This is an automated email, please do not reply.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = { getBaseLayout };

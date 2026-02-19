import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPriceDropAlert(
    userEmail,
    product,
    oldPrice,
    newPrice
) {
    try {
        const priceDrop = oldPrice - newPrice;
        const percentageDrop = ((priceDrop / oldPrice) * 100).toFixed(1);

        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: userEmail,
            subject: `🎉 Price Drop Alert: ${product.name}`,
            html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
            
            <div style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
              
              <div style="background: #000000; padding: 30px; text-align: center;">
                <img src="https://png.pngtree.com/png-clipart/20250519/original/pngtree-price-drop-banner-for-sale-offer-vector-png-image_21035191.png" alt="Price Drop Alert" style="max-width: 200px; height: auto;">
              </div>
              
              <div style="padding: 40px 30px;">
                <h1 style="color: #111827; margin-top: 0; font-size: 24px; text-align: center; margin-bottom: 24px;">Asset Valuation Update</h1>
                
                ${product.image_url
                    ? `
                  <div style="text-align: center; margin-bottom: 24px;">
                    <img src="${product.image_url}" alt="${product.name}" style="max-width: 180px; height: auto; border-radius: 8px; border: 1px solid #e5e7eb;">
                  </div>
                `
                    : ""
                }
                
                <h2 style="color: #374151; font-size: 18px; margin: 0 0 24px 0; text-align: center; font-weight: 500;">
                  ${product.name}
                </h2>
                
                <div style="background: #FFFBEB; border: 1px solid #FCD34D; padding: 16px; margin-bottom: 32px; border-radius: 8px; text-align: center;">
                  <p style="margin: 0; font-size: 16px; color: #92400E; font-weight: 600;">
                    Target acquired. Price dropped by ${percentageDrop}%
                  </p>
                </div>
                
                <table style="width: 100%; margin-bottom: 32px; border-collapse: separate; border-spacing: 0;">
                  <tr>
                    <td style="width: 50%; padding: 12px; background: #F3F4F6; border-radius: 8px 0 0 8px; text-align: center;">
                      <div style="font-size: 12px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Previous</div>
                      <div style="font-size: 18px; color: #6B7280; text-decoration: line-through;">
                        ${product.currency} ${oldPrice.toFixed(2)}
                      </div>
                    </td>
                    <td style="width: 50%; padding: 12px; background: #000000; border-radius: 0 8px 8px 0; text-align: center;">
                      <div style="font-size: 12px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Current</div>
                      <div style="font-size: 24px; color: #FFD700; font-weight: bold;">
                        ${product.currency} ${newPrice.toFixed(2)}
                      </div>
                    </td>
                  </tr>
                </table>
                
                <div style="text-align: center;">
                  <a href="${product.url}" 
                     style="display: inline-block; background: #ca8a04; color: white; padding: 16px 32px; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; transition: background 0.2s;">
                    View Asset
                  </a>
                </div>
                
                <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 12px;">
                  <p style="margin: 0;">Deal Drop Intelligence System</p>
                  <p style="margin: 8px 0 0 0;">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="color: #ca8a04; text-decoration: none;">
                      Manage Tracked Assets
                    </a>
                  </p>
                </div>
              </div>
            </div>
            
          </body>
        </html>
      `,
        });

        if (error) {
            console.error("Resend error:", error);
            return { error };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Email error:", error);
        return { error: error.message };
    }
}

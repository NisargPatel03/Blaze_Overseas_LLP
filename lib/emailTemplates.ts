export function getContactEmailHtml(data: { name: string, email: string, interest: string, message: string }) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const formatMessage = data.message ? data.message.replace(/\n/g, '<br>') : '<span style="color: #9ca3af; font-style: italic;">No additional message provided.</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Jost', Arial, sans-serif; background-color: #f4f4f5; -webkit-text-size-adjust: 100%;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; padding: 0;">
    <!-- 1. GOLD TOP BAR -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>

    <!-- 2. HEADER -->
    <div style="background-color: #0e0c09; padding: 30px 20px; text-align: center;">
      <img src="cid:blazze_logo" alt="Blazze Overseas LLP" style="width: 100px; height: auto; border-radius: 12px; margin-bottom: 16px;" />
      <div style="display: block; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Contact Inquiry</div>
      <p style="color: #c8a96e; font-size: 13px; letter-spacing: 3px; margin: 0; text-transform: uppercase; font-family: 'Cormorant Garamond', Georgia, serif;">Taste of Purity</p>
    </div>

    <!-- 5. ORNAMENT DIVIDER -->
    <div style="text-align: center; padding: 30px 0; position: relative;">
      <div style="height: 1px; background-color: #e5e7eb; width: 60%; margin: 0 auto; position: absolute; top: 50%; left: 20%; z-index: 1;"></div>
      <div style="display: inline-block; width: 6px; height: 6px; background-color: #c8a96e; border-radius: 50%; position: relative; z-index: 2; border: 10px solid #ffffff;"></div>
    </div>

    <!-- 6. SENDER / BUYER DETAILS TABLE -->
    <div style="padding: 0 30px;">
      <div style="color: #c8a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 20px 0; font-weight: 600;">Sender Information</div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">${data.name}</div>
      </div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email Address</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">
          <a href="mailto:${data.email}" style="color: #c8a96e; text-decoration: none;">${data.email}</a>
        </div>
      </div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Interest</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">
          <span style="background-color: #fef3c7; color: #b45309; padding: 4px 8px; border-radius: 4px; font-weight: bold; font-size: 13px;">${data.interest || 'None selected'}</span>
        </div>
      </div>
      
      <div style="padding: 14px 0; ">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Timestamp</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">${timestamp}</div>
      </div>
    </div>

    <!-- 7. MESSAGE / NOTES BLOCK -->
    <div style="margin: 30px; background-color: #fbf9f6; border-left: 3px solid #c8a96e; padding: 24px;">
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; color: #4b5563; font-style: italic; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formatMessage}</div>
    </div>

    <!-- 8. CTA BLOCK -->
    <div style="background-color: #0e0c09; padding: 40px 30px; text-align: center;">
      <div style="margin-bottom: 20px;">
        <span style="color: #c8a96e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Action Required</span>
        <div style="font-family: 'Cormorant Garamond', Georgia, serif; color: #ffffff; font-size: 22px; margin: 0; font-weight: 400;">Reply to this inquiry promptly</div>
      </div>
      <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #d4bb8a, #c8a96e, #b39356); color: #0e0c09; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;">Reply to Sender</a>
    </div>

    <!-- 9. TRUST STRIP -->
    <div style="background-color: #fbf9f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">ISO 9001:2015</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">FSSAI</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">APEDA</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Spice Board</span>
      </div>
    </div>

    <!-- 10. FOOTER -->
    <div style="background-color: #0e0c09; padding: 40px 30px 30px; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; color: #ffffff; margin: 0 0 6px 0; font-weight: 400;">Blazze <span style="color: #c8a96e;">Overseas</span></div>
      <p style="color: #c8a96e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 30px 0;">Taste of Purity</p>
      
      <div style="margin-bottom: 30px;">
        <a href="https://wa.me/917777984018" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">WhatsApp</a>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <span style="color: #a09d98; font-size: 13px; margin: 0 10px; display: inline-block;">+91 77779 84018</span>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <a href="mailto:blazzeoverseasllp@gmail.com" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">Email Us</a>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <a href="https://www.blazze.world" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">www.blazze.world</a>
      </div>
      
      <p style="color: #4b5563; font-size: 11px; margin: 0; line-height: 1.6;">This is an automated notification from Blazze Overseas website.<br>&copy; 2026 Blazze Overseas LLP. All rights reserved.</p>
    </div>
    
    <!-- BOTTOM BAR -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>
  </div>
</body>
</html>`;
}

export function getSampleEmailHtml(data: { name: string, email: string, phone: string, category: string, product: string, packing: string, packets: string, remarks: string }) {
  const timestamp = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata', dateStyle: 'medium', timeStyle: 'short' });
  const formatRemarks = data.remarks ? data.remarks.replace(/\n/g, '<br>') : '<span style="color: #9ca3af; font-style: italic;">No additional remarks provided.</span>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sample Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Jost', Arial, sans-serif; background-color: #f4f4f5; -webkit-text-size-adjust: 100%;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; padding: 0;">
    <!-- 1. GOLD TOP BAR -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>

    <!-- 2. HEADER -->
    <div style="background-color: #0e0c09; padding: 30px 20px; text-align: center;">
      <img src="cid:blazze_logo" alt="Blazze Overseas LLP" style="width: 100px; height: auto; border-radius: 12px; margin-bottom: 16px;" />
      <div style="display: block; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 8px;">Sample Request</div>
      <p style="color: #c8a96e; font-size: 13px; letter-spacing: 3px; margin: 0; text-transform: uppercase; font-family: 'Cormorant Garamond', Georgia, serif;">Taste of Purity</p>
    </div>

    <!-- 4. URGENCY BANNER -->
    <div style="background-color: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 16px 20px; color: #b45309; font-size: 14px; text-align: center; font-family: 'Jost', Arial, sans-serif;">
      <span style="font-size: 16px; margin-right: 6px;">⚡</span> <strong>High-Intent Lead:</strong> Sample requests indicate strong purchasing interest. Please prioritize processing.
    </div>

    <!-- 5. ORNAMENT DIVIDER -->
    <div style="text-align: center; padding: 30px 0; position: relative;">
      <div style="height: 1px; background-color: #e5e7eb; width: 60%; margin: 0 auto; position: absolute; top: 50%; left: 20%; z-index: 1;"></div>
      <div style="display: inline-block; width: 6px; height: 6px; background-color: #c8a96e; border-radius: 50%; position: relative; z-index: 2; border: 10px solid #ffffff;"></div>
    </div>

    <!-- 6. BUYER DETAILS TABLE -->
    <div style="padding: 0 30px;">
      <div style="color: #c8a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 20px 0; font-weight: 600;">Contact Information</div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Name</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">${data.name}</div>
      </div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Phone</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">
          <a href="tel:${data.phone}" style="color: #c8a96e; text-decoration: none;">${data.phone}</a>
        </div>
      </div>
      
      <div style="padding: 14px 0; border-bottom: 1px solid #f3f4f6;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Email Address</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">
          <a href="mailto:${data.email}" style="color: #c8a96e; text-decoration: none;">${data.email}</a>
        </div>
      </div>
      
      <div style="padding: 14px 0;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">Timestamp</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">${timestamp}</div>
      </div>
      
      <div style="margin-top: 24px;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Order Details</div>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #fbf9f6; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: inline-block; width: 48%; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Product Details</div>
            <div style="display: inline-block; width: 48%; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; text-align: right;">Sample Qty</div>
          </div>
          
          <div style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <div style="display: inline-block; width: 68%; color: #111827; font-size: 14px; vertical-align: top;"><strong>${data.category || 'N/A'}</strong><br>${data.product}</div>
            <div style="display: inline-block; width: 28%; color: #4b5563; font-size: 14px; text-align: right; vertical-align: top;">Size: ${data.packing ? data.packing + 'g' : 'N/A'}<br>Packets: ${data.packets || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 7. MESSAGE / NOTES BLOCK -->
    <div style="margin: 30px; background-color: #fbf9f6; border-left: 3px solid #c8a96e; padding: 24px;">
      <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Additional Remarks</div>
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 16px; color: #4b5563; font-style: italic; line-height: 1.6; margin: 0; white-space: pre-wrap;">${formatRemarks}</div>
    </div>

    <!-- 8. CTA BLOCK -->
    <div style="background-color: #0e0c09; padding: 40px 30px; text-align: center;">
      <div style="margin-bottom: 20px;">
        <span style="color: #c8a96e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Action Required</span>
        <div style="font-family: 'Cormorant Garamond', Georgia, serif; color: #ffffff; font-size: 22px; margin: 0; font-weight: 400;">Process Sample Request</div>
      </div>
      <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #d4bb8a, #c8a96e, #b39356); color: #0e0c09; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;">Reply to Sender</a>
    </div>

    <!-- 9. TRUST STRIP -->
    <div style="background-color: #fbf9f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Export Packaging</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Global Courier</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Lab-Tested</span>
      </div>
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">Direct Mfr</span>
      </div>
    </div>

    <!-- 10. FOOTER -->
    <div style="background-color: #0e0c09; padding: 40px 30px 30px; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; color: #ffffff; margin: 0 0 6px 0; font-weight: 400;">Blazze <span style="color: #c8a96e;">Overseas</span></div>
      <p style="color: #c8a96e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 30px 0;">Taste of Purity</p>
      
      <div style="margin-bottom: 30px;">
        <a href="https://wa.me/917777984018" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">WhatsApp</a>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <span style="color: #a09d98; font-size: 13px; margin: 0 10px; display: inline-block;">+91 77779 84018</span>
      </div>
      
      <p style="color: #4b5563; font-size: 11px; margin: 0; line-height: 1.6;">This is an automated notification from Blazze Overseas website.<br>&copy; 2026 Blazze Overseas LLP. All rights reserved.</p>
    </div>
    
    <!-- BOTTOM BAR -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>
  </div>
</body>
</html>`;
}

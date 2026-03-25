import os

base_path = r"c:\Sem-6\SGP_4\Blaze_Overseas_LLP\emails"
os.makedirs(base_path, exist_ok=True)

def wrap_template(title, tag, is_sample, details_html, message_html, trust_items, form_type="Contact Us"):
    trust_html = ""
    for item in trust_items:
        trust_html += f'''
      <div style="display: inline-block; margin: 8px 12px; font-family: 'Jost', Arial, sans-serif;">
        <span style="color: #c8a96e; font-size: 14px; margin-right: 6px;">✦</span>
        <span style="font-size: 11px; color: #6b7280; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">{item}</span>
      </div>'''

    urgency_banner = ""
    if is_sample:
        urgency_banner = '''
    <!-- 4. URGENCY BANNER -->
    <div style="background-color: rgba(245, 158, 11, 0.1); border-left: 3px solid #f59e0b; padding: 16px 20px; color: #b45309; font-size: 14px; text-align: center; font-family: 'Jost', Arial, sans-serif;">
      <span style="font-size: 16px; margin-right: 6px;">⚡</span> <strong>High-Intent Lead:</strong> Sample requests indicate strong purchasing interest. Please prioritize processing.
    </div>'''

    return f'''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{tag}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Jost', Arial, sans-serif; background-color: #f4f4f5; -webkit-text-size-adjust: 100%;">
  <div style="max-width: 640px; margin: 0 auto; background-color: #ffffff; padding: 0;">
    <!-- 1. GOLD TOP BAR -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>

    <!-- 2. HEADER -->
    <div style="background-color: #0e0c09; padding: 30px 20px; text-align: center;">
      <div style="display: inline-block; background-color: rgba(200, 169, 110, 0.15); color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; padding: 6px 16px; border-radius: 50px; margin-bottom: 20px;">{tag}</div>
      <h1 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 32px; color: #ffffff; margin: 0; font-weight: 500;">Blazze <span style="color: #c8a96e;">Overseas</span></h1>
      <p style="color: #c8a96e; font-size: 13px; letter-spacing: 3px; margin: 8px 0 0 0; text-transform: uppercase;">Taste of Purity</p>
    </div>

    <!-- 3. HERO SECTION -->
    <div style="background-color: #1a1714; padding: 40px 30px; text-align: center;">
      <span style="color: #c8a96e; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px; display: block;">{title} Submission</span>
      <h2 style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; color: #ffffff; margin: 0 0 16px 0; font-weight: 400;">A new {title.lower()} has arrived</h2>
      <p style="color: #a09d98; font-size: 15px; line-height: 1.6; margin: 0;">A visitor has submitted a {title.lower()} via the website. Please review their details below and respond promptly.</p>
    </div>
{urgency_banner}
    <!-- 5. ORNAMENT DIVIDER -->
    <div style="text-align: center; padding: 30px 0; position: relative;">
      <div style="height: 1px; background-color: #e5e7eb; width: 60%; margin: 0 auto; position: absolute; top: 50%; left: 20%; z-index: 1;"></div>
      <div style="display: inline-block; width: 6px; height: 6px; background-color: #c8a96e; border-radius: 50%; position: relative; z-index: 2; border: 10px solid #ffffff;"></div>
    </div>

    <!-- 6. SENDER / BUYER DETAILS TABLE -->
    <div style="padding: 0 30px;">
      <div style="color: #c8a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; margin: 0 0 20px 0; font-weight: 600;">Sender / Buyer Details</div>
{details_html}
    </div>

    <!-- 7. MESSAGE / NOTES BLOCK -->
    <div style="margin: 30px; background-color: #fbf9f6; border-left: 3px solid #c8a96e; padding: 24px;">
{message_html}
    </div>

    <!-- 8. CTA BLOCK -->
    <div style="background-color: #0e0c09; padding: 40px 30px; text-align: center;">
      <div style="margin-bottom: 20px;">
        <span style="color: #c8a96e; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 8px;">Action Required</span>
        <div style="font-family: 'Cormorant Garamond', Georgia, serif; color: #ffffff; font-size: 22px; margin: 0; font-weight: 400;">Reply within 1 business hour</div>
      </div>
      <a href="mailto:{{{{EMAIL}}}}" style="display: inline-block; background: linear-gradient(135deg, #d4bb8a, #c8a96e, #b39356); color: #0e0c09; text-decoration: none; padding: 14px 32px; font-size: 14px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; border-radius: 4px;">Reply to Sender</a>
    </div>

    <!-- 9. TRUST STRIP -->
    <div style="background-color: #fbf9f6; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb;">
{trust_html}
    </div>

    <!-- 10. FOOTER -->
    <div style="background-color: #0e0c09; padding: 40px 30px 30px; text-align: center;">
      <div style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 24px; color: #ffffff; margin: 0 0 6px 0; font-weight: 400;">Blazze <span style="color: #c8a96e;">Overseas</span></div>
      <p style="color: #c8a96e; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 30px 0;">Taste of Purity</p>
      
      <div style="margin-bottom: 30px;">
        <a href="https://wa.me/917777984018" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">WhatsApp</a>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <span style="color: #a09d98; font-size: 13px; margin: 0 10px; display: inline-block;">+91 77779 84018 / 83019</span>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <a href="mailto:blazzeoverseasllp@gmail.com" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">Email Us</a>
        <span style="color: #333; margin: 0 5px; display: inline-block;">|</span>
        <a href="https://www.blazze.world" style="color: #a09d98; font-size: 13px; text-decoration: none; margin: 0 10px; display: inline-block;">www.blazze.world</a>
      </div>
      
      <div style="margin-bottom: 30px;">
        <span style="border: 1px solid rgba(200, 169, 110, 0.3); color: #a09d98; font-size: 10px; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; margin: 4px; display: inline-block;">ISO 9001:2015</span>
        <span style="border: 1px solid rgba(200, 169, 110, 0.3); color: #a09d98; font-size: 10px; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; margin: 4px; display: inline-block;">FSSAI</span>
        <span style="border: 1px solid rgba(200, 169, 110, 0.3); color: #a09d98; font-size: 10px; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; margin: 4px; display: inline-block;">APEDA</span>
        <span style="border: 1px solid rgba(200, 169, 110, 0.3); color: #a09d98; font-size: 10px; padding: 4px 10px; border-radius: 50px; text-transform: uppercase; letter-spacing: 0.5px; margin: 4px; display: inline-block;">Spice Board</span>
      </div>
      
      <p style="color: #4b5563; font-size: 11px; margin: 0; line-height: 1.6;">This is an automated notification from Blazze Overseas website.<br>&copy; 2026 Blazze Overseas LLP, Gujarat, India. All rights reserved.</p>
    </div>
    
    <!-- 1. BOTTOM BAR AGAIN -->
    <div style="height: 4px; background: linear-gradient(90deg, #c8a96e, #e8d095, #c8a96e); width: 100%;"></div>
  </div>
</body>
</html>'''

def make_detail_row(key, val, is_last=False):
    border = "" if is_last else "border-bottom: 1px solid #f3f4f6;"
    return f'''      <div style="padding: 14px 0; {border}">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">{key}</div>
        <div style="color: #111827; font-size: 15px; font-weight: 500;">{val}</div>
      </div>'''

# 1. Contact Us
contact_us_fields = [
    ("Full Name", "{{FULL_NAME}}"),
    ("Email Address", "<a href=\"mailto:{{EMAIL}}\" style=\"color: #c8a96e; text-decoration: none;\">{{EMAIL}}</a>"),
    ("Phone Number", "{{PHONE}}"),
    ("Country", "{{COUNTRY}}"),
    ("Subject", "{{SUBJECT}}"),
    ("Timestamp", "{{TIMESTAMP}}"),
]
contact_details = chr(10).join(make_detail_row(k, v, i == len(contact_us_fields)-1) for i, (k, v) in enumerate(contact_us_fields))
contact_msg = '<p style="font-family: \'Cormorant Garamond\', Georgia, serif; font-size: 18px; color: #4b5563; font-style: italic; line-height: 1.6; margin: 0;">"{{MESSAGE}}"</p>'
contact_trust = ["ISO 9001:2015", "FSSAI", "APEDA", "Spice Board"]

with open(base_path + "/ContactUs.html", "w", encoding="utf-8") as f:
    f.write(wrap_template("Contact Form", "New Message Received", False, contact_details, contact_msg, contact_trust, "Contact Us"))

# 2. Sample Request
sample_fields = [
    ("Full Name", "{{FULL_NAME}}"),
    ("Company", "{{COMPANY}}"),
    ("Designation", "{{DESIGNATION}}"),
    ("Email Address", "<a href=\"mailto:{{EMAIL}}\" style=\"color: #c8a96e; text-decoration: none;\">{{EMAIL}}</a>"),
    ("Phone Number", "{{PHONE}}"),
    ("Country", "{{COUNTRY}}"),
    ("Delivery Address", "{{DELIVERY_ADDRESS}}"),
    ("Timestamp", "{{TIMESTAMP}}"),
]
sample_details = chr(10).join(make_detail_row(k, v, False) for (k, v) in sample_fields)

product_grid = '''
      <div style="margin-top: 24px;">
        <div style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">Requested Products Grid</div>
        <div style="border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #fbf9f6; padding: 12px 16px; border-bottom: 1px solid #e5e7eb;">
            <div style="display: inline-block; width: 48%; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Product Details</div>
            <div style="display: inline-block; width: 48%; color: #c8a96e; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600; text-align: right;">Sample Qty</div>
          </div>
          {{#EACH_PRODUCT}}
          <div style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <div style="display: inline-block; width: 68%; color: #111827; font-size: 14px; vertical-align: top;"><strong>{{CATEGORY}}</strong><br>{{PRODUCT_NAME}}</div>
            <div style="display: inline-block; width: 28%; color: #4b5563; font-size: 14px; text-align: right; vertical-align: top;">{{SAMPLE_QTY}}</div>
          </div>
          {{/EACH_PRODUCT}}
        </div>
      </div>'''

sample_details += product_grid

sample_msg = '<p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Notes</p><p style="font-family: \'Cormorant Garamond\', Georgia, serif; font-size: 18px; color: #4b5563; font-style: italic; line-height: 1.6; margin: 0;">"{{NOTES}}"</p>'
sample_trust = ["Export Packaging", "Global Courier", "Lab-Tested", "Direct Mfr"]

with open(base_path + "/SampleRequest.html", "w", encoding="utf-8") as f:
    f.write(wrap_template("Sample Request", "Sample Request", True, sample_details, sample_msg, sample_trust, "Request A Sample"))

# 3. Send Inquiry
inq_fields = [
    ("Full Name", "{{FULL_NAME}}"),
    ("Company", "{{COMPANY}}"),
    ("Designation", "{{DESIGNATION}}"),
    ("Email Address", "<a href=\"mailto:{{EMAIL}}\" style=\"color: #c8a96e; text-decoration: none;\">{{EMAIL}}</a>"),
    ("Phone Number", "{{PHONE}}"),
    ("Country", "{{COUNTRY}}"),
    ("Product Category", "{{PRODUCT_CATEGORY}}"),
    ("Specific Products", "{{SPECIFIC_PRODUCTS}}"),
    ("Quantity", "{{QUANTITY}}"),
    ("Frequency", "{{FREQUENCY}}"),
    ("Destination Port", "{{DESTINATION_PORT}}"),
    ("Incoterms", "{{INCOTERMS}}"),
    ("Payment Terms", "{{PAYMENT_TERMS}}"),
    ("Target Price", "{{TARGET_PRICE}}"),
    ("Required By Date", "{{REQUIRED_BY_DATE}}"),
    ("Timestamp", "{{TIMESTAMP}}"),
]
inq_details = chr(10).join(make_detail_row(k, v, i == len(inq_fields)-1) for i, (k, v) in enumerate(inq_fields))
inq_msg = '<p style="color: #6b7280; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 8px 0;">Buyer Message</p><p style="font-family: \'Cormorant Garamond\', Georgia, serif; font-size: 18px; color: #4b5563; font-style: italic; line-height: 1.6; margin: 0;">"{{BUYER_MESSAGE}}"</p>'
inq_trust = ["Direct Mfr", "FOB/CIF", "Full Docs", "30+ Countries"]

with open(base_path + "/SendInquiry.html", "w", encoding="utf-8") as f:
    f.write(wrap_template("Trade Inquiry", "Trade Inquiry", False, inq_details, inq_msg, inq_trust, "Send Inquiry"))

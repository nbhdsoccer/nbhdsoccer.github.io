# Email Setup Guide for Tournament Registrations

This guide explains how to set up email notifications for tournament registrations using EmailJS.

## 🚀 Quick Setup with EmailJS

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (100 emails/month free)
3. Verify your email address

### Step 2: Add Email Service
1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions to connect your email
5. Note down your **Service ID**

### Step 3: Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template content:

```html
Subject: Tournament Registration Confirmation - {{team_name}}

Hello {{to_name}},

Thank you for registering for the David Benavidez Memorial Tournament! Your participation honors David's legacy of service and community building.

**Registration Details:**
• Team Name: {{team_name}}
• Registration Type: {{registration_type}}
• Captain: {{captain_name}}
• Email: {{captain_email}}
• Phone: {{captain_phone}}
• Players: {{player_count}}
• Registration Date: {{registration_date}}

{{#memorial_message}}
**Your Memorial Message:**
{{memorial_message}}
{{/memorial_message}}

**Tournament Information:**
• Date: {{tournament_date}}
• Venue: {{venue}}
• Format: 8v8 Soccer Tournament
• Time: 10:00 AM - 2:00 PM

We will contact you within 24-48 hours with additional details including:
- Payment instructions
- Tournament schedule
- Team logistics
- Parking information

The Benavidez family and our entire organization are grateful for your participation in honoring David's memory.

Questions? Reply to this email or contact us at nbhdsoccer@gmail.com

In service and soccer,
Chicago Neighborhood Soccer
David Benavidez Memorial Tournament Committee

---
This tournament supports community health initiatives and honors the legacy of David Benavidez, who dedicated his life to serving others.
```

4. Save the template and note down your **Template ID**

### Step 4: Get Public Key
1. Go to "Account" in your EmailJS dashboard
2. Find your **Public Key** in the API Keys section

### Step 5: Update Tournament Page
1. Open `/events/benavidez-tournament.html`
2. Find these lines near the top of the script section:
```javascript
const EMAILJS_PUBLIC_KEY = 'YOUR_EMAILJS_PUBLIC_KEY'; // Replace with your public key
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // Replace with your service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // Replace with your template ID
```

3. Replace with your actual values:
```javascript
const EMAILJS_PUBLIC_KEY = 'user_abc123xyz'; // Your actual public key
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your actual service ID
const EMAILJS_TEMPLATE_ID = 'template_abc123'; // Your actual template ID
```

## 📧 Alternative Email Solutions

### Option 2: Formspree (Simple Backend)
1. Sign up at [Formspree.io](https://formspree.io/)
2. Create a new form
3. Replace the form action with Formspree endpoint
4. Automatic email notifications included

### Option 3: Netlify Forms (If using Netlify)
1. Deploy to Netlify instead of GitHub Pages
2. Add `netlify` attribute to form
3. Configure email notifications in Netlify dashboard

### Option 4: Google Sheets + Apps Script
1. Create Google Sheets to store registrations
2. Use Google Apps Script to send emails
3. More complex but gives full control

## 🔧 Testing Your Setup

1. After configuring EmailJS, test the registration form
2. Check your email provider's sent folder
3. Verify the registrant receives the confirmation email
4. Check browser console for any errors

## 🚨 Important Notes

- **Free Tier Limits**: EmailJS free tier allows 100 emails/month
- **Email Deliverability**: Some emails might go to spam initially
- **Error Handling**: The system will work without email if not configured
- **Security**: Public keys are safe to expose, but never expose private keys

## 📊 Monitoring Emails

- Check EmailJS dashboard for email delivery status
- Monitor your email provider for bounce backs
- Test with different email addresses to ensure delivery

## 🎯 Next Steps

1. Set up EmailJS following steps above
2. Test with a few registrations
3. Consider upgrading EmailJS plan if you expect many registrations
4. Add admin notification emails for new registrations

---

**Need Help?** Contact nbhdsoccer@gmail.com for assistance with email setup.

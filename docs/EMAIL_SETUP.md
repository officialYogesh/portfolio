# Email Setup for Contact Form with Resend

The contact form uses **Resend** for email delivery - a modern, developer-friendly email API designed for transactional emails with a generous free tier.

## Why Resend?

- **Free Tier**: 3,000 emails/month for free (perfect for portfolio contact forms)
- **Easy Setup**: Simple API key authentication
- **Reliable Delivery**: Built by the team behind React Email
- **Developer Experience**: Excellent documentation and TypeScript support
- **No SMTP Configuration**: No need to manage SMTP servers

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Resend Configuration
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=onboarding@yourdomain.com
RECIPIENT_EMAIL=your-email@domain.com
```

## Quick Setup Guide

### 1. Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. In your Resend dashboard, go to **API Keys**
2. Create a new API key
3. Copy the API key (starts with `re_`)
4. Add it to your `.env.local` file as `RESEND_API_KEY`

### 3. Configure Domain (Optional but Recommended)

**For Production:**

1. Go to **Domains** in your Resend dashboard
2. Add your domain (e.g., `yourdomain.com`)
3. Follow the DNS setup instructions
4. Once verified, update `RESEND_FROM_EMAIL` to use your domain

**For Development/Testing:**

- You can use `onboarding@resend.dev` (default)
- Or any verified email address

### 4. Set Recipient Email

Update `RECIPIENT_EMAIL` in your `.env.local` to the email where you want to receive contact form submissions.

## Environment Variables Explained

| Variable            | Description                    | Example                  |
| ------------------- | ------------------------------ | ------------------------ |
| `RESEND_API_KEY`    | Your Resend API key            | `re_123abc...`           |
| `RESEND_FROM_EMAIL` | Email address to send from     | `contact@yourdomain.com` |
| `RECIPIENT_EMAIL`   | Your email to receive messages | `hello@yourdomain.com`   |

## Example Configuration

```env
# Resend Configuration
RESEND_API_KEY=re_AbCdEfGhIjKlMnOpQrStUvWxYz123456789
RESEND_FROM_EMAIL=contact@johndoe.com
RECIPIENT_EMAIL=john@johndoe.com
```

## Free Tier Limits

- **3,000 emails/month**
- **100 emails/day**
- No credit card required
- All features included

Perfect for portfolio contact forms!

## Troubleshooting

### Common Issues

1. **"Failed to send email"**

   - Check if `RESEND_API_KEY` is correctly set
   - Verify the API key hasn't expired
   - Check Resend dashboard for any account issues

2. **"Domain not verified"**

   - Use `onboarding@resend.dev` for testing
   - Or verify your domain in Resend dashboard

3. **Emails not receiving**
   - Check spam folder
   - Verify `RECIPIENT_EMAIL` is correct
   - Check Resend dashboard logs

### Development Tips

- Test with `onboarding@resend.dev` as the from address
- Use your personal email as the recipient for testing
- Check Resend dashboard for delivery logs
- Use environment variables for different stages (dev/staging/prod)

## Alternative Email Providers (Backup)

If you prefer other providers, here are alternatives:

### 1. Nodemailer with Gmail (Free)

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-gmail@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=your-gmail@gmail.com
RECIPIENT_EMAIL=your-email@gmail.com
```

### 2. SendGrid (Free Tier: 100 emails/day)

```env
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=your-verified-email@domain.com
RECIPIENT_EMAIL=your-email@domain.com
```

## Production Deployment

When deploying to Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add all the environment variables:
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `RECIPIENT_EMAIL`
4. Redeploy your application

## Security Best Practices

- Never commit API keys to version control
- Use different API keys for development and production
- Regularly rotate API keys
- Monitor usage in Resend dashboard
- Set up rate limiting if needed

## Support

- **Resend Documentation**: [resend.com/docs](https://resend.com/docs)
- **Resend Status Page**: [status.resend.com](https://status.resend.com)
- **Portfolio Issues**: Check your Vercel function logs for detailed error messages

---

**Note**: Resend is the recommended solution for this portfolio due to its simplicity, reliability, and generous free tier that's perfect for contact forms.

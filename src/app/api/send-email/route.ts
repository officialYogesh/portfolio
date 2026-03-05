import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

import { getErrorMessage } from "../../../../config/content-config";
import { personalInfo } from "../../../../config/personal-info";

// Initialize Resend lazily to avoid build errors
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is required");
  }
  return new Resend(apiKey);
}

// Email validation function
function isValidEmail(email: string): boolean {
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

// Sanitize input to prevent injection
function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, "");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { subject, message, senderEmail, senderName } = body;

    // Server-side validation
    if (!subject || typeof subject !== "string" || subject.trim().length < 3) {
      return NextResponse.json(
        { success: false, error: "Subject must be at least 3 characters" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (senderEmail && !isValidEmail(senderEmail)) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedSubject = sanitizeInput(subject);
    const sanitizedMessage = sanitizeInput(message);
    const sanitizedSenderName = senderName ? sanitizeInput(senderName) : null;
    const sanitizedSenderEmail = senderEmail
      ? sanitizeInput(senderEmail)
      : null;

    // Prepare email content
    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    const toEmail = process.env.RECIPIENT_EMAIL || personalInfo.email;

    // Create email HTML content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Message</h1>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="margin-bottom: 20px;">
            <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 18px;">📧 Subject</h3>
            <p style="color: #6c757d; margin: 0; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #667eea;">
              ${sanitizedSubject}
            </p>
          </div>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 18px;">💬 Message</h3>
            <div style="color: #6c757d; margin: 0; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #667eea; white-space: pre-wrap;">
              ${sanitizedMessage}
            </div>
          </div>
          
          ${
            sanitizedSenderName || sanitizedSenderEmail
              ? `
            <div style="margin-bottom: 20px;">
              <h3 style="color: #495057; margin: 0 0 10px 0; font-size: 18px;">👤 Sender Information</h3>
              <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea;">
                ${
                  sanitizedSenderName
                    ? `<p style="margin: 0 0 5px 0; color: #6c757d;"><strong>Name:</strong> ${sanitizedSenderName}</p>`
                    : ""
                }
                ${
                  sanitizedSenderEmail
                    ? `<p style="margin: 0; color: #6c757d;"><strong>Email:</strong> <a href="mailto:${sanitizedSenderEmail}" style="color: #667eea;">${sanitizedSenderEmail}</a></p>`
                    : ""
                }
              </div>
            </div>
          `
              : ""
          }
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; font-size: 12px; color: #adb5bd; text-align: center;">
            <p style="margin: 0;">This message was sent from your portfolio contact form</p>
            <p style="margin: 5px 0 0 0;">Received on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    // Create plain text version
    const textContent = `
New Contact Form Message

Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

${sanitizedSenderName ? `Name: ${sanitizedSenderName}\n` : ""}${
      sanitizedSenderEmail ? `Email: ${sanitizedSenderEmail}\n` : ""
    }

Received on: ${new Date().toLocaleString()}
    `;

    // Send email using Resend
    const resend = getResendClient();
    const emailResponse = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      html: htmlContent,
      text: textContent,
      ...(sanitizedSenderEmail && {
        replyTo: sanitizedSenderEmail,
      }),
    });

    if (emailResponse.error) {
      console.error("Resend API error:", emailResponse.error);
      return NextResponse.json(
        {
          success: false,
          error: getErrorMessage("contactForm", "tryAgain"),
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      messageId: emailResponse.data?.id,
    });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        success: false,
        error: getErrorMessage("contactForm", "tryAgain"),
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

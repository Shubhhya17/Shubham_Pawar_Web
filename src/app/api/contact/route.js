import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Viewer from "../../../models/Viewer";
import nodemailer from "nodemailer";

// ── Transporter: Gmail SMTP with verified app password ────────────────────────
// Created once at module level — reuses TCP+TLS connection across requests.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,           // port 587 + STARTTLS is faster than 465 SSL
  secure: false,       // STARTTLS
  auth: {
    user: process.env.EMAIL_USER,   // pawarshubh890@gmail.com
    pass: process.env.EMAIL_PASS,   // Gmail App Password (no spaces)
  },
  pool: true,
  maxConnections: 3,
  maxMessages: Infinity,
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 15000,
});

// Verify transporter on startup (logs to terminal, doesn't crash the server)
transporter.verify((err) => {
  if (err) console.error("❌ SMTP connection failed:", err.message);
  else     console.log("✅ SMTP ready — Gmail connected");
});

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // SENDER  = the Gmail account that has the app password
    // OWNER   = pawarshubh890@gmail.com — where YOU receive contact alerts
    const SENDER     = process.env.EMAIL_USER;
    const OWNER      = process.env.OWNER_EMAIL || process.env.EMAIL_USER;

    // ── 1. Notification email TO Shubham's main inbox ─────────────────────────
    const notifyOptions = {
      from: `"Portfolio Bot" <${SENDER}>`,
      to: OWNER,                        // → pawarshubh890@gmail.com
      replyTo: email,                   // reply goes straight to the visitor
      subject: `📩 New Contact: ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;background:#f4f4f4;padding:20px;">
          <div style="max-width:600px;margin:auto;background:#fff;border-radius:10px;
                      overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.1);">
            <div style="background:crimson;color:white;padding:15px 20px;">
              <h2 style="margin:0;">New Contact Message 📬</h2>
            </div>
            <div style="padding:20px;">
              <table style="width:100%;border-collapse:collapse;margin-top:10px;">
                <tr>
                  <td style="padding:10px;font-weight:bold;width:100px;">👤 Name:</td>
                  <td style="padding:10px;">${name}</td>
                </tr>
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px;font-weight:bold;">📧 Email:</td>
                  <td style="padding:10px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px;font-weight:bold;">📝 Subject:</td>
                  <td style="padding:10px;">${subject}</td>
                </tr>
                <tr style="background:#f9f9f9;">
                  <td style="padding:10px;font-weight:bold;">💬 Message:</td>
                  <td style="padding:10px;white-space:pre-wrap;">${message}</td>
                </tr>
              </table>
            </div>
            <div style="background:#f1f1f1;text-align:center;padding:10px;font-size:12px;color:#777;">
              Sent from Shubham's portfolio 🚀
            </div>
          </div>
        </div>`,
    };

    // ── 2. Thank-you email TO the visitor ─────────────────────────────────────
    const thankYouOptions = {
      from: `"Shubham Pawar" <${SENDER}>`,
      to: email,
      replyTo: OWNER,                   // replies from visitor go to pawarshubh890
      subject: `✅ Thanks for reaching out, ${name}! — Shubham Pawar`,
      html: `
        <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f4f4f4;padding:30px 10px;">
          <div style="max-width:580px;margin:auto;background:#fff;border-radius:14px;
                      overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">
            <div style="background:linear-gradient(135deg,crimson 0%,#8b0020 100%);
                        padding:28px 30px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:24px;">Thank You, ${name}! 🙏</h1>
              <p style="color:rgba(255,255,255,0.85);margin:8px 0 0;font-size:14px;">
                Your message has been received
              </p>
            </div>
            <div style="padding:30px 30px 20px;">
              <p style="font-size:15px;color:#333;line-height:1.7;margin-top:0;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="font-size:15px;color:#333;line-height:1.7;">
                Thank you for getting in touch! I've received your message and will
                get back to you within 24–48 hours.
              </p>
              <div style="background:#fdf2f4;border-left:4px solid crimson;
                          border-radius:8px;padding:16px 20px;margin:20px 0;">
                <p style="margin:0 0 6px;font-size:13px;color:#888;
                           text-transform:uppercase;letter-spacing:0.5px;">Your message</p>
                <p style="margin:0 0 8px;font-size:14px;color:#555;">
                  <strong>Subject:</strong> ${subject}
                </p>
                <p style="margin:0;font-size:14px;color:#555;line-height:1.6;
                           white-space:pre-wrap;">${message}</p>
              </div>
              <div style="text-align:center;margin:24px 0;">
                <a href="https://www.linkedin.com/in/shubham-pawar1703/" target="_blank"
                   style="display:inline-block;background:crimson;color:#fff;
                          text-decoration:none;padding:11px 24px;border-radius:8px;
                          font-size:14px;font-weight:600;margin:0 6px;">
                  🔗 LinkedIn
                </a>
                <a href="https://github.com/Shubhhya17" target="_blank"
                   style="display:inline-block;background:#111;color:#fff;
                          text-decoration:none;padding:11px 24px;border-radius:8px;
                          font-size:14px;font-weight:600;margin:0 6px;">
                  🐙 GitHub
                </a>
              </div>
              <p style="font-size:15px;color:#333;line-height:1.7;">
                Looking forward to connecting!<br/>
                <strong>Shubham Pawar</strong><br/>
                <span style="color:#888;font-size:13px;">
                  Full Stack Developer · Pune, India
                </span>
              </p>
            </div>
            <div style="background:#f9f9f9;border-top:1px solid #eee;text-align:center;
                        padding:16px;font-size:12px;color:#999;">
              📧 pawarshubh890@gmail.com &nbsp;|&nbsp; 📍 Pune, Maharashtra, India<br/>
              Automated response from Shubham's portfolio website.
            </div>
          </div>
        </div>`,
    };

    // ── 3. Save to DB in background (non-blocking) ─────────────────────────────
    (async () => {
      try {
        await connectDB();
        await new Viewer({ name, email, subject, message }).save();
        console.log("✅ Contact saved to DB");
      } catch (dbErr) {
        console.error("⚠️  DB save failed:", dbErr.message);
      }
    })();

    // ── 4. Send BOTH emails in parallel, then respond ─────────────────────────
    // We await here so we can catch real SMTP errors and return a proper error.
    // Promise.all sends both simultaneously — total time = max(e1, e2), not sum.
    try {
      await Promise.all([
        transporter.sendMail(notifyOptions),
        transporter.sendMail(thankYouOptions),
      ]);
      console.log("✅ Both emails sent successfully");
    } catch (mailErr) {
      console.error("❌ Email send error:", mailErr.message);
      // Still return success to user — DB was saved; email issue is logged
      return NextResponse.json(
        { success: true, warning: "Message saved but email could not be sent." },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully!" },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Contact API error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}

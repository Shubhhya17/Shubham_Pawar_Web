import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Viewer from "../../../models/Viewer";
import nodemailer from "nodemailer";

// ── Shared Constants ─────────────────────────────────────────────────────────
const SENDER_EMAIL = process.env.EMAIL_USER;
const OWNER_EMAIL  = process.env.EMAIL_USER;

// ── Transporter Setup ────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER || SENDER_EMAIL,
    pass: process.env.EMAIL_PASS, // App Password
  },
  pool: true,
  maxConnections: 3,
});

// SMTP Status Verification
transporter.verify((err) => {
  if (err) console.error("❌ SMTP Error:", err.message);
  else console.log(`✅ SMTP Ready (${SENDER_EMAIL})`);
});

// ── Helper: Send WhatsApp Message (Skeleton) ─────────────────────────────────
async function sendWhatsAppWelcome(visitorNumber, visitorName) {
  try {
    // ⚠️ REQUIRMENT: You need a WhatsApp API provider (e.g. Twilio, WATI, etc.)
    // For now, we log the attempt. Once you have an API, paste the trigger here.
    console.log(`📱 Triggering WhatsApp Welcome Message to: ${visitorNumber}`);
    
    /* 
    Example for Twilio:
    const client = require('twilio')(accountSid, authToken);
    await client.messages.create({
       from: 'whatsapp:+919403394128',
       body: `Hi ${visitorName}! Thanks for reaching out to Shubham Pawar. I'll get back to you soon!`,
       to: `whatsapp:${visitorNumber}`
    });
    */
  } catch (error) {
    console.error("❌ WhatsApp Trigger Failed:", error.message);
  }
}

export async function POST(req) {
  try {
    const { name, email, number, subject, message } = await req.json();

    if (!name || !email || !number || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // ── 1. Notification Email (To Shubham) ───────────────────────────────────
    const notifyOptions = {
      from: `${SENDER_EMAIL}`, // Simplified to avoid alias-related spam filters
      to: OWNER_EMAIL,
      replyTo: email,
      subject: `📧 New Lead: ${name} (${subject})`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#0a0a0a; padding:40px 20px; color:#eee;">
          <div style="max-width:600px; margin:auto; background:#161616; border:1px solid #333; border-radius:16px; overflow:hidden; box-shadow:0 20px 50px rgba(0,0,0,0.5);">
            <div style="background:linear-gradient(135deg, #dc143c 0%, #8b0020 100%); padding:30px; text-align:center;">
              <h2 style="margin:0; color:#fff; font-size:24px; letter-spacing:1px;">New Contact Acquired 🚀</h2>
            </div>
            <div style="padding:30px;">
              <p style="color:#aaa; font-size:14px; margin-bottom:25px; border-bottom:1px solid #333; padding-bottom:15px;">
                You received a new inquiry from your portfolio website.
              </p>
              <table style="width:100%; border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 0; color:#dc143c; font-weight:bold; width:100px; font-size:13px; text-transform:uppercase;">Name</td>
                  <td style="padding:12px 0; color:#fff; font-size:16px;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; color:#dc143c; font-weight:bold; font-size:13px; text-transform:uppercase;">Email</td>
                  <td style="padding:12px 0; color:#fff; font-size:16px;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; color:#dc143c; font-weight:bold; font-size:13px; text-transform:uppercase;">Number</td>
                  <td style="padding:12px 0; color:#fff; font-size:16px;">${number}</td>
                </tr>
                <tr>
                  <td style="padding:12px 0; color:#dc143c; font-weight:bold; font-size:13px; text-transform:uppercase;">Subject</td>
                  <td style="padding:12px 0; color:#fff; font-size:16px;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top:25px; padding:20px; background:#222; border-radius:12px; border-left:4px solid #dc143c;">
                <p style="margin:0; color:#ddd; line-height:1.6; font-size:15px; white-space:pre-wrap;">${message}</p>
              </div>
              <div style="margin-top:30px; text-align:center;">
                <a href="mailto:${email}" style="display:inline-block; padding:14px 30px; background:#dc143c; color:#fff; text-decoration:none; border-radius:8px; font-weight:600; font-size:14px;">Reply Instantly</a>
              </div>
            </div>
            <div style="background:#111; padding:15px; text-align:center; font-size:11px; color:#555; border-top:1px solid #222;">
              ID: ${Date.now()} | Portfolio Engine v2.0
            </div>
          </div>
        </div>`,
    };

    // ── 2. Thank-You Email (To Visitor) ──────────────────────────────────────
    const thankYouOptions = {
      from: `"Shubham Pawar" <${SENDER_EMAIL}>`,
      to: email,
      replyTo: OWNER_EMAIL,
      subject: `✨ Nice to meet you, ${name}!`,
      html: `
        <div style="font-family:'Segoe UI',Roboto,Helvetica,Arial,sans-serif; background:#f4f4f4; padding:40px 20px;">
          <div style="max-width:600px; margin:auto; background:#fff; border-radius:20px; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.05);">
            <div style="background:#0a0a0a; padding:40px 30px; text-align:center;">
              <h1 style="color:#fff; margin:0; font-size:28px; font-weight:700;">Thanks for reaching out!</h1>
              <p style="color:#888; font-size:16px; margin-top:10px;">Hello ${name}, I've received your message.</p>
            </div>
            <div style="padding:40px 30px;">
              <p style="font-size:16px; color:#333; line-height:1.8;">
                Hi there! Thanks for visiting my portfolio and taking the time to send a message. 
                I usually respond within 24 hours, so you should hear from me very soon.
              </p>
              
              <div style="margin:30px 0; padding:20px; border-radius:12px; border:1px dashed #ddd; background:#fafafa;">
                <p style="margin:0 0 10px; font-size:12px; color:#999; text-transform:uppercase; letter-spacing:1px;">Summary</p>
                <p style="margin:0; color:#555; font-size:14px; font-style:italic;">"${subject}"</p>
              </div>

              <p style="font-size:16px; color:#333; line-height:1.8;">
                In the meantime, feel free to check out my latest work on GitHub or connect with me on LinkedIn for faster communication.
              </p>

              <div style="margin-top:35px; display:flex; justify-content:center; gap:10px;">
                <a href="https://linkedin.com/in/shubham-pawar1703/" style="display:inline-block; padding:12px 25px; background:#0077b5; color:#fff; text-decoration:none; border-radius:10px; font-weight:600; font-size:14px; margin-right:10px;">LinkedIn</a>
                <a href="https://github.com/Shubhhya17" style="display:inline-block; padding:12px 25px; background:#24292e; color:#fff; text-decoration:none; border-radius:10px; font-weight:600; font-size:14px;">GitHub</a>
              </div>
            </div>
            <div style="background:#f9f9f9; padding:30px; text-align:center; border-top:1px solid #eee;">
              <p style="margin:0; color:#888; font-size:14px; font-weight:600;">Shubham Pawar</p>
              <p style="margin:5px 0 0; color:#aaa; font-size:12px;">Full Stack Developer | Pune, India</p>
              <div style="margin-top:20px; font-size:11px; color:#ccc;">
                This is an automated response. Please reply directly to this email if you need urgent assistance.
              </div>
            </div>
          </div>
        </div>`,
    };

    // ── 3. Background Operations (DB & WhatsApp) ─────────────────────────────
    (async () => {
      try {
        await connectDB();
        await new Viewer({ name, email, number, subject, message }).save();
        console.log("✅ Contact stored in database");
        
        // Trigger WhatsApp welcome
        await sendWhatsAppWelcome(number, name);
        
      } catch (err) {
        console.error("⚠️ Background Task Failed:", err.message);
      }
    })();

    // ── 4. Send Emails in Background ──────────────────────────────────────────────
    // We do not await these to ensure the user gets an instant response.
    transporter.sendMail(notifyOptions).then(() => {
      console.log("✅ Internal notification sent.");
    }).catch(err => {
      console.error("❌ SMTP Notify error:", err.message);
    });

    transporter.sendMail(thankYouOptions).then(() => {
      console.log("✅ Thank-you email sent.");
    }).catch(err => {
      console.error("❌ SMTP Thank-you error:", err.message);
    });

    return NextResponse.json({ success: true, message: "Message sent successfully!" }, { status: 201 });

  } catch (error) {
    console.error("❌ Contact API Crash:", error);
    return NextResponse.json({ error: "Critcal server error. Please try again later." }, { status: 500 });
  }
}

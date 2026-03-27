import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/db";
import Viewer from "../../../models/Viewer";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    await connectDB();

    const newViewer = new Viewer({ name, email, subject, message });
    await newViewer.save();

    // Configure Nodemailer to send an email notification
    // let transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });
    let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

    // let mailOptions = {
    //   from: process.env.EMAIL_USER,
    //   to: process.env.EMAIL_USER,
    //   subject: `New Contact Form Submission: ${subject}`,
    //   text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage:\n${message}`
    // };


    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `📩 New Contact Form Submission: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          
          <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            
            <div style="background: crimson; color: white; padding: 15px 20px;">
              <h2 style="margin: 0;">New Contact Message</h2>
            </div>
    
            <div style="padding: 20px;">
              
              <p style="font-size: 16px; color: #333;">
                You have received a new message from your portfolio contact form.
              </p>
    
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                
                <tr>
                  <td style="padding: 10px; font-weight: bold;">👤 Name:</td>
                  <td style="padding: 10px;">${name}</td>
                </tr>
    
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 10px; font-weight: bold;">📧 Email:</td>
                  <td style="padding: 10px;">${email}</td>
                </tr>
    
                <tr>
                  <td style="padding: 10px; font-weight: bold;">📝 Subject:</td>
                  <td style="padding: 10px;">${subject}</td>
                </tr>
    
                <tr style="background-color: #f9f9f9;">
                  <td style="padding: 10px; font-weight: bold;">💬 Message:</td>
                  <td style="padding: 10px;">${message}</td>
                </tr>
    
              </table>
    
            </div>
    
            <div style="background: #f1f1f1; text-align: center; padding: 10px; font-size: 12px; color: #777;">
              This email was sent from your portfolio website Shubham🚀
            </div>
    
          </div>
    
        </div>
      `,
    };



    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent and notification emailed successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

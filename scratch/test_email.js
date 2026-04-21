const nodemailer = require('nodemailer');
require('dotenv').config({ path: './Shubham_Pawar_Web/.env' });

async function testGmail() {
    console.log("Testing Gmail...");
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.verify();
        console.log("✅ Gmail SMTP is Ready");
    } catch (err) {
        console.error("❌ Gmail SMTP Error:", err.message);
    }
}

async function testMaileroo() {
    console.log("\nTesting Maileroo...");
    const transporter = nodemailer.createTransport({
        host: "smtp.maileroo.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAILEROO_USER,
            pass: process.env.MAILEROO_PASS,
        },
    });

    try {
        await transporter.verify();
        console.log("✅ Maileroo SMTP is Ready");
    } catch (err) {
        console.error("❌ Maileroo SMTP Error:", err.message);
    }
}

async function runTests() {
    await testGmail();
    await testMaileroo();
}

runTests();

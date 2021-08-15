import nodemailer from "nodemailer";

export async function sendEmail(email: string, url: string) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: "David Ilie Apps Platform",
        to: email,
        subject: "hello!",
        text: "hello world",
        html: `<a href="${url}">${url}</a>`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log(`Messade send: ${info.messageId}`);
}

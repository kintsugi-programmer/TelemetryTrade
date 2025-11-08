import nodemailer from 'nodemailer';
import mailUsers from '@/data/mailUsers.json'; // adjust path if needed

export async function POST(request) {
  try {
    // 1. Parse JSON body from the request
    const { email } = await request.json();

    // 2. Configure the transporter using environment variables (.env.local)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,   // Your Gmail address
        pass: process.env.EMAIL_PASS,   // Your Gmail App Password
      },
    });

    // 3. Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mailUsers.RECEIVER_EMAIL_USER, // Where you want to receive form submissions
      subject: `${mailUsers.COMPANY_NAME} | Newsletter Signup`,
      text: `New subscription from: ${email}`,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    // 5. Return a successful response
    return new Response(
      JSON.stringify({ success: true, message: 'Subscription email sent successfully!' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to send subscription email.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

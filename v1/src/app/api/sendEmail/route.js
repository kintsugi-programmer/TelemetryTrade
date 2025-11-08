import nodemailer from 'nodemailer';
import mailUsers from '@/data/mailUsers.json'; // adjust path if needed

export async function POST(request) {
  try {
    // 1. Parse JSON body from the request
    const { email, subject, message ,phno ,name } = await request.json();

    // 2. Configure the transporter using environment variables (.env.local)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // e.g., yourname@gmail.com
        pass: process.env.EMAIL_PASS, // your Gmail App Password
      },
    });

    // 3. Prepare mail options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: mailUsers.RECEIVER_EMAIL_USER , // Where you want to receive your form submissions
      subject: ` ${mailUsers.COMPANY_NAME} | From ${name} | ${subject} | New Inquiry`,
      text: `Sender's Name: ${name}\nSender's Email: ${email}\nSender's Phone No.: ${phno}\n\nMessage:\n${message}\nGood Luck,\n${mailUsers.COMPANY_NAME}`,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);

    // 5. Return a successful response
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email send error:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Failed to send email.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
    
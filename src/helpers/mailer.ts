import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {$set:{
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      }
    });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {$set:
        {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      }
    });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "74cdf1d94cbb9d",
        pass: "49404a2c888aa3"
      }
    });

    const mailOptions = {
      from:'koustavjr11@gmail',
      to: email, // list of receivers
      subject: emailType==='VERIFY'?'Verify your email':'Reset your password',
      html: `<p>
                Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
                to ${emailType==='VERIFY'?'Verify':'Reset password'} or copy paste the link below in browser
                <br>
                ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
                </P>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
    console.log(mailResponse);
    
    return mailResponse;
  } catch (error:any) {
   // throw new Error(error.message);
   return error.message
  }
};

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter=nodemailer.createTransport({
    service:'gmail',
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASS
    }
});

const sendEmail=async(mailOptions)=>{
    try{
        let info=await transporter.sendMail(mailOptions);
        return info;
    }catch(e){
        return e.message
    }
}

export default sendEmail;
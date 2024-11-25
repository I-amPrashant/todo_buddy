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

const mailOptions={
    from:process.env.EMAIL,
    to:process.env.EMAIL,
    subject:'checking nodemailer',
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
}

const sendEmail=async()=>{
    try{
        let info=await transporter.sendMail(mailOptions);
        console.log(info);
    }catch(e){
        console.log("error: ", e.message);
    }
}

sendEmail();

export default sendEmail;
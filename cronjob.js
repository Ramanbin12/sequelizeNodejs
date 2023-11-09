const cron=require("node-cron")
const student=require("./Models/user.model")
const nodemailer=require("nodemailer")

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "chaitanyamailer@gmail.com",
        pass: "lvwi mjcl jauy oyek",
    }
});
// cron.schedule("*/2 */1 * * * *",async(req,res)=>{
//         const students= await student.findAll();
//         console.log(students);
// })

cron.schedule("*/10 * * * * *",async(req,res)=>{
    const emails=[];

    const users=await student.findAll({where:{gender:"female"}})
    users.map((item)=>{
    emails.push(item.email)
    })
    console.log(emails)
   
    let info=await transporter.sendMail({
        from: 'chaitanyamailer@gmail.com', 
        to: emails, 
        subject: "Hello raman", 
        text: "happy womens day", 
    
    })
    console.log("Message sent: %s", info.messageId);
    res.json(info)
})


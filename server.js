const fs = require('fs');
const http = require('http');
const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const port = 4000;
app.use(express.static('public'));

let resp = `<html><head>  <title>Temperature Table</title>
<style>      
    body {
        font-family: 'gruppo', sans-serif;
        background-color: #dadbdd;
        margin: 0; /* Remove default margin */
        padding: 0; /* Remove default padding */
        height: 100vh;
        display: flex;
        position: relative;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        overflow-x: hidden;
    }
    
    #banner {
        background-image: url('IMG_5348.JPG');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        padding: 20px;
        text-align: center;
        position: relative;
        width: 100%;
        min-height: 50vh; /* Use min-height instead of height */
        display: flex;
        justify-content: center;
        align-items: flex-end;
        border-bottom: 5px solid #fff;
        box-shadow: 0px 5px 5px -5px rgba(0, 0, 0, 0.75);
    }
    
    #banner-content {
        display: flex;
        align-items: center; /* Center items vertically */
    }
    
    h1 {
        color: #fff; /* White text color */
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5); /* Adding a subtle shadow */
    font-weight: bold; /* Making the text bold */
    margin-right: 10px; 
    }
    
a {
    color: #fff;
    text-decoration: none;
    background-color: #4c95af;
    border: 1px solid #4c95af;
    border-radius: 4px;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-right: 10px;
    padding: 10px 20px;
}

.profile-image {
    width: 68px; /* Adjust the size as needed */
    height: 70px;
    border-radius: 50%; /* Make it circular */
    overflow: hidden;
    margin-right: 10px;
}
#footer {
    background-color: #333; /* Choose a background color for the footer */
    color: #fff; /* Text color for the footer */
    padding: 20px;
    text-align: center;
}

#footer a {
    display: inline-block;
    margin: 0 10px;
    border-radius: 50%;
    padding: 5px;
}

#footer img {
    border-radius: 20%;
    width: 30px; /* Adjust the width of the images as needed */
    height: 30px; /* Adjust the height of the images as needed */
}

a:hover {
    background-color: #3e7c92;
}

footer {
        background-color: #333;
        color: #fff;
        text-align: center;
        width: 100%;
        padding: 20px;
}
    #black{color: black;}
</style></head><body>
<div id="banner">
    <div id="banner-content">
        <h1>Nilou Zafari</h1>
        <img src="Capture.PNG" alt="portrait" class="profile-image" />
        <a href="/">Home</a>
        <a href="/resume">Resume</a>
        <a href="/about">About</a>
        <a href="/recent">Recent Projects</a>
        <a href="/blog">Blog</a>
    </div></div><br><br>
<h2>Thank you for your Message! </h2><br>
<footer>
<div id="footer">
    Lets keep in touch!<br /><br />
    <a href="https://www.linkedin.com/in/niloufar-zafari-979724291" target="_blank">
        <img src="LI-In-Bug.png" alt="LinkedIn" />
    </a>
    <a href="https://github.com/Niloo74" target="_blank">
        <img src="github-mark.png" alt="GitHub" />
    </a>
    <a href="https://www.instagram.com/lily_zaf1" target="_blank">
        <img src="Instagram_Glyph_Black.png" alt="Instagram" />
    </a></div></footer></body></html>`;

//express stuff
app.set("views", path.resolve(__dirname, "template"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.render("index"); 
})
app.get("/resume", (req,res)=>{
    res.render("resume");
})
app.get("/about",(req,res)=>{
    res.render("about");
})
app.get("/contact",(req,res)=>{
    res.render("contact");
})
app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;

    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'niloo.zafari', // Replace with your Gmail email address
            pass: 'jnka ajof nuch ihdy' // Replace with your Gmail password or an app-specific password
        }
    });

    // Define the email options
    const mailOptions = {
        from: 'niloo.zafari@gmail.com',
        to: 'niloo.zafari@gmail.com', // Replace with the recipient's email address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error(error);
        }
        console.log('Email sent: ' + info.response);
    });

    // Respond to the form submission
    res.send(resp);
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'niloo.zafari@gmail.com', // Replace with your Gmail email address
        pass: 'Nz.137413461356' // Replace with your Gmail password or an app-specific password
    }
});

app.get("/recent",(req,res)=>{
    res.render("recent");
})

app.get("/blog",(req,res)=>{
    res.render("blog");
})
app.listen(port);
process.stdin.setEncoding("utf8");
(console.log(`Web server started and running at http://localhost:${port}`));
process.stdout.write("CTRL-C to shutdown the server");

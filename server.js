require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Resend } = require("resend");

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(cors({
  origin: "https://contact-protfolio.onrender.com", // frontend URL
  methods: ["POST", "GET"],
  credentials: false
}));  
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Resend
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Shubham Sharma <onboarding@resend.dev>",
      to: "shubhamsharma21505@gmail.com",
      subject: "New Contact Form Message - " + new Date().toLocaleTimeString(),
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.status(200).send("✅ Message sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("❌ Failed to send message.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

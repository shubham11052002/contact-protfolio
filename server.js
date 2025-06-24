const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { Resend } = require("resend");
const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const resend = new Resend("re_F66P4oaZ_JmEmdfehDwgCixiSHabTM1cQ");
app.get("/", (req, res) => {
    res.send("✅ Backend is running on Render!");
  });
  

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await resend.emails.send({
      from: "Shubham Sharma <onboarding@resend.dev>",
      to: "shubhamsharma21505@gmail.com",
      subject: "New Contact Form Message " + new Date().toLocaleTimeString(),
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    res.send("✅ Message sent successfully!");
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).send("❌ Failed to send message.");
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const { Resend } = require("resend");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ✅ Serve all frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

// ✅ Serve index.html at "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ Serve project.html at "/projects"
app.get("/projects", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "project.html"));
});

// ✅ Handle form email sending
const resend = new Resend("re_F66P4oaZ_JmEmdfehDwgCixiSHabTM1cQ");

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

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

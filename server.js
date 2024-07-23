const express = require("express");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const subscribersFile = path.resolve(process.cwd(), "subscribers.json");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

cron.schedule("0 8 * * *", async () => {
  let subscribers = [];
  try {
    const data = fs.readFileSync(subscribersFile, "utf8");
    subscribers = JSON.parse(data);
  } catch (error) {
    console.error("Error reading subscribers file:", error);
  }

  const weatherData = await fetchWeather();
  if (weatherData.weather[0].main === "Rain") {
    for (const email of subscribers) {
      await sendEmail(email);
    }
  }
});

async function fetchWeather() {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=${process.env.OPENWEATHER_API_KEY}`
  );
  return await response.json();
}

async function sendEmail(email) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Rain Alert!",
    text: "It will rain today. Don't forget your umbrella!",
  });
}

app.prepare().then(() => {
  const server = express();

  server.use(express.json());

  server.post("/api/subscribe", async (req, res) => {
    const { email } = req.body;
    let subscribers = [];

    try {
      const data = fs.readFileSync(subscribersFile, "utf8");
      subscribers = JSON.parse(data);
    } catch (error) {
      console.error("Error reading subscribers file:", error);
    }

    if (!subscribers.includes(email)) {
      subscribers.push(email);
      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    }

    res.status(200).json({ message: "Subscribed successfully!" });
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("Server running on http://localhost:3000");
  });
});

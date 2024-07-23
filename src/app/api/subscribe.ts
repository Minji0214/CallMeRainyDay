import fs from "fs";
import path from "path";

const subscribersFile = path.resolve(process.cwd(), "subscribers.json");

export default async (req, res) => {
  if (req.method === "POST") {
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
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
};

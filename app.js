import express, { json } from "express";
import dotenv from "dotenv";
import mongodbConnect from "./db/Mongodb.js";
import User from "./models/User.models.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
mongodbConnect();
User();
// app.get("/", (req, res) => {
//   res.status(200).json({ msg: "Here is your home page" });
// });

//API route POST/send-dm to send a message
app.post("/send-dm", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newMessage = new User({ name, email, message });
    await newMessage.save();
    res.status(201).json({ msg: "Message sent successfully" });
  } catch (err) {
    console.log("Error saving message: ", err.message);
    return res.status(500).json({ Error: "internal server error" });
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

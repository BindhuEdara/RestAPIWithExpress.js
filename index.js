import os from "os";
import dns from "dns";
import { readFileData } from "./read.js";
import express from "express";

const app = express();

app.get("/home", (req, res) => {
  res.json({ message: "This is homepage" });
});

app.get("/contactus", (req, res) => {
  res.json({ message: "Contact us at contact@contact.com" });
});

app.get("/about", (req, res) => {
  res.json({ message: "Welcome to the About page!" });
});

app.get("/test", (req, res) => {
  res.send("Test route is working!");
});

app.get("/readfile", async (req, res) => {
  try {
    const data = await readFileData();
    res.send(data);
  } catch (error) {
    res.status(500).json({ error: "Unable to read file" });
  }
});

app.get("/systemdetails", (req, res) => {
  const totalMemory = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2);
  const freeMemory = (os.freemem() / 1024 / 1024 / 1024).toFixed(2);

  res.json({
    platform: os.platform(),
    totalMemory: `${totalMemory} GB`,
    freeMemory: `${freeMemory} GB`,
    cpuModel: os.cpus()[0].model,
    cpuCores: os.cpus().length, // Bonus
  });
});

app.get("/getip", (req, res) => {
  dns.lookup("masaischool.com", { all: true }, (err, addresses) => {
    if (err) {
      res.status(500).json({ error: "DNS lookup failed" });
    } else {
      res.json({
        hostname: "masaischool.com",
        addresses,
      });
    }
  });
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

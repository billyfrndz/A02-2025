const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());

// Debug endpoint leaks config + secrets
app.get("/debug", (req, res) => {
  res.json({
    env: process.env,
    cwd: process.cwd(),
    uid: process.getuid ? process.getuid() : "n/a",
    files: fs.readdirSync("."),
  });
});

// Arbitrary file read (no validation)
app.get("/file", (req, res) => {
  res.send(fs.readFileSync(req.query.path, "utf8"));
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Vulnerable notes API on :3000");
});
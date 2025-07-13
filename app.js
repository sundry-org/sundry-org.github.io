const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Serve all static files in the root directory (except handled routes)
app.use(express.static(__dirname));

// Serve /assets folder statically
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Serve apple-app-site-association with proper content type
app.get("/.well-known/apple-app-site-association", (req, res) => {
  const filePath = path.join(__dirname, ".well-known", "apple-app-site-association");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("AASA file error:", err);
      return res.status(404).type("text/plain").send("404 Not Found");
    }
    res
      .status(200)
      .type("application/json")
      .set("Cache-Control", "no-cache")
      .send(data);
  });
});

// Serve index.html at root
app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "index.html");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      return res.status(500).type("text/plain").send("Error loading index.html");
    }
    res.status(200).type("text/html").send(data);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}/`);
});

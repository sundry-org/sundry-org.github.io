const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Serve assetlinks.json with correct content type
app.get("/.well-known/assetlinks.json", (req, res) => {
  res.sendFile(
    path.join(__dirname, ".well-known", "assetlinks.json"),
    {
      headers: { "Content-Type": "application/json" }
    },
    err => {
      if (err) {
        console.error("assetlinks.json error:", err);
        res.status(404).send("Not Found");
      }
    }
  );
});

// Serve AASA (Apple App Site Association) with correct headers
app.get("/.well-known/apple-app-site-association", (req, res) => {
  res.sendFile(path.join(__dirname, ".well-known", "apple-app-site-association"), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache"
    }
  }, err => {
    if (err) {
      console.error("AASA file error:", err);
      res.status(404).send("Not Found");
    }
  });
});


// Catch-all route for client-side routing (e.g., React/Flutter web)
app.get("*", (req, res) => {
  const requestedPath = path.join(__dirname, req.path);
  fs.stat(requestedPath, (err, stat) => {
    if (!err && stat.isFile()) {
      res.sendFile(requestedPath);
    } else {
      res.sendFile(path.join(__dirname, "index.html"), err => {
        if (err) {
          console.error("Error loading index.html:", err);
          res.status(500).send("Error loading page");
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}/`);
});

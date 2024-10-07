const http = require("http");
const fs = require("fs");
const path = require("path");

const port = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    if (req.url === "/") {
      const filePath = path.join(__dirname, "index.html");
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error loading index.html");
        } else {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(data);
        }
      });
    } else if (req.url === "/.well-known/apple-app-site-association") {
      const filePath = path.join(
        __dirname,
        ".well-known",
        "apple-app-site-association"
      );
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(data);
        }
      });
    } else if (req.url.startsWith("/assets/")) {
      const filePath = path.join(__dirname, req.url);
      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        } else {
          const ext = path.extname(filePath).toLowerCase();
          const mimeTypes = {
            ".jpg": "image/jpeg",
            ".jpeg": "image/jpeg",
            ".png": "image/png",
            ".gif": "image/gif",
          };
          res.writeHead(200, {
            "Content-Type": mimeTypes[ext] || "application/octet-stream",
          });
          res.end(data);
        }
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  })
  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });

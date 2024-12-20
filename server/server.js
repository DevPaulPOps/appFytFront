const express = require("express");
const path = require("path");

const app = express();

const PORT = 443;

app.use(express.static(path.join(__dirname, "browser")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "browser/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

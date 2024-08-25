const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Handle all GET requests by sending back index.html
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Set the port dynamically with an environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

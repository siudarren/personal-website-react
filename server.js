const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// All other routes should return the index.html file to support client-side routing
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Use environment variable PORT or default to 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

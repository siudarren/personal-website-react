import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const app = express();

// Convert the module URL to a directory path for current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to serve static files from the 'dist' directory (usually built files)
app.use(express.static(path.join(__dirname, "dist")));

// Serve images directly from the 'src/assets/images' directory
app.use("/images", express.static(path.join(__dirname, "src", "assets")));

// // Middleware to specifically serve CSS files with correct content-type
// app.use(
//     "/css", // Serving CSS files from a specific route
//     express.static(path.join(__dirname, "src", "css-folder"), {
//         setHeaders: (res, path) => {
//             // Custom header setting function
//             if (path.endsWith(".css")) {
//                 res.set("Content-Type", "text/css"); // Ensure the correct content type for CSS files
//             }
//         },
//     })
// );

// Route to serve HTML files based on article slug
app.get("/articles/:slug.html", (req, res) => {
    const filePath = path.join(__dirname, "src", "articles", `${req.params.slug}.html`);
    console.log(`Attempting to serve: ${filePath}`); // Debug log for the file being served

    res.sendFile(filePath, function (err) {
        if (err) {
            console.log("Error sending file:", err); // Log error if the file is not found or other issues
            res.status(404).send("File not found"); // Send 404 status if there is an error
        }
    });
});

app.get("/blog_posts/:slug.html", (req, res) => {
    const filePath = path.join(__dirname, "src", "blog_posts", `${req.params.slug}.html`);
    console.log(`Attempting to serve: ${filePath}`); // Debug log for the file being served

    res.sendFile(filePath, function (err) {
        if (err) {
            console.log("Error sending file:", err); // Log error if the file is not found or other issues
            res.status(404).send("File not found"); // Send 404 status if there is an error
        }
    });
});

// Serve the SPA index.html for all other routes not handled above
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Set the port from environment or default to 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); // Notification that the server is running
});

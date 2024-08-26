import express from "express";
import path from "path";
import {fileURLToPath} from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve images directly from the src/assets/images directory
app.use("/images", express.static(path.join(__dirname, "src", "assets")));

// Specifically serve CSS files
app.use(
    express.static(path.join(__dirname, "/src"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.set("Content-Type", "text/css");
            }
        },
    })
);

app.get("/articles/:slug.html", (req, res) => {
    const filePath = path.join(
        __dirname,
        "src",
        "articles",
        `${req.params.slug}.html`
    );
    console.log(`Attempting to serve: ${filePath}`); // Log the path to debug

    res.sendFile(filePath, function (err) {
        if (err) {
            console.log("Error sending file:", err);
            res.status(404).send("File not found");
        }
    });
});

app.get("*", (req, res) => {
    // Serve the SPA index.html for all other routes
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

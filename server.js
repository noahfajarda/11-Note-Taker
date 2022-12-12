const express = require("express");
const PORT = process.env.PORT || 3001;
const apiRoutes = require("./routes/apiRoutes");
const app = express();
const path = require("path");

// initiated middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// api middleware
app.use("/api/notes", apiRoutes);

// GET request for 'notes' route
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// spin up server
app.listen(PORT, () =>
    console.log(`Your app is running on http://localhost:${PORT}`)
);

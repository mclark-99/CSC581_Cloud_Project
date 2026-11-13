const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();
const PORT = 3000;
app.use(cors({
    origin: "http://localhost:30081"
}));

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        if (["image/jpeg", "image/png"].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG and PNG images are allowed."));
        }
    }
});

app.get("/", (req, res) => {
    res.send("Welcome to the KubePix API!");
});

app.post("/images", upload.single("image"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            error: "No image uploaded."
        });
    }

try {
    const response = await fetch(
        process.env.IMAGE_PROCESSOR_URL || "http://localhost:3002/process",
        {
            method: "POST",
            headers: {
                "Content-Type": req.file.mimetype
            },
            body: req.file.buffer
        }
    );

    if (!response.ok) {
        throw new Error("Image processing failed.");
    }

    const processedImage = Buffer.from(
        await response.arrayBuffer()
    );

    res.set("Content-Type", "image/jpeg");
    res.send(processedImage);

} catch (error) {
    res.status(500).json({
        error: "Unable to process uploaded image."
    });
}
});

app.use((err, req, res, next) => {
    res.status(400).json({
        error: err.message
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`KubePix API running on port ${PORT}`);
});

const express = require("express");
const sharp = require("sharp");

const app = express();
const PORT = 3002;

app.use(express.raw({
    type: ["image/jpeg", "image/png"],
    limit: "10mb"
}));

app.post("/process", async (req, res) => {
    try {
        const processedImage = await sharp(req.body)
            .resize({
                width: 1200,
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 })
            .toBuffer();

        res.set("Content-Type", "image/jpeg");
        res.send(processedImage);

    } catch (error) {
        res.status(400).json({
            error: "Unable to process image."
        });
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Image Processor running on port ${PORT}`);
});

const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const uploadButton = document.getElementById("uploadButton");

imageInput.addEventListener("change", function() {
    const file = imageInput.files[0];

    if (file) {
        const imageURL = URL.createObjectURL(file);

        imagePreview.src = imageURL;
        imagePreview.style.display = "block";

        uploadButton.disabled = false;
    }

uploadButton.addEventListener("click", async function() {
    const file = imageInput.files[0];

    if (!file) {
        alert("PLease select an image first.");
        return;
    }

    console.log("Uploading images:", file.name);

    const formData = new FormData();
    formData.append("image", file);

    try{
        const response = await fetch("http://localhost:3001/images", {
            method: "POST",
            body: formData
        });

        if(!response.ok) {
            throw new Error("Image upload failed.");
        }

        console.log("Image processed successfully!");
    } catch (error) {
        console.error("Upload error:", error);
    }
});
});
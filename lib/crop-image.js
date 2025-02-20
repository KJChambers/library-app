export default async function getCroppedImg(imageSrc, pixelCrop, width = 300, height = 300) {
    function createImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = url;
            img.onload = () => resolve(img);
            img.onerror = (error) => reject(error);
        });
    }

    try {
        const image = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("Canavs context not available");
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
            image,
            pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height,
            0, 0, width, height
        );

        return new Promise((resolve, reject) => {
            canvas.toBlob(async (blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                const fileUrl = URL.createObjectURL(blob);
                resolve(fileUrl);
            }, "image/jpeg");
        });
    } catch (error) {
        console.error("Error cropping image: ", error);
        return null;
    }
}
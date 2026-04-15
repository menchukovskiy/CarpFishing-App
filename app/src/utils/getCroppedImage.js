const createImage = (url) =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.src = url;
    });

// imageSrc    — object URL из URL.createObjectURL
// pixelCrop   — объект { x, y, width, height } от react-easy-crop (onCropComplete)
// outputSize  — размер итогового квадрата в пикселях, по умолчанию 512x512
const getCroppedImage = async (imageSrc, pixelCrop, outputSize = 512) => {
    const image = await createImage(imageSrc);

    const canvas = document.createElement("canvas");
    canvas.width = outputSize;
    canvas.height = outputSize;

    const ctx = canvas.getContext("2d");

    // Вырезаем область pixelCrop из оригинала и растягиваем на весь canvas
    ctx.drawImage(
        image,
        pixelCrop.x,      // откуда начинаем вырезать по X в оригинале
        pixelCrop.y,      // откуда начинаем вырезать по Y в оригинале
        pixelCrop.width,  // ширина вырезаемой области в оригинале
        pixelCrop.height, // высота вырезаемой области в оригинале
        0,                // куда рисуем на canvas по X
        0,                // куда рисуем на canvas по Y
        outputSize,       // итоговая ширина на canvas
        outputSize        // итоговая высота на canvas
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                resolve(blob);
            },
            "image/jpeg",
            0.9 // качество 90%
        );
    });
};

export default getCroppedImage;

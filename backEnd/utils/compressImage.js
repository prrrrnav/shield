const sharp = require("sharp");

// Compress an image
const compressImage = async (buffer) => {
  try {
    const compressedImage = await sharp(buffer)
      .resize(800)  // Resize to a max width of 800px
      .jpeg({ quality: 80 })  // Compress to 80% quality
      .toBuffer();  // Return compressed image as buffer

    return compressedImage;
  } catch (error) {
    throw new Error("Image compression failed");
  }
};

module.exports = { compressImage };

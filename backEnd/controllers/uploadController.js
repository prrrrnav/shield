const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { compressImage } = require("../utils/compressImage.js");
const { compressMedia } = require("../utils/compressVideoAudio.js");
const r2 = require("../config/r2Client.js");
const { v4: uuidv4 } = require("uuid");
const FileModel = require("../models/FileModel.js");  // MongoDB model for storing file references

// Handle file upload
const uploadFile = async (req, res) => {
  try {
    const files = req.files;

    // Initialize an empty array to store URIs for MongoDB
    const fileUris = [];

    if (files.image) {
      const compressedImage = await compressImage(files.image[0].buffer);
      const imageUri = await uploadToR2(compressedImage, "image", files.image[0].originalname);
      fileUris.push(imageUri);
    }

    if (files.video) {
      const compressedVideo = await compressMedia(files.video[0].buffer, "video");
      const videoUri = await uploadToR2(compressedVideo, "video", files.video[0].originalname);
      fileUris.push(videoUri);
    }

    if (files.audio) {
      const compressedAudio = await compressMedia(files.audio[0].buffer, "audio");
      const audioUri = await uploadToR2(compressedAudio, "audio", files.audio[0].originalname);
      fileUris.push(audioUri);
    }

    // Save the file URIs to MongoDB
    const fileDocument = new FileModel({
      userId: req.user.id,  // Assume user is authenticated
      files: fileUris,
    });

    await fileDocument.save();

    res.status(200).json({ message: "Files uploaded and references saved", fileUris });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "File upload failed", details: error.message });
  }
};

// Upload to Cloudflare R2
const uploadToR2 = async (buffer, fileType, originalName) => {
  const fileKey = `${fileType}/${uuidv4()}-${originalName}`;  // Unique file key
  const uploadParams = {
    Bucket: process.env.R2_BUCKET_NAME,  // Replace with your R2 bucket name
    Key: fileKey,
    Body: buffer,
    ContentType: fileType === "image" ? "image/jpeg" : fileType === "audio" ? "audio/mp3" : "video/mp4",
  };

  try {
    await r2.send(new PutObjectCommand(uploadParams));
    const fileUrl = `https://9cfc73c6553a527f909226d887ded7c5.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/${fileKey}`;
    console.log(`Successfully uploaded ${fileKey} to Cloudflare R2`);
    return fileUrl;
  } catch (error) {
    throw new Error(`Failed to upload file to R2: ${error.message}`);
  }
};

module.exports = { uploadFile };

const ffmpeg = require("fluent-ffmpeg");
const { promisify } = require("util");

// Compress video or audio
const compressMedia = async (buffer, fileType) => {
  const process = ffmpeg()
    .input(buffer)
    .inputFormat(fileType === "video" ? "mp4" : "mp3")  // Set format based on file type
    .videoCodec("libx264")
    .audioCodec("aac")
    .outputOptions("-preset fast", "-crf 28")
    .outputOptions("-b:v 1000k");  // Adjust bitrate for video/audio

  const toBuffer = promisify(process.pipe.bind(process));
  const compressedBuffer = await toBuffer();
  return compressedBuffer;
};

module.exports = { compressMedia };

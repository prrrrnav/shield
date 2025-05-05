const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",  // Assuming you have a User model
    required: true,
  },
  files: [
    {
      type: String,  // The URI of the uploaded file
      required: true,
    },
  ],
});

const FileModel = mongoose.model("File", fileSchema);

module.exports = FileModel;

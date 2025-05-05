const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  files: [
    {
      type: String, 
      required: true,
    },
  ],
});

const FileModel = mongoose.model("File", fileSchema);

module.exports = FileModel;

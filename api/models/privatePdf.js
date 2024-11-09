const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrivateSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    lang: {
        type: Number,
        required: true
    },
    pdf: {
        filename: String, // Name of the file
        contentType: String, // MIME type of the file
        data: Buffer // Buffer containing file data
    }
});

PrivateSchema.index({ lang: 1 });

const PrivateModel = mongoose.model("PrivatePdf", PrivateSchema);
module.exports = PrivateModel;
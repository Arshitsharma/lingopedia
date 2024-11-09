const mongoose = require("mongoose");
const { Schema } = mongoose;

const PublicSchema = new Schema({
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

PublicSchema.index({ lang: 1 });
const PublicModel = mongoose.model("PublicPdf", PublicSchema);
module.exports = PublicModel;
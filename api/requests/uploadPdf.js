const PrivateModel = require("../models/privatePdf");
const PublicModel = require("../models/publicPdf");

const uploadPdf = async (req, res) => {
  try {
    const { userId, lang, pdf, isPublic } = req.body;

    const privateFile = new PrivateModel({
      userId,
      lang,
      pdf,
    });

    await privateFile.save();

    if (isPublic === true || isPublic === "true") {
      const publicFile = new PublicModel({
        userId,
        lang,
        pdf,
      });
      await publicFile.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error submitting file:", error.message);
    res.status(500).json({ success: false, error: "Failed to submit file" });
  }
};

module.exports = uploadPdf;

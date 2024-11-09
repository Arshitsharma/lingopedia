const PrivateModel = require("../models/privatePdf");

const fetchPrivatePdf = async (req, res) => {
  try {
    const { userId } = req.body 
    const documents = await PrivateModel.find( userId );

    if (!documents || documents.length === 0) {
      return res.status(404).json({ error: "PDFs not found for this user" });
    }
    
    const pdfFiles = documents.map(doc => ({
      filename: doc.pdf.filename,
      contentType: doc.pdf.contentType,
      data: doc.pdf.data,
      lang: doc.lang,
    }));

    res.json({ success: true, pdfFiles });
  } catch (error) {
    // console.error("Error fetching private PDFs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = fetchPrivatePdf;

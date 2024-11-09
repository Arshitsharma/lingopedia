const PdfFile = require('../models/privatePdf'); // Import your Mongoose model for PDF files

// Route to delete a PDF file by filename
const privatedelete= async (req, res) => {
  try {
    const { file_name } = req.body;

    // Find the document(s) with the matching filename
    const deletedPdf = await PdfFile.deleteOne({ filename:file_name });

    if (deletedPdf.deletedCount > 0) {
      return res.status(200).json({ success: true, message: 'PDF file(s) deleted successfully' });
    } else {
      return res.status(404).json({ success: false, message: 'PDF file(s) not found' });
    }
  } catch (error) {
    console.error('Error deleting PDF file:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
  
};

module.exports = privatedelete;

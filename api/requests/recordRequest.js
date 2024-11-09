const RecordModel = require("../models/marksrecord");

const RecordRequest = async (req, res) => {
  try {

    const { userId, languageName, marks, date } =  req.body;

    if (!userId || !languageName || !marks) {
      return res.status(400).json({
        success: false,
        error: "Required fields are missing: userId, languageName, marks"
      });
    }

    const newRecord = new RecordModel({
      userId,
      languageName,
      marks,
      date,
    });

    await newRecord.save();
    res.status(200).json({ success: true, message: "Record saved successfully" });
    console.log("Record saved");
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = RecordRequest;

const VideoModel = require("../models/videomodel");

const Addvideo = async (req, res) => {
  const { langid, level } = req.params;
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    let videos = await VideoModel.findOne({ lang: langid });

    // If videos is null or undefined, create a new entry
    if (!videos) {
      videos = await VideoModel.create({ lang: langid, beginner: [], advance: [] });
    }

    // Check if the URL already exists in the selected level
    if (videos[level].includes(url)) {
      return res.status(400).json({ error: "Video already exists" });
    }

    videos[level].push(url);
    await videos.save();

    res.json(videos);
  } catch (error) {
    console.error("Error adding video:", error);
    res.status(500).json({ error: "Server Error" });
  }
};

module.exports = Addvideo;

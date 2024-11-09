const VideoModel = require("../models/videomodel");

const deletevideo = async (req, res) => {
  try {
    const { langid, level } = req.params;
    const { url } = req.body;

    const video = await VideoModel.findOne({ lang: langid });

    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    let videoUpdated = false;

    if (level === "beginner") {
      video.beginner = video.beginner.filter((videoUrl) => {
        if (videoUrl === url) {
          videoUpdated = true;
          return false;
        }
        return true;
      });
    } else if (level === "advance") {
      video.advance = video.advance.filter((videoUrl) => {
        if (videoUrl === url) {
          videoUpdated = true;
          return false;
        }
        return true;
      });
    } else {
      return res.status(400).json({ error: "Invalid level" });
    }

    if (!videoUpdated) {
      return res.status(400).json({ error: "URL not included in the list" });
    }

    await video.save();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = deletevideo;

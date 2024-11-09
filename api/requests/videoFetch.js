const VideoModel = require("../models/videomodel");

const VideoFetch = async (req, res) => {
        try {
          const langid = req.params.langid;
          const videos = await VideoModel.findOne({ lang: langid });
          if (!videos) {
            return res.status(404).json({ message: 'Videos not found' });
          }
          res.json(videos);
        } catch (err) {
          console.error(err);
          res.status(500).json({ message: 'Server Error' });
        }
      }
 
module.exports= VideoFetch;